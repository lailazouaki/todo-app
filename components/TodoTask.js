var React = require('react');
var ArchiveTask = require('./ArchiveTask');

var TodoTask = React.createClass({
	render: function (){
		return (
			<div>
				<p>{this.props.description} : {this.props.isDone}</p>
				<ArchiveTask 
					id={this.props.id}
					deleteTask={this.props.deleteTask} />
			</div>
		)
	}
});

module.exports = TodoTask