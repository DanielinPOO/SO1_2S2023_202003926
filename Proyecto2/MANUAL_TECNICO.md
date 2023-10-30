# Manual Técnico del Proyecto del Sistema de registro de notas

## Introducción

El proyecto "Sistema de registro de notas" se enfoca en la creación de una aplicación que simula el comportamiento de usuarios que ingresan calificaciones en un sistema educativo. Esta aplicación utiliza diversas tecnologías y servicios en la nube para orquestar la generación de tráfico, el procesamiento de datos y la visualización en tiempo real de las calificaciones de los alumnos.

## Desarrollo de Tecnologías

### Generador de Tráfico (Locust y Python)

El generador de tráfico se basa en el uso de Locust, una herramienta de prueba de carga en Python. Utiliza Locust y Python para simular el comportamiento de usuarios que envían solicitudes HTTP al sistema de calificaciones. Los datos para cada solicitud se generan aleatoriamente.

### Kubernetes

Kubernetes se utiliza para orquestar los contenedores de las diferentes partes de la aplicación. Se crea un Namespace llamado "so1p2" para trabajar con los PODS y los Servicios. Kubernetes proporciona escalabilidad y alta disponibilidad para la aplicación.

### Ingress y Traffic Split

El Ingress gestiona el acceso externo a los servicios dentro del clúster Kubernetes. Actúa como una puerta de entrada para exponer servicios HTTP y HTTPS fuera del clúster. El Traffic Split distribuye equitativamente el tráfico de datos entre rutas diferentes.

### Rutas (gRPC y RPC)

La aplicación utiliza dos rutas para registrar datos en diferentes bases de datos. La Ruta 1, desarrollada en Golang, utiliza gRPC para recibir datos y almacenarlos en MySQL y Redis. La Ruta 2, desarrollada en Python, también escribe datos en Redis y MySQL.

### Autoscaling de Kubernetes

El proyecto implementa el Autoscaling de Kubernetes (Horizontal Pod Autoscaling, HPA) para ajustar automáticamente la cantidad de PODS en ejecución según la utilización de la CPU. Cada POD tiene un mínimo de 1 réplica y un máximo de 3 réplicas, y se garantiza que el uso de la CPU no exceda el 50%.

### WebSocket (Socket.IO)

La aplicación implementa un canal de WebSockets para permitir la conexión en tiempo real entre el frontend y el backend utilizando Redis. Esto optimiza el consumo de recursos para la transmisión de información en tiempo real.

### Cloud SQL

Cloud SQL es un servicio de base de datos relacional completamente administrado que proporciona un almacenamiento eficiente y escalable para los datos del sistema de calificaciones. Se utiliza para almacenar datos en una base de datos MySQL.

### Cloud Run

Cloud Run permite ejecutar aplicaciones en contenedores de manera gestionada y sin preocuparse por la infraestructura subyacente. Se utiliza para desplegar y virtualizar la aplicación frontend.

### Aplicación Web (Dashboard)

La aplicación web se crea con React y muestra datos en tiempo real sobre calificaciones. El Dashboard proporciona información estática y dinámica:

**Parte Estática (MYSQL):**
- Datos Almacenados.
- Gráfica Circular de las Notas de un Curso en un semestre (Número de Aprobados y Reprobados).
- Gráfica de Barras de Cursos con Mayor número de alumnos en un semestre específico (Muestra el Top 3).
- Gráfica de Barras de Alumnos con el mejor Promedio (Muestra el Top 5).

**Parte Dinámica (REDIS):**
- Cantidad Total de Registros en Tiempo Real.
- Cantidad de Alumnos en un Curso y Semestre Específico.

## Ambiente de Desarrollo

El proyecto se desarrolla en un entorno Kubernetes que utiliza contenedores Docker para las diferentes partes de la aplicación. Se trabaja con varios lenguajes de programación, como Python, Golang y JavaScript (React). Se utilizan servicios en la nube, como Cloud SQL y Cloud Run, para almacenar datos y desplegar la aplicación frontend.

## Conclusiones

El proyecto "Sistema de registro de notas" representa una solución completa para la gestión de calificaciones en un sistema educativo. Se destaca por su capacidad de simular tráfico, su escalabilidad automática y la visualización en tiempo real de datos educativos. Las principales conclusiones son:

1. La combinación de tecnologías como Kubernetes, gRPC, React y servicios en la nube proporciona una solución escalable y eficiente para la gestión de calificaciones en un entorno educativo.

2. La implementación de Autoscaling de Kubernetes garantiza que la aplicación sea capaz de manejar cargas de trabajo variables de manera
