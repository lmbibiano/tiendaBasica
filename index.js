import express from "express";
import { create } from "express-handlebars";
import fileUpload from 'express-fileupload';
import { v4 as uuid } from 'uuid';
import Pool from "./database/config.js";
import fs from "fs";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3010;

const hbs = create({
    partialsDir: [
        path.resolve(__dirname, "./views/partials/"),
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(3010, () => {
    console.log('Servidor escuchando en http://localhost:'+ port);
});

// MIDDLEWARES GENERALES
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); // Para parsear application/x-www-form-urlencoded si aún es necesario
// Rutas
import homeRouter from './routes/home.js';
import loginRouter from './routes/login.js';
import registroRouter from './routes/registro.js';
import adminrepuestosRouter from './routes/adminrepuestos.js';
import adminproductosRouter from './routes/adminproductos.js';
import detalleRouter from './routes/detalle.js';

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/adminrepuestos', adminrepuestosRouter);
app.use('/adminproductos', adminproductosRouter);
app.use('/detalle', detalleRouter);

