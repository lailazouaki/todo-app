var React = require('react');
var axios = require('axios');

var TodoList = require('./TodoList');
var AddTodo = require('./AddTodo');

var App = React.createClass({

	getInitialState: function (){
		return {
			baseUrl: 'http://localhost:3000/',
			tasks: [],
			archived: []
		}
	},

	getAllTasks: function (){
		var self = this;
		axios.get(self.state.baseUrl)
			.then(function (response){
				self.setState({
					tasks: response.data[0]
				})
			})
			.catch(function (error){
				console.log('Error in getting all the tasks: ' + error)
			})
	},

	getArchivedTasks: function (){
		var self = this;
		axios.get(self.state.baseUrl + 'archived')
			.then(function (response){
				self.setState({
					archived: response.data[0]
				})
			})
			.catch(function (error){
				console.log('Error in getting all the tasks: ' + error)
			})		
	},

	getTaskById: function (id){
		return {}
	},

	addNewTask: function (taskDescription){
		console.log('Adding task...')
		var self = this;
		var newTask = {description: taskDescription, isDone: 0}

		axios.post(self.state.baseUrl + 'addTask', newTask)
			.then(function(response){
				console.log('Responding..')
				var allTasks = self.state.tasks;
				allTasks.push(newTask);
				self.setState({
					tasks: allTasks
				})

				self.getAllTasks();
				console.log('Task added.')
			})
			.catch(function(error){
				console.log('Error in POSTing a new task: ' + error)
			})
	},

	updateTask: function (id){
		return {}
	},

	deleteTask: function (id){
		console.log('Deleting task...well, archiving.')
		var self = this;
		axios.put(self.state.baseUrl + 'delete/' + id)
			.then(function(response){
				console.log('Ok, lets remove it from the list of current tasks.')
				self.getAllTasks();
				// self.getArchivedTasks();
			})
			.catch(function(error){
				console.log('Error in deleting the task id= ' + id + ': ' + error)
			})
	},

	componentWillMount: function () {
		this.getAllTasks();
		this.getArchivedTasks();
	},

	render: function (){
		return (
			<div>
				<h1>To-Do app</h1>
				<h2>You have {this.state.tasks.length} tasks to complete</h2>
				<TodoList
					title='TodoList'
					tasks={this.state.tasks}
					deleteTask={this.deleteTask}/>
				<AddTodo addTask={this.addNewTask}/>
				<TodoList
					title='Archived'
					tasks={this.state.archived}/>
			</div>
		);
	}
});

module.exports = App;


