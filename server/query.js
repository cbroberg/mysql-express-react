require('dotenv').load()
const mysql = require('mysql2')

const { DB_HOST, DB_USER, DATABASE, PASSWORD } = process.env

const connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: PASSWORD,
	database: DATABASE
})

connection.query(
	'SELECT * FROM `events` WHERE `name` = "Christian Broberg"',
	function (err, results, fields) {
		// console.log(err)
		console.log(results) // results contains rows returned by server
		// console.log(fields) // fields contains extra meta data about results, if available
	}
)

connection.end()