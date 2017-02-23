import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import EditTaskDone from '../app/components/EditTaskDone';

describe('<EditTaskDone/>', function(){
    it('should render an empty div if isArchived', function(){
        const wrapper = shallow(
            <EditTaskDone 
                isArchived={true}
                isDone={0}/>)

        expect(wrapper.find('.edit-task-done').length).to.equal(0);

        const secondWrapper = shallow(
            <EditTaskDone 
                isArchived={true}
                isDone={1}/>)
        expect(secondWrapper.find('.edit-task-done').length).to.equal(0);
    });

    it('should render an empty div if isDone', function(){
        const wrapper = shallow(
            <EditTaskDone 
                isArchived={false}
                isDone={1}/>)

        expect(wrapper.find('.edit-task-done').length).to.equal(0);

        const secondWrapper = shallow(
            <EditTaskDone 
                isArchived={true}
                isDone={1}/>)
        expect(secondWrapper.find('.edit-task-done').length).to.equal(0);

    });

    it('should render the edit-task-done div if both isArchived and isDone are false', function(){
        const wrapper = shallow(<EditTaskDone isArchived={false} isDone={0}/>);
        expect(wrapper.find('.edit-task-done').length).to.equal(1);
    });

    it('should have all the expected props', function(){
        const wrapper = shallow(<EditTaskDone/>);
        expect(wrapper.props().id).to.be.defined;
        expect(wrapper.props().isDone).to.be.defined;
        expect(wrapper.props().description).to.be.defined;
        expect(wrapper.props().updateTaskDoneStatus).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
    });

    it('should call updateTaskDoneStatus when `Done` is clicked', function(){
        const updateSpy = spy();
        const wrapper = shallow(
            <EditTaskDone 
                isArchived={false}
                isDone={0}
                updateTaskDoneStatus={updateSpy}/>);
        expect(wrapper.find('#set-as-done-button').length).to.equal(1);

        const doneButton = wrapper.find('#set-as-done-button');
        doneButton.simulate('click');

        expect(updateSpy.calledOnce).to.equal(true);
    })
})
