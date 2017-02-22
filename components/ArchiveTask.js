var React = require('react');

var ArchiveTask = React.createClass({

	handleClickArchive: function () {
		var id = this.props.id;
		this.props.deleteTask(id);
	},

	handleClickUnarchive: function () {
		var id = this.props.id;
		console.log('Unarchive task: '+ id);
	},

	render: function (){
		var archiving = true;
		if(this.props.isArchived){
			return (
				<div>
					<button onClick={this.handleClickUnarchive}>Unarchive</button>		
				</div>
			)
		}

		else{
			return (
				<div>
					<button onClick={this.handleClickArchive}>Delete</button>		
				</div>
			)
		}
	}
});

module.exports = ArchiveTask