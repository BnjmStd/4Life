# Importar librerías necesarias
from flask import *
from app.models import document, user
from app.config.config import app, db
from flask import request, jsonify
from sqlalchemy import text

@app.route("/db", methods=["GET"])
def ping_db():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify({"message": "OK", "status": "Database connected"}), 200
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@app.route("/users", methods=["GET"])
def get_users():
    users = user.Usuario.query.all()
    json_contacts = list(map(lambda x: x.to_json(), users))
    return jsonify({ "Usuarios": json_contacts })

@app.route("/documents", methods=["GET"])
def get_docs():
    docs = document.Documento.query.all()
    json_contacts = list(map(lambda x: x.to_json(), docs))
    return jsonify({ "Documentos": json_contacts} )

from app.config.config import app, db

# Ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True)