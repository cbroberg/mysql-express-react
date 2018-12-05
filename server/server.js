require('dotenv').load()
const express = require('express')
const mysql = require('mysql2')

const { DB_HOST, DB_USER, DATABASE, PASSWORD } = process.env

const connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: PASSWORD,
	database: DATABASE
})

const app = express()

app.get('/posts', (req, res) => {
	// connection.connect()

	connection.query('SELECT * FROM `events` WHERE `name` = "Christian Broberg"', (error, results, fields) => {
		if (error) throw error
		res.send(results)
	})

	connection.end()
})
// Start the server
app.listen(3005, () => {
	console.log('Go to http://localhost:3005/posts to see posts')
})