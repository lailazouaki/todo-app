var React = require('react');

var ArchiveTask = React.createClass({

	handleClick: function () {
		var id = this.props.id;
		this.props.deleteTask(id);
	},

	render: function (){
		return (
			<div>
				<button onClick={this.handleClick}>Delete</button>		
			</div>
		)
	}
});

module.exports = ArchiveTask