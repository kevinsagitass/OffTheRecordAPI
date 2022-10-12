import mysql from "mysql2";
  
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rocky421247!",
    database: "offtherecord"
});
 
export default db;