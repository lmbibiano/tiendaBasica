// import pg from 'pg'
// const { Pool } = pg

// const pool = new Pool({
//   user: 'postgres',
//   password: '123456',
//   host: 'localhost',
//   port: 5432,
//   database: 'tienda_basica',
// });

// let {rows}=await pool.query("SELECT NOW()");  
// console.log(rows);

// export default pool;

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'tienda_basica',
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
 pool.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

export default pool;