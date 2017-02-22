var React = require('react');
var axios = require('axios');

var TodoList = require('./TodoList');
var AddTodo = require('./AddTodo');

var App = React.createClass({

	getInitialState: function (){
		return {
			baseUrl: 'http://localhost:3000/',
			tasks: [],
			archivedTasks: []
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
					archivedTasks: response.data[0]
				})
			})
			.catch(function (error){
				console.log('Error in getting all the archived tasks: ' + error)
			})		
	},

	getTaskById: function (id, callback){
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
				console.log('Task added.')
			})
			.catch(function(error){
				console.log('Error in POSTing a new task: ' + error)
			})
	},

	updateTaskDescription: function (id, newTaskDescription){
		console.log('Call the updateTaskDescription.')
	},

	deleteTask: function (id){
		var self = this;
		axios.put(self.state.baseUrl + 'delete/' + id)
			.then(function(response){
				self.getAllTasks();
				self.getArchivedTasks();
			})
			.catch(function(error){
				console.log('Error in deleting the task id= ' + id + ': ' + error)
			})
	},

	componentWillMount: function () {
		this.getAllTasks();
		this.getArchivedTasks();
		console.log(this.state.archivedTasks)
	},

	render: function (){
		return (
			<div>
				<h1>To-Do app</h1>
				<h2>You have {this.state.tasks.length} tasks to complete</h2>
				<TodoList
					title='TodoList'
					tasks={this.state.tasks}
					deleteTask={this.deleteTask}
					updateTaskDescription={this.updateTaskDescription}
					isArchived={false}/>
				<AddTodo addTask={this.addNewTask}/>
				<h2>You have {this.state.archivedTasks.length} archived tasks</h2>
				<TodoList
					title='Archived'
					tasks={this.state.archivedTasks}
					isArchived={true}/>
			</div>
		);
	}
});

module.exports = App;


