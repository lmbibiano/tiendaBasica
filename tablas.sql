CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut VARCHAR(16) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(16) NOT NULL,
    telefono NUMBER(12) NOT NULL,
    admin BOOLEAN DEFAULT false,
    foto VARCHAR(100)
);

CREATE TABLE direccion (
    id SERIAL PRIMARY KEY,
    calle VARCHAR(100),
    numero_casa VARCHAR(50), -- Aquí se añadió la coma
    comuna VARCHAR(50),
    region VARCHAR(50),
    pais VARCHAR(50),
    usuario_id INTEGER REFERENCES usuarios(id)
);