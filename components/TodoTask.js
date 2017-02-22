var React = require('react');
var ArchiveTask = require('./ArchiveTask');
var EditTaskDescription = require('./EditTaskDescription')

var TodoTask = React.createClass({
	render: function (){
		return (
			<div>
				<p>{this.props.description} : {this.props.isDone}</p>
				<EditTaskDescription
					id={this.props.id}
					updateTaskDescription={this.props.updateTaskDescription}
					currentDescription={this.props.description} 
					isArchived={this.props.isArchived}/>
				<ArchiveTask 
					id={this.props.id}
					deleteTask={this.props.deleteTask} 
					isArchived={this.props.isArchived}/>
			</div>
		)
	}
});

module.exports = TodoTask