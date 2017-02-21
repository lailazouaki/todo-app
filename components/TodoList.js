var React = require('react');
var TodoTask = require('./TodoTask')

var TodoList = React.createClass({
	render: function (){

		var todoList = this.props.tasks.map(function(task){
			return <li key={task.id}>
						{<TodoTask
							id={task.id}
							description={task.description}
							isDone={task.isDone}
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
