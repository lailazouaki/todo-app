var React = require('react');
var ArchiveTask = require('./ArchiveTask');
var EditTaskDescription = require('./EditTaskDescription');
var EditTaskDone = require('./EditTaskDone');

var TodoTask = React.createClass({

    propTypes: {
        description: React.PropTypes.string,
        id: React.PropTypes.number,
        isDone: React.PropTypes.bool,
        isArchived: React.PropTypes.bool,
        deleteTask: React.PropTypes.func,
        updateTaskDescription: React.PropTypes.func,
        updateTaskDoneStatus: React.PropTypes.func
    },

    render: function (){
        return (
            <div className='todo-task'>
                <p>{this.props.description}</p>
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