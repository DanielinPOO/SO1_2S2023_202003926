from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
import mysql.connector
import json

app = Flask(__name__)
CORS(app)  
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Configura la conexión a la base de datos MySQL
mysql_connection = mysql.connector.connect(
)
mysql_cursor = mysql_connection.cursor()

class Nota_Alumno:
    def __init__(self, carnet, nombre, curso, nota, semestre, year):
        self.carnet = carnet
        self.nombre = nombre
        self.curso = curso
        self.nota = nota
        self.semestre = semestre
        self.year = year

def insertar_registro(nota_alumno):
    # Inserta el registro en la tabla "calificacion" en MySQL
    insert_query = "INSERT INTO calificacion (carnet, nombre, curso, nota, semestre, year) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (nota_alumno.carnet, nota_alumno.nombre, nota_alumno.curso, nota_alumno.nota, nota_alumno.semestre, nota_alumno.year)
    mysql_cursor.execute(insert_query, values)
    mysql_connection.commit()

@app.route('/insert', methods=['POST'])
def agregar_nota_alumno():
    try:
        # Decodificar el JSON del cuerpo de la solicitud
        data = request.json
        print("data:", data)
        nota_alumno = Nota_Alumno(
            data['carnet'],
            data['nombre'],
            data['curso'],
            data['nota'],
            data['semestre'],
            data['year']
        )

        # Insertar el nota_alumno en Redis
        json_nota_alumno = {
            "carnet": nota_alumno.carnet,
            "nombre": nota_alumno.nombre,
            "curso": nota_alumno.curso,
            "nota": nota_alumno.nota,
            "semestre": nota_alumno.semestre,
            "year": nota_alumno.year
        }

        counter = redis_client.incr("contador_registro_notas")
        key = f"calificacion{counter}"
        json_calificacion_str = json.dumps(json_nota_alumno)
        redis_client.set(key, json_calificacion_str)

        # Insertar el registro en la tabla "calificacion" en MySQL
        insertar_registro(nota_alumno)

        print("Calificacion Registrado en Redis y MySQL:", json_nota_alumno)
        return f"¡Gracias por la nota! ({counter} calificaciones registrados)", 200
    except Exception as e:
        return str(e), 500

@app.route('/count-redis', methods=['GET'])
def contar_registros_redis():
    try:
        total_registros = redis_client.dbsize()
        return jsonify({"total_registros_redis": total_registros}), 200
    except Exception as e:
        return str(e), 500

@app.route('/alumnos-en-semestre', methods=['POST'])
def obtener_cantidad_alumnos_curso_semestre():
    try:
        # Parámetro de la solicitud: semestre
        semestre = request.json.get('semestre')
        print("semestre:", semestre)
        # Obtener todas las claves en Redis y convertirlas en cadenas
        claves = [registro.decode('utf-8') for registro in redis_client.keys("*")]
        claves = claves[:-1]
        print("claves:", claves)
        # Filtrar las claves por el semestre proporcionado
        claves_filtradas = [clave for clave in claves if filtro_semestre(clave, semestre)]
        print("claves_filtradas:", claves_filtradas)
        # Crear un diccionario para mantener un seguimiento de la cantidad de alumnos por curso
        cursos_cantidad = {}

        # Calcular la cantidad de alumnos por curso
        for clave in claves_filtradas:
            registro_json_str = redis_client.get(clave)
            registro_json = json.loads(registro_json_str)
            curso = registro_json.get("curso")

            if curso in cursos_cantidad:
                cursos_cantidad[curso] += 1
            else:
                cursos_cantidad[curso] = 1

        
        # Crear una lista de objetos con curso y cantidad de alumnos
        resultado = [{"curso": curso, "cantidad_alumnos": cantidad} for curso, cantidad in cursos_cantidad.items()]

        return jsonify(resultado), 200
    except Exception as e:
        return str(e), 500
    
# Función para verificar si un registro coincide con el semestre
def filtro_semestre(registro, semestre):
    registro_json_str = redis_client.get(registro)
    if registro_json_str:
        registro_json = json.loads(registro_json_str)
        if type(registro_json) == int: return False
        print("registro_json:", registro_json)
        return registro_json.get("semestre") == semestre
    return False





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3300, debug=True)
