const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // limiti aştı ise bekle hayta verme
    connectionLimit: 10, // aynı anda max 10 bağlantı
    queueLimit: 0 // bekleyen istek sayısı sınırsız
})
module.exports = pool