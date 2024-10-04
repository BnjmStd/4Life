from app.config.config import db

class Documento(db.Model):
    __tablename__ = 'documentos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    descripcion = db.Column(db.String, nullable=True)
    formato = db.Column(db.String, nullable=True)
    fecha_creacion = db.Column(db.DateTime, default=db.func.current_timestamp())
    contenido_doc = db.Column(db.Text, nullable=True)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)