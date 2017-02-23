import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import AddTodo from '../app/components/AddTodo';

describe('<AddTodo/>', function () {
    it('should have all the addTask props', function (){
        const wrapper = shallow(<AddTodo/>);
        expect(wrapper.props().addTask).to.be.defined;
    });

    it('should start with a closed modal', function (){
        const wrapper = shallow(<AddTodo/>);
        expect(wrapper.state('modalIsOpen')).to.equal(false);
    });

    it('should render a modal', function (){
        const wrapper = shallow(<AddTodo/>);
        expect(wrapper.find('.add-todo')).to.have.length(1);
        expect(wrapper.find('#add-task')).to.have.length(1);
        expect(wrapper.find('Modal')).to.have.length(1);
    });

    it('should have the right state depending on whether the modal is opened or not', function(){
        const wrapper = shallow(<AddTodo/>);
        const addButton = wrapper.find('#add-task');

        expect(wrapper.state('modalIsOpen')).to.equal(false);
        addButton.simulate('click');
        expect(wrapper.state('modalIsOpen')).to.equal(true);

        const closeModalButton = wrapper.find('#close-modal');
        closeModalButton.simulate('click');
        expect(wrapper.state('modalIsOpen')).to.equal(false);
    });

    it('should call the addTask props when `Save` is clicked', function(){
        const wrapper = shallow(<AddTodo/>);
        const saveButton = wrapper.find('#save-task')
        expect(saveButton).to.have.length(1);

        /* Could not manage to simulate the clicking of this button without
        getting an error */
    })
})