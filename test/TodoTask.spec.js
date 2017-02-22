import React from 'react';
import { mount , shallow } from 'enzyme';
import { expect } from 'chai';

import TodoTask from '../app/components/TodoTask';

describe('<TodoTask/>', function () {
    it('should have props for id, description, isDone, isArchived', function (){
        const wrapper = shallow(<TodoTask/>);
        expect(wrapper.props().id).to.be.defined;
        expect(wrapper.props().description).to.be.defined;
        expect(wrapper.props().isDone).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
        expect(wrapper.props().deleteTask).to.be.defined;
    });
})