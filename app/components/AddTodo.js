var React = require('react');
var Modal = require('react-modal');

var AddTodo = React.createClass({

    getInitialState: function (){
        return {
            modalIsOpen: false
        }
    },

    openModal: function () {
        this.setState({modalIsOpen: true})
    },

    closeModal: function () {
        this.setState({modalIsOpen: false})
    },

    handleClickAddTask: function () {
        var taskDescription = document.getElementById('taskDescription').value;
        this.props.addTask(taskDescription)
    },

    render: function (){
        return (
            <div>
                <button onClick={this.openModal}>Add a new task</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel='Add a new task'>

                    <h2>Add a new task</h2>
                    <button onClick={this.closeModal}>Close</button>
                    <div>What is the description of your task?</div>
                    <form>
                        <input id="taskDescription"/>
                        <button onClick={this.handleClickAddTask}>Save</button>
                    </form>
                </Modal>
            </div>
        )
    }
})

module.exports = AddTodo