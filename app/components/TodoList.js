var React = require('react');
var TodoTask = require('./TodoTask');

var TodoList = React.createClass({

    render: function (){
        var deleteTask = this.props.deleteTask
        var isArchived = this.props.isArchived
        var updateTaskDescription = this.props.updateTaskDescription
        var updateTaskDoneStatus = this.props.updateTaskDoneStatus
        var todoList = this.props.tasks ? this.props.tasks.map(function(task){
            return <li key={task.id}>
                        {<TodoTask
                            id={task.id}
                            description={task.description}
                            isDone={task.isDone}
                            deleteTask={deleteTask}
                            isArchived={isArchived}
                            updateTaskDescription={updateTaskDescription}
                            updateTaskDoneStatus={updateTaskDoneStatus}
                        />}
                    </li>
        }) : {};

        return (
            <div className='todo-list'>
                <h2>{this.props.title}</h2>
                <ul>
                    {todoList}
                </ul>
            </div>
        );
    }
});

module.exports = TodoList
