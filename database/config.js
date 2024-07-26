import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'tienda_basica',
});

let {rows}=await pool.query("SELECT NOW()");  
console.log(rows);

export default pool;