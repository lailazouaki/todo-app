var React = require('react');
var axios = require('axios');

var TodoList = require('./TodoList')

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
		var self = this;
		var newTask = {description: taskDescription, isDone: 0}
		axios.post(self.state.baseUrl, newTask)
			.then(function(response){
				var allTasks = this.state.tasks;
				allTasks.push(newTask);
				this.setState({
					tasks: allTasks
				})
			})
			.catch(function(error){
				console.log('Error in POSTing a new task: ' + error)
			})
	},

	updateTask: function (id){
		return {}
	},

	deleteTask: function (id){
		var self = this;
		axios.delete(self.state.baseUrl + 'delete/' + id)
			.then(function(response){
				self.removeFromTasks(id)
			})
			.catch(function(error){
				console.log('Error in deleting the task id= ' + id + ': ' + error)
			})
	},

	removeFromTasks: function(id){
		var tasks = this.state.tasks;
		for(var task in tasks){
			if(task.id === id){
				var index = tasks.indexOf(task);
				tasks.splice(index, 1)
			}
		}

		this.setState({
			tasks: tasks
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
					tasks={this.state.tasks}/>
				<TodoList
					title='Archived'
					tasks={this.state.archived}/>
			</div>
		);
	}
});

module.exports = App;

