CREATE TABLE tipos_usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(45) NOT NULL,
    nombre VARCHAR(45),
    password TEXT NOT NULL,
    tipo_usuario INTEGER NOT NULL,
    peso FLOAT,
    edad INTEGER,
    altura FLOAT,
    enfermedades_existentes TEXT,
    alergias TEXT,
    FOREIGN KEY (tipo_usuario) REFERENCES tipos_usuario (id) ON DELETE CASCADE
);

CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    descripcion TEXT,
    formato TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contenido_doc TEXT,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);
