const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    database: 'nodejsudemy',
    user: 'root',
    password: 'root'
})

db.connect((err) => {
    if(err) {
        console.error('Error connecting: ' + err.stack)
        return
    }

    console.log('Connected as id :' + db.threadId);
})

db.query('SELECT * FROM members ', (err, results, fields) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log(results);
    }
});