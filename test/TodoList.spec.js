import React from 'react';
import { mount , shallow } from 'enzyme';
import { expect } from 'chai';

import TodoList from '../app/components/TodoList';

describe('<TodoList/>', function (){
    it('should have all props defined', function (){
        const wrapper = shallow(<TodoList/>);
        expect(wrapper.props().tasks).to.be.defined;
        expect(wrapper.props().title).to.be.defined;
        expect(wrapper.props().deleteTask).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
        expect(wrapper.props().updateTaskDescription).to.be.defined;
        expect(wrapper.props().updateTaskDoneStatus).to.be.defined;
    });

    it('should render zero items', function (){
        const wrapper = shallow(<TodoList tasks={[]}/>);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render some items', function (){
        const tasks = [{description: 'a', isDone: 0}, {description: 'b', isDone:1}]
        const wrapper = shallow(<TodoList tasks={tasks}/>);
        expect(wrapper.find('li')).to.have.length(2);
    })
})