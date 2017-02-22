var React = require('react');

var EditTaskDone = React.createClass({

	handleCheckboxChange: function (){
		console.log('called handleCheckboxChange')
		var id = this.props.id
		var isDoneBool = !this.props.isDone
		var isDone = isDoneBool? 1 : 0
		var description = this.props.description

		this.props.updateTaskDoneStatus(id, description, isDone)
	},

	render: function () {
		if(this.props.isArchived)
			return <div></div>

		return (
			<div>
				<button onClick={this.handleCheckboxChange}>Done</button>
			</div>
		)
	}

});

module.exports = EditTaskDone
