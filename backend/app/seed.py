from app import db
from user import TipoUsuario

def seed_tipo_usuarios():
    # Verifica si ya hay datos en la tabla para evitar duplicados
    if TipoUsuario.query.count() == 0:
        tipos_usuario = [
            TipoUsuario(nombre='Normal'),
            TipoUsuario(nombre='Médico'),
            TipoUsuario(nombre='Administrador')
        ]
        
        # Agregar los tipos de usuario a la sesión
        db.session.bulk_save_objects(tipos_usuario)
        
        # Confirmar los cambios en la base de datos
        db.session.commit()
        print("Tipos de usuario poblados con éxito.")
    else:
        print("Los tipos de usuario ya han sido poblados previamente.")

if __name__ == '__main__':
    seed_tipo_usuarios()
