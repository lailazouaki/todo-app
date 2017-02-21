var React = require('react');
var TodoTask = require('./TodoTask');

var TodoList = React.createClass({
	render: function (){
		var deleteTask = this.props.deleteTask
		var todoList = this.props.tasks.map(function(task){
			return <li key={task.id}>
						{<TodoTask
							id={task.id}
							description={task.description}
							isDone={task.isDone}
							deleteTask={deleteTask}
						/>}
					</li>
		});

		return (
			<div>
				<h2>{this.props.title}</h2>
				<ul>
					{todoList}
				</ul>
			</div>
		);
	}
});

module.exports = TodoList
