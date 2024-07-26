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