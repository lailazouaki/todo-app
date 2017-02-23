import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import ArchiveTask from '../app/components/ArchiveTask';

describe('<ArchiveTask/>', function (){
    it('should have id, isArchived, deleteTask in props', function(){
        const wrapper = shallow(<ArchiveTask/>);
        expect(wrapper.props().id).to.be.defined;
        expect(wrapper.props().isArchived).to.be.defined;
        expect(wrapper.props().deleteTask).to.be.defined;
    });

    it('should render an empty div if isArchived is true', function (){
        const wrapper = shallow(<ArchiveTask isArchived={true}/>);
        expect(wrapper.find('.archive-task').length).to.equal(0);
        expect(wrapper.find('#archive').length).to.equal(0);
    });

    it('should render the archive-task div if isArchived is false', function(){
        const wrapper = shallow(<ArchiveTask isArchived={false}/>);
        expect(wrapper.find('.archive-task').length).to.equal(1);
        expect(wrapper.find('#archive').length).to.equal(1);
    });

    it('should call handleClickArchive if the `Delete` button is clicked', function(){
        const archiveButtonSpy = spy();
        const wrapper = shallow(
            <ArchiveTask 
                isArchived={false}
                deleteTask={archiveButtonSpy}/>);
        const archiveButton = wrapper.find('#archive');

        archiveButton.simulate('click');
        expect(archiveButtonSpy.calledOnce).to.equal(true);
    });
})