const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Función para ejecutar comandos en la terminal
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
};

// Crear carpetas necesarias
const createDirectories = () => {
    const directories = [
        'views',
        'views/partials',
        'views/layouts',
        'public',
        'public/img',
        'public/css',
        'routes',
        'database'
    ];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Carpeta creada: ${dir}`);
        }
    });
};

// Crear archivos básicos
const createFiles = () => {
    const files = [
        {
            path: 'index.js',
            content: `
import express from "express";
import { create } from "express-handlebars";
import fileUpload from 'express-fileupload';
import { v4 as uuid } from 'uuid';
import db from "./database/config.js";
import fs from "fs";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const hbs = create({
    partialsDir: [
        path.resolve(__dirname, "./views/partials/"),
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(3010, () => {
    console.log("Servidor escuchando en http://localhost:3010");
});

// MIDDLEWARES GENERALES
app.use(express.json());
app.use(express.static("public"));

// Rutas
import homeRouter from './routes/home.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
`
        },
        {
            path: path.join('views', 'layouts', 'main.handlebars'),
            content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    {{{body}}}
</body>
</html>
`
        },
        {
            path: path.join('views', 'home.handlebars'),
            content: `
<h1>Bienvenido a mi aplicación con Express y Handlebars!</h1>
<a href="/login">Login</a> | <a href="/register">Registro</a>
`
        },
        {
            path: path.join('views', 'login.handlebars'),
            content: `
<h1>Login</h1>
<form action="/login" method="POST">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Login</button>
</form>
`
        },
        {
            path: path.join('views', 'register.handlebars'),
            content: `
<h1>Registro</h1>
<form action="/register" method="POST">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Registrar</button>
</form>
`
        },
        {
            path: path.join('routes', 'home.js'),
            content: `
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("home", { title: 'Inicio' });
});

export default router;
`
        },
        {
            path: path.join('routes', 'login.js'),
            content: `
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("login", { title: 'Login' });
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la lógica de autenticación
    res.send(\`Bienvenido, \${email}\`);
});

export default router;
`
        },
        {
            path: path.join('routes', 'register.js'),
            content: `
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    res.render("register", { title: 'Registro' });
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Aquí iría la lógica de registro
    res.send(\`Usuario registrado: \${email}\`);
});

export default router;
`
        },
        {
            path: path.join('database', 'config.js'),
            content: `
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  password: 'xxxxxx',
  host: 'localhost',
  port: 5432,
  database: 'xxxxxx',
});

//let {rows}=await pool.query("SELECT NOW()");  
//console.log(rows);

export default pool;
`
        },
        {
            path: '.gitignore',
            content: `
node_modules
public/img
public/css
`
        },
        {
            path: 'nodemon.json',
            content: `
{
    "watch": ["index.js", "routes/", "views/"],
    "ext": "js,handlebars",
    "ignore": ["public/*"],
    "exec": "node index.js"
}
`
        }
    ];

    files.forEach(file => {
        fs.writeFileSync(file.path, file.content.trim());
        console.log(`Archivo creado: ${file.path}`);
    });

    // Actualizar package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts = {
        ...packageJson.scripts,
        dev: "nodemon index.js"
    };
    packageJson.type = "module";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Archivo package.json actualizado.');
};

// Función principal para configurar el proyecto
const setupProject = async () => {
    try {
        console.log('Inicializando proyecto con npm init -y...');
        await runCommand('npm init -y');

        console.log('Instalando dependencias...');
        await runCommand('npm install express express-handlebars express-fileupload uuid pg morgan');
        await runCommand('npm install nodemon -D');

        console.log('Creando carpetas...');
        createDirectories();

        console.log('Creando archivos...');
        createFiles();

        console.log('Configuración completa. Ejecuta "npm run dev" para iniciar la aplicación con nodemon.');
    } catch (error) {
        console.error('Error durante la configuración:', error);
    }
};

setupProject();
