require('dotenv').load()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const { DB_HOST, DB_USER, DATABASE, PASSWORD } = process.env

const connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: PASSWORD,
	database: DATABASE
})

connection.connect((error) => {
	if (!error) 
		console.log('Database connection established')
	else
		console.log('Database connection failed \n Error : ' + JSON.stringify(error, undefined, 2))
})

const app = express()
app.use(cors())

// Standard querY
const QUERY = {
	selectAll: 'SELECT * FROM events',
	select10: 'SELECT * FROM events LIMIT 0, 10',
}

app.get('/', (req, res) => {
	res.redirect('/events')
})

app.get('/events', (req, res) => {
	connection.query(QUERY.selectAll, (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.json(results)
		}
	})
})

app.get('/event/:id', (req, res) => {
	let id = req.params.id
	connection.query('SELECT * FROM events WHERE id = ?', [id], (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.json(results)
		}
	})
})

app.delete('/event/:id', (req, res) => {
	let id = req.params.id
	connection.query('DELETE FROM events WHERE id = ?', [id], (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.send(`Deleted record with ID: ${id}`)
		}
	})
})

app.get('/events/add', (req, res) => {
	const { date, name, birthday, content } = req.query
	const INSERT_EVENT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`
	connection.query(INSERT_EVENT, (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.send('Event succesfully added!')
		}
	})
})

app.post('/events/add', (req, res) => {
	const { date, name, birthday, content } = req.query
	const INSERT_EVENT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`
	connection.query(INSERT_EVENT, (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.send('Event succesfully added!')
		}
	})
})

app.post('/events/add_sp', (req, res) => {
	const { date, name, birthday, content } = req.query
	const INSERT_EVENT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`
	connection.query(INSERT_EVENT, (error, results, fields) => {
		if (error) {
			res.send(error)
		} else {
			res.send('Event succesfully added!')
		}
	})
})

// Start the server
app.listen(3005, () => {
	console.log('Server up:', Date())
	console.log('Server running on port 3005')
	console.log('Go to http://localhost:3005/ to access events')
})
