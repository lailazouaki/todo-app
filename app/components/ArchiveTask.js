var React = require('react');

var ArchiveTask = React.createClass({

    handleClickArchive: function () {
        var id = this.props.id;
        this.props.deleteTask(id);
    },

    render: function (){
        if(this.props.isArchived){
            return <div></div>
        }

        else{
            return (
                <div className='archive-task'>
                    <button onClick={this.handleClickArchive}>Delete</button>
                </div>
            )
        }
    }
});

module.exports = ArchiveTask