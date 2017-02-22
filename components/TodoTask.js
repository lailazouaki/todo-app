var React = require('react');
var ArchiveTask = require('./ArchiveTask');
var EditTaskDescription = require('./EditTaskDescription');
var EditTaskDone = require('./EditTaskDone');

var TodoTask = React.createClass({
	render: function (){
		return (
			<div>
				<p>{this.props.description} : {this.props.isDone}</p>
				<EditTaskDone
					id={this.props.id}
					updateTaskDoneStatus={this.props.updateTaskDoneStatus}
					isArchived={this.props.isArchived}
					isDone={this.props.isDone}
					description={this.props.description} />
				<EditTaskDescription
					id={this.props.id}
					updateTaskDescription={this.props.updateTaskDescription}
					currentDescription={this.props.description} 
					isArchived={this.props.isArchived}
					isDone={this.props.isDone}/>
				<ArchiveTask 
					id={this.props.id}
					deleteTask={this.props.deleteTask} 
					isArchived={this.props.isArchived}/>
			</div>
		)
	}
});

module.exports = TodoTask