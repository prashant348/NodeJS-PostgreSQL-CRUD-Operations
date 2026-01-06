import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('db connection error: ', err.stack);
    } else {
        console.log('db connected successfully!');
        release();
    }
});

export default pool;