cv

CREATE TABLE direccion (
    id SERIAL PRIMARY KEY,
    calle VARCHAR(100),
    numero_casa VARCHAR(50), --id
    comuna VARCHAR(50),
    pais VARCHAR(50),
    usuario_id INTEGER REFERENCES usuarios(id)
)
