import React from 'react';
import { mount , shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';

import App from '../app/components/App';
import TodoList from '../app/components/TodoList';
import AddTodo from '../app/components/AddTodo';

describe('<App/>', function (){
    it('should render TodoList', function (){
        const wrapper = shallow(<App/>);
        expect(wrapper.containsAllMatchingElements([
            <TodoList/>,
            <AddTodo/>
        ])).to.equal(true);
    });

    it('should start with an empty list of tasks', function (){
        const wrapper = shallow(<App/>);
        expect(wrapper.state('tasks')).to.eql([]);
    });

    it('should start with an empty list of done tasks', function (){
        const wrapper = shallow(<App/>);
        expect(wrapper.state('doneTasks')).to.eql([]);
    });

    it('should start with an empty list of archived tasks', function (){
        const wrapper = shallow(<App/>);
        expect(wrapper.state('archivedTasks')).to.eql([]);
    });

    it('should have a baseUrl as http://localhost:3000/', function (){
        const wrapper = shallow(<App/>);
        expect(wrapper.state('baseUrl')).to.equal('http://localhost:3000/')
    });

    // Find out how to mock Axios requests and responses
    // it('should add a task to the right TodoList', function (){
    //     const wrapper = shallow(<App/>);
    //     var expectedTask = {description: 'task description', isDone: 0};
    //     stub(axios, 'get');
    //     wrapper.instance().addNewTask('task description');
    //     expect(axios.get.callCount).to.equal(1);
    // });
})