from app.config.config import db

class TipoUsuario(db.Model):
    __tablename__ = 'tipos_usuario'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45), nullable=False, unique=True)
    usuarios = db.relationship('Usuario', backref='tipo', lazy=True)

    def __repr__(self):
        return f'<TipoUsuario {self.nombre}>'


class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(45), nullable=False)
    nombre = db.Column(db.String(45), nullable=True)
    password = db.Column(db.String, nullable=False)

    tipo_usuario = db.Column(db.Integer, db.ForeignKey('tipos_usuario.id'), nullable=False)

    peso = db.Column(db.Float, nullable=True)
    edad = db.Column(db.Integer, nullable=True)
    altura = db.Column(db.Float, nullable=True)
    enfermedades_existentes = db.Column(db.String, nullable=True)
    alergias = db.Column(db.String, nullable=True)

    documentos = db.relationship('Documento', backref='usuario', lazy=True)
