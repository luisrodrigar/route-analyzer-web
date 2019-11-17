import React from 'react';
import { shallow, mount } from 'enzyme';
import { FileUploaderContainer } from './FileUploaderContainer';

// Create the mock store
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

describe('App main component', () => {
    let wrapper, store;

    beforeEach(() => {
        const initialState = {};
        store = mockStore(initialState);

        store.dispatch.actionShowRoute = jest.fn();
        store.dispatch.toggleProgress = jest.fn();

        function FormDataMock() {
            this.append = jest.fn();
        }
        global.FormData = FormDataMock

        // Shallow render the container passing in the mock store
        wrapper = shallow(<FileUploaderContainer store={store} />);
    });

    it('Handling submit', () => {
        const mockEvent = {
            preventDefault: jest.fn()
        }
        const references = {
            fileInput: {
                    files: [
                    "File input name"
                    ]
            },
            type: {
                value: "File input type"
            }
        };
        const wrapperMounted = mount(<FileUploaderContainer store={store} />);
        expect(wrapperMounted.instance().fileInput).toBeTruthy();

        // wrapper.dive().instance().handleSubmit(mockEvent);
        //
        // expect(mockEvent.preventDefault).toHaveBeenCalled();
        // expect(props.dispatch.mock.calls.length).toBe(2);
        // expect(props.toggleProgress.mock.calls.length).toBe(1);
        // expect(props.showRoute.mock.calls.length).toBe(1);
    });
});
