var express = require('express');
var bodyParser = require('body-parser');
var React = require('react');
var cors = require('cors');
var mysql = require('mysql');
var app = express();

app.use(cors())
app.use(bodyParser.json())
app.listen(3000, function(){
	console.log('Listening to port 3000');
});

var tasksDatabase = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'todo',
})

tasksDatabase.connect();

// Display all to-do tasks
app.get('/', function (request, response) {
	console.log('Get all the tasks.');
	var query = 'SELECT * FROM task WHERE isArchived = 0;';
	tasksDatabase.query(query, function(err, rows, fields){
		if(err)
			console.log(response.json(err))

		else{
			response.json([rows, rows.length])
			console.log('Done.')
		}
	})
})

// GET task by id
app.get('/:id', function (request, response) {
	var id = request.params.id;
	var query = 'SELECT * FROM task WHERE (isArchived = 0 AND id='+id + ');';
	tasksDatabase.query(query, function(err, rows, fields){
		if(err)
			console.log(response.json(err))

		else{
			response.json(rows)
			console.log('Done.')
		}
	})
})

// Display all archived tasks
app.get('/archived', function (request, response) {
	console.log('Get archived the tasks.');
	var query = 'SELECT * FROM task WHERE isArchived = 1';
	tasksDatabase.query(query, function(err, rows, fields){
		if(err)
			console.log(response.json(err))

		else{
			response.json([rows, rows.length])
			console.log('Done.')
		}
	})
})


// Add new task
app.post('/addTask', function(request, response, next){
	console.log('Adding a new task with request: ' + request.body)
	var description = request.body.description;
	var isDone = request.body.isDone;

	if(!isDone)
		isDone = 0;

	var query ='INSERT INTO task (description, isDone) VALUES ("'
				+ description + '", ' + isDone + ');'

	console.log(query)

	tasksDatabase.query(query, function(err, rows, fields){
	if(!err)
		console.log(response.json(rows));
	else
		console.log(response.json(err));
	})
})

// Update task
app.put('/update/:id', function(request, response, next){
	// Assumes we get both columns in the request
	var id = request.params.id;
	var isDone = request.body.isDone;
	var description = request.body.description;
	var query = 'UPDATE task SET isDone=' + isDone + ', description="' + description + '" WHERE id=' + id + ';'
	tasksDatabase.query(query, function(err, rows){
		if(err)
			response.json(err)

		else
			response.json(rows)
	});
})

// Delete task by id 
app.put('/delete/:id', function(request, response){
	var id = request.params.id;
	tasksDatabase.query('UPDATE task SET isArchived = 1 WHERE id = ' + id + ';', function(err, rows){
		if(err)
			response.json(err)

		else
			response.json(rows)
	});
})

// Delete all tasks
app.put('/clear', function (request, response){
	console.log('Archive all the tasks.')
	tasksDatabase.query('UPDATE task SET isArchived = 1;', function(err, rows){
		if(err)
			response.json(err)

		else
			response.json(rows)
	});
})

// Delete done tasks
app.put('/clear-done', function (request, response){
	console.log('Archive all the DONE tasks.')
	tasksDatabase.query('UPDATE task SET isArchived = 1 WHERE isDone = 0;', function(err, rows){
		if(err)
			response.json(err)

		else
			response.json(rows)
	});
})
