from app import db
from models.user import TipoUsuario

def seed_tipo_usuarios() -> str:
    """
        esta funcion hace algo
    """
    if TipoUsuario.query.count() == 0:
        tipos_usuario = [
            TipoUsuario(nombre='Normal'),
            TipoUsuario(nombre='Médico'),
            TipoUsuario(nombre='Administrador')
        ]
        db.session.bulk_save_objects(tipos_usuario)
        db.session.commit()
        print("Tipos de usuario poblados con éxito.")
    else:
        print("Los tipos de usuario ya han sido poblados previamente.")

if __name__ == '__main__':
    seed_tipo_usuarios()