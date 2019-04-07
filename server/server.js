// https://github.com/mysqljs/mysql 

require('dotenv').load()
const express = require('express')
const helmet = require('helmet')
const frameguard = require('frameguard')
const cors = require('cors')
const mysql = require('mysql2')

const { DB_HOST, DB_USER, DATABASE, PASSWORD } = process.env

const connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: PASSWORD,
	database: DATABASE,
	multipleStatements: true
})

connection.connect((error) => {
	if (!error) 
		console.log('Database connection established')
	else
		console.log('Database connection failed \n Error : ' + JSON.stringify(error, undefined, 2))
})

const app = express()

app.use(helmet())

// Allow from a specific host:
app.use(frameguard({
	action: 'allow-from',
	domain: 'http://localhost:3005/'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Standard queries
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
			console.error(error)
			res.send(error)
		} else {
			console.log('Results transmitted to caller')
			res.json(results)
		}
	})
})

app.get('/event/:id', (req, res) => {
	let id = req.params.id
	connection.query('SELECT * FROM events WHERE id = ?', [id], (error, results, fields) => {
		if (error) {
			console.error(error)
			res.send(error)
		} else {
			console.log('Results transmitted to caller')
			res.json(results)
		}
	})
})

app.delete('/event/:id', (req, res) => {
	let id = req.params.id
	connection.query('DELETE FROM events WHERE id = ?', [id], (error, results, fields) => {
		if (error) {
			console.error(error)
			res.send(error)
		} else {
			console.log(`Deleted record with ID: ${id}`)
			res.send(`Deleted record with ID: ${id}`)
		}
	})
})

app.get('/events/add', (req, res) => {
	const { date, name, birthday, content } = req.query
	const INSERT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`
	connection.query(INSERT, (error, results, fields) => {
		if (error) {
			console.error(error)
			res.send(error)
		} else {
			console.log('Event succesfully added!')
			res.send('Event succesfully added!')
		}
	})
})

app.post('/events/add', (req, res) => {
	const { date, name, birthday, content } = req.query
	const INSERT = `INSERT INTO events (date, name, birthday, content) VALUES('${date}', '${name}', '${birthday}', '${content}')`
	connection.query(INSERT, (error, results, fields) => {
		if (error) {
			console.error(error)
			res.send(error)
		} else {
			console.log('Event succesfully added!')
			res.send('Event succesfully added!')
		}
	})
})

app.post('/events/add2', (req, res) => {
	let body = req.body
	var sql = "SET @id = ?;SET @date = ?;SET @name = ?;SET @birthday = ?;SET @content = ?; \
	CALL EventAddOrEdit(@id, @date, @name, @birthday, @content);"
	connection.query(sql, [body.id, body.date, body.name, body.birthday, body.content], (error, results, fields) => {
		if (error) {
			console.error(error)
			res.send(error)
		} else {
			console.log('Event inserted in DB')
			res.send('Event inserted in DB')
		}
	})
})

// Start the server
app.listen(3005, () => {
	console.log('Server up:', Date())
	console.log('Server running on port 3005')
	console.log('Go to http://localhost:3005/ to access events')
})
