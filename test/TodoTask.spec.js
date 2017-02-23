import React from 'react';
import { mount , shallow } from 'enzyme';
import { expect } from 'chai';

import TodoTask from '../app/components/TodoTask';
import EditTaskDone from '../app/components/EditTaskDone';
import EditTaskDescription from '../app/components/EditTaskDescription';
import ArchiveTask from '../app/components/ArchiveTask';

describe('<TodoTask/>', function () {
    it('should have props for id, description, isDone, isArchived', function (){
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.props().id).to.be.defined;
        expect(wrapper.props().description).to.be.defined;
        expect(wrapper.props().isDone).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
        expect(wrapper.props().deleteTask).to.be.defined;
    });

    it('should have a EditTaskDescription component', function () {
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.find('EditTaskDescription')).to.have.length(1);
    });

    it('should have a EditTaskDone component', function (){
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.find('EditTaskDone')).to.have.length(1);
    });

    it('should have a ArchiveTask component', function (){
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.find('ArchiveTask')).to.have.length(1);
    });

    it('should render EditTaskDone, EditTaskDescription and ArchiveTask', function (){
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.containsAllMatchingElements([
            <EditTaskDone/>,
            <EditTaskDescription/>,
            <ArchiveTask/>
        ])).to.equal(true);
    });
})