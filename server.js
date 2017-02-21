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
	var query = 'SELECT * FROM task WHERE isDone = 0;';
	tasksDatabase.query(query, function(err, rows, fields){
		if(err)
			console.log('Error: ' + err)

		else{
			response.json([rows, rows.length])
			console.log('Done.')
		}
	})
})

// Display all archived tasks
app.get('/archived', function (request, response) {
	console.log('Get archived the tasks.');
	var query = 'SELECT * FROM archivedTasks';
	tasksDatabase.query(query, function(err, rows, fields){
		if(err)
			console.log('Error: ' + err)

		else{
			response.json([rows, rows.length])
			console.log('Done.')
		}
	})
})

// Get task by id
app.get('/:id', function(request, response, next){
	var id = request.params.id;
	tasksDatabase.query(
		'SELECT * FROM task WHERE id ="' + id + '" LIMIT 1',
		function(err, rows){
			if(!err)
				response.json(rows)

			else
				console.log(err)
		})
})


// Add new task
app.post('/addTask', function(request, response, next){
	var description = request.body.description;
	var isDone = request.body.isDone;

	if(!isDone)
		isDone = 0;

	var query ='INSERT INTO task (description, isDone) VALUES ("'
				+ description + '", ' + isDone + ');'


	tasksDatabase.query(query, function(err, rows, fields){
	if(!err)
		console.log('Response: ' + response.statusCode);
	else
		console.log('Error while performing Query: ' + err);
	})
})

// Update task
app.put('/update/:id', function(request, response, next){
	// Assumes we get both columns in the request
	var id = request.params.id;
	var isDone = request.body.isDone;
	var description = request.body.description;
	var query = 'UPDATE task SET isDone=' + isDone + ', description="' + description + '" WHERE id= ' + id + ';'

	tasksDatabase.query(query);
})

// Delete task by id 
app.delete('/delete/:id', function(request, response){
	var id = request.params.id;
	tasksDatabase.query('INSERT INTO archivedTasks SELECT * FROM task WHERE id=' + id + ';', function(err, rows, fields){
		if(!err){
			tasksDatabase.query('UPDATE archivedTasks SET isArchived = 1 WHERE isArchived = 0');
			tasksDatabase.query('DELETE FROM task WHERE id = ' + id + ';');
		}
	})
})


// Delete all tasks
app.delete('/clear', function (request, response){
	console.log('Archive all the tasks.')
	tasksDatabase.query(
		'INSERT INTO archivedTasks (SELECT * FROM task);',
		function(err, rows, fields){
			if(!err){
				tasksDatabase.query('UPDATE archivedTasks SET isArchived = 1 WHERE isArchived = 0');
				tasksDatabase.query('DELETE FROM task;');
			}
		}
	)
})

// Delete done tasks
app.delete('/clear-done', function (request, response){
	console.log('Archive all the DONE tasks.')
	tasksDatabase.query(
		'INSERT INTO archivedTasks SELECT * FROM task WHERE isDone = 1;',
		function(err, rows, fields){
			if(!err){
				tasksDatabase.query('UPDATE task SET isArchived = 1 WHERE isArchived = 0;')
				tasksDatabase.query('DELETE FROM task WHERE isDone = 1;')
			}
		}
	)
})
