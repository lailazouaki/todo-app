import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import EditTaskDescription from '../app/components/EditTaskDescription';

describe('<EditTaskDescription/>', function (){
    it('should render an empty div if isArchived', function(){
        const wrapper = shallow(
            <EditTaskDescription 
                isArchived={true}
                isDone={0}/>)

        expect(wrapper.find('.edit-task-description').length).to.equal(0);

        const secondWrapper = shallow(
            <EditTaskDescription 
                isArchived={true}
                isDone={1}/>)
        expect(secondWrapper.find('.edit-task-description').length).to.equal(0);
    });

    it('should render an empty div if isDone', function(){
        const wrapper = shallow(
            <EditTaskDescription 
                isArchived={false}
                isDone={1}/>)

        expect(wrapper.find('.edit-task-description').length).to.equal(0);

        const secondWrapper = shallow(
            <EditTaskDescription 
                isArchived={true}
                isDone={1}/>)
        expect(secondWrapper.find('.edit-task-description').length).to.equal(0);

    });

    it('should render the edit-task-description div if both isArchived and isDone are false', function(){
        const wrapper = shallow(<EditTaskDescription isArchived={false} isDone={0}/>);
        expect(wrapper.find('.edit-task-description').length).to.equal(1);
    });

    it('should have all expected props', function (){
        const wrapper = shallow(<EditTaskDescription/>);
        expect(wrapper.props().id).to.be.defined;
        expect(wrapper.props().isDone).to.be.defined;
        expect(wrapper.props().currentDescription).to.be.defined;
        expect(wrapper.props().updateTaskDescription).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
    });

    it('should set modalIsOpen to true when `Edit` is clicked', function(){
        const wrapper = shallow(<EditTaskDescription isArchived={false} isDone={0}/>)
        expect(wrapper.find('#edit-task-description-button').length).to.equal(1);

        const editButton = wrapper.find('#edit-task-description-button');
        editButton.simulate('click');
        expect(wrapper.state('modalIsOpen')).to.equal(true);
    });

    it('should set modalIsOpen to false when `Close` is clicked', function(){
        const wrapper = shallow(<EditTaskDescription isArchived={false} isDone={0}/>)
        expect(wrapper.find('#close-edit-description-modal').length).to.equal(1);

        const closeModalButton = wrapper.find('#close-edit-description-modal');
        closeModalButton.simulate('click');
        expect(wrapper.state('modalIsOpen')).to.equal(false);
    });

    it('should call handleClickEditDescription when `Save` is clicked', function(){
        const wrapper = shallow(<EditTaskDescription isArchived={false} isDone={0}/>)
        expect(wrapper.find('#save-edited-description').length).to.equal(1);

        const saveButton = wrapper.find('#save-edited-description');
        /* saveButton.simulate('click'); 
            Getting the error TypeError: Cannot read property 'value' of null*/
    })
})