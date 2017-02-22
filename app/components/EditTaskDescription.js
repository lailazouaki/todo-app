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

    closeModal: function (){
        this.setState({modalIsOpen: false})
    },

    handleClickEditDescription: function (){
        var id = this.props.id;
        var isDone = this.props.isDone;
        var currentDescription = this.props.currentDescription;
        var newTaskDescription = document.getElementById('newTaskDescription').value;
        if (currentDescription !== newTaskDescription){
            this.props.updateTaskDescription(id, newTaskDescription, isDone);
        }
    },

    render: function (){
        var currentDescription = this.props.currentDescription;
        if(this.props.isArchived || this.props.isDone)
            return <div></div>

        return (
            <div className='edit-task-description'>
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