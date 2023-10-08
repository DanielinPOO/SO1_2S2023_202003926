from flask import Flask

app = Flask(__name__)

@app.route('/api/hola-mundo', methods=['GET'])
def hola_mundo():
    return 'Hola Mundo desde Flask! - 202003926'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
