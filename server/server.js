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

// Standard querY
const QUERY = {
	selectAll: 'SELECT * FROM events',
	select10: 'SELECT * FROM events LIMIT 0, 10',
}

app.get('/events', (req, res) => {
	connection.query(QUERY.selectAll, (error, results, fields) => {
		if (error) throw error
		res.json(results)
	})

})

app.get('/events/add', (req, res) => {
	const { date, name, birthday, content } = req.query
	console.log(date, name, birthday, content)

	const INSERT_EVENT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`

	connection.query(INSERT_EVENT, (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.send('Event succesfully added!')
		}
	})
})



app.get('/events/new', (req, res) => {
	connection.query("INSERT INTO events (id, date, name, birthday, content) VALUES(6, '18-12-31', 'Nytårsaften', 0, 'Fest')", (error, results, fields) => {
		if (error) throw error
		res.json('Values inserted')
	})

})

// Start the server
app.listen(3005, () => {
	console.log('Go to http://localhost:3005/ to see ', Date())
})
