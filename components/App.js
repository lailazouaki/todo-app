var React = require('react');
var axios = require('axios');

var TodoList = require('./TodoList');
var AddTodo = require('./AddTodo');

var App = React.createClass({

	getInitialState: function (){
		return {
			baseUrl: 'http://localhost:3000/',
			tasks: [],
			archivedTasks: [],
			doneTasks: [],
		}
	},

	getCurrentTasks: function (){
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

	getDoneTasks: function () {
		var self = this
		axios.get(self.state.baseUrl + 'done')
			.then(function(response){
				self.setState({
					doneTasks: response.data[0]
				})
			})
			.catch(function(error){
				console.log('Error in getting all the done tasks:' + error)
			})
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

	updateTaskDescription: function (id, newTaskDescription, isDone){
		var self = this;
		var newTask = {description: newTaskDescription, isDone: isDone}
		axios.put(this.state.baseUrl + 'update/' + id, newTask)
			.then(function(response){
				self.getCurrentTasks();
			})
	},

	updateTaskDoneStatus: function(id, taskDescription, newDoneStatus){
		console.log('called updateTaskDoneStatus')
		var self = this;
		var newTask = {description: taskDescription, isDone: newDoneStatus}
		console.log(newTask)
		axios.put(this.state.baseUrl + 'update/' + id, newTask)
			.then(function(response){
				self.getCurrentTasks();
				self.getDoneTasks();
			})
			.catch(function(error){
				console.log(error)
			})
	},

	deleteTask: function (id){
		var self = this;
		axios.put(self.state.baseUrl + 'delete/' + id)
			.then(function(response){
				self.getCurrentTasks();
				self.getArchivedTasks();
			})
			.catch(function(error){
				console.log('Error in deleting the task id= ' + id + ': ' + error)
			})
	},

	componentWillMount: function () {
		this.getCurrentTasks();
		this.getDoneTasks();
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
					deleteTask={this.deleteTask}
					updateTaskDescription={this.updateTaskDescription}
					updateTaskDoneStatus={this.updateTaskDoneStatus}
					isArchived={false}/>
				<AddTodo addTask={this.addNewTask}/>
				<h2>You have completed {this.state.doneTasks.length} tasks!</h2>
				<TodoList
					title='Completed'
					tasks={this.state.doneTasks}
					isArchived={false}/>
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


