var React = require('react');
var Modal = require('react-modal');

var EditTaskDescription = React.createClass({

	getInitialState: function () {
		return {
			modalIsOpen: false
		}
	},

	openModal: function (){
		this.setState({modalIsOpen: true})
	},

	close: function (){
		console.log('this was called.')
		this.setState({modalIsOpen: false})
	},

	handleClickEditDescription: function (){
		console.log('edit description was called.')
		var id = this.props.id;
		var currentDescription = this.props.currentDescription;
		var newTaskDescription = document.getElementById('newTaskDescription');
		if (currentDescription !== newTaskDescription){
			console.log('editing the description.')
			this.props.updateTaskDescription(id, newTaskDescription);
		}
	},

	render: function (){
		var currentDescription = this.props.currentDescription;
		if(this.props.isArchived)
			return <div></div>

		return (
			<div>
				<button onClick={this.openModal}>Edit</button>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel='Edit task description'>

					<h2>Edit task description</h2>
					<button onClick={this.closeModal}>Close</button>
					<div>What is the new description of your task?</div>
					<form>
						<input id="newTaskDescription"/>
						<button onClick={this.handleClickEditDescription}>Save</button>
					</form>
				</Modal>
			</div>
		)
	}
});

module.exports = EditTaskDescription