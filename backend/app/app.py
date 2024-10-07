# Importar librerías necesarias
from flask import *
from app.models import document, user
from app.config.config import app, db
from flask import request, jsonify
from sqlalchemy import text
from pypdf import PdfReader

# modelo ollama
import ollama

# sudo systemctl stop ollama
# sudo systemctl disable ollama
# sudo rm /etc/systemd/system/ollama.service

@app.route("/query", methods=["GET"])
def query():

    prompt: str = "hola"
    modelo: str = "llama3.2"

    response = ollama.chat(
        model=modelo,
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )

    return jsonify({
        "message": response['message']['content']
    }), 200

@app.route("/query", methods=["POST"])
def imprimirExamen():
    # print("Archivos recibidos:", request.files)
    # print("Datos de formulario:", request.form)

    try:
        # Verificar si el archivo PDF está en la solicitud
        if 'file' not in request.files:
            return jsonify({"message": "No se encontró el archivo"}), 400

        file = request.files['file']

        # Verificar si el archivo tiene una extensión válida (PDF)
        if file.filename == '' or not file.filename.endswith('.pdf'):
            return jsonify({"message": "Archivo no válido, se requiere un PDF"}), 400

        # Leer el contenido del archivo PDF y extraer el texto
        reader = PdfReader(file)  # Usa el objeto file directamente
        texto_completo = ''
        
        # Extraer texto de cada página
        for page in reader.pages:
            text = page.extract_text()
            if text:  # Verificar que se extrajo texto
                texto_completo += text + '\n'  # Agregar un salto de línea entre páginas

        print(texto_completo)

        # Enviar el texto extraído al modelo Llama
        modelo = "llama3.2"
        response = ollama.chat(
            model=modelo,
            messages=[
                {
                    'role': 'user',
                    'content': f"Genera un título para esto: {texto_completo}"
                }
            ]
        )


        # Procesar el archivo y/o los datos adicionales según sea necesario
        message = "Datos recibidos correctamente"
        
        # Retornar la respuesta del modelo y el mensaje al cliente
        return jsonify({
            "message": message,
            "status": "Almacenando documento",
            "model_response": response
        }), 200
        
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@app.route("/db", methods=["GET"])
def pingDb():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify({"message": "OK", "status": "Database connected"}), 200
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@app.route("/users", methods=["GET"])
def getUsers():
    users = user.Usuario.query.all()
    json_contacts = list(map(lambda x: x.to_json(), users))
    return jsonify({ "Usuarios": json_contacts })

@app.route("/documents", methods=["GET"])
def getDocs():
    docs = document.Documento.query.all()
    json_contacts = list(map(lambda x: x.to_json(), docs))
    return jsonify({ "Documentos": json_contacts} )

from app.config.config import app, db

app.config['DEBUG'] = True

# Ejecutar la aplicación
if __name__ == "__main__":

    app.run(debug=True)