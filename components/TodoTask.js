var React = require('react');
var InputControl = require('./InputControl')

var TodoTask = React.createClass({
	render: function (){
		return (
			<div>
				<p>{this.props.description} : {this.props.isDone}</p>
			</div>
		)
	}
});

module.exports = TodoTask