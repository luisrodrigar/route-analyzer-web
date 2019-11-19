import React from 'react';
import { shallow, mount } from 'enzyme';
import { FileUploaderContainer } from './FileUploaderContainer';
jest.mock("../Services/file");
import * as fileServices from '../Services/file';

// Create the mock store
import configureMockStore from 'redux-mock-store';
import toJson from "enzyme-to-json";
const mockStore = configureMockStore();


describe('File Updater Container Test Cases', () => {
    let preventDefaultMock;
    let appendMockFn;
    let toggleProgressMock;
    let actionShowRouteMock;
    let activityId;
    beforeAll(() => {
        activityId = "5ace8cd14c147400048aa6b0";
    });
    beforeEach(() => {
        toggleProgressMock = jest.fn();
        actionShowRouteMock = jest.fn();
        appendMockFn = jest.fn();
        window.FormData = jest.fn(() => ({ append: appendMockFn }));
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Render initialization successfully', () => {
        const component = shallow(<FileUploaderContainer toggleProgress={toggleProgressMock}
                                                       actionShowRoute={actionShowRouteMock} />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('FormData is called with right tcx param and file.', async () => {
        const component = mount(<FileUploaderContainer toggleProgress={toggleProgressMock}
                                                       actionShowRoute={actionShowRouteMock} />);
        fileServices.upload.mockResolvedValueOnce(jest.fn());
        const mockFileName = "Mock file name";
        const fileInputMock = {
            files: [mockFileName]
        };
        component.instance().fileInput = fileInputMock;
        const tcxTypeMock = {
            value: "tcx"
        }
        component.instance().type = tcxTypeMock;

        preventDefaultMock = {
            preventDefault: jest.fn(() => ({}))
        };
        const form = component.find('form');
        await form.simulate('submit', preventDefaultMock);
        expect(appendMockFn).toBeCalledTimes(2);
        expect(appendMockFn).toBeCalledWith("file", mockFileName);
        expect(appendMockFn).toBeCalledWith("type", tcxTypeMock.value);

        const formData = new FormData();
        formData.append('file', mockFileName);
        formData.append('type', tcxTypeMock.value);
        expect(fileServices.upload).toBeCalledWith(formData);
    });
    it('Handling submit file.', async () => {
        const component = mount(<FileUploaderContainer toggleProgress={toggleProgressMock}
                                                         actionShowRoute={actionShowRouteMock} />);
        fileServices.upload.mockResolvedValueOnce(activityId);
        preventDefaultMock = {
            preventDefault: jest.fn(() => ({}))
        };
        const form = component.find('form');
        await form.simulate('submit', preventDefaultMock);

        expect(preventDefaultMock.preventDefault).toBeCalled();
        expect(toggleProgressMock).toBeCalledWith(true);
        expect(fileServices.upload).toBeCalled();
        expect(actionShowRouteMock).toBeCalledWith("5ace8cd14c147400048aa6b0");
        expect(actionShowRouteMock).not.toBeCalledWith(null);
    });
    it('Error trying to upload some file', async () => {
        const component = mount(<FileUploaderContainer toggleProgress={toggleProgressMock}
                                                       actionShowRoute={actionShowRouteMock} />);
        window.alert = jest.fn(() => ({}));

        const error = {
            message: "Error mocked"
        };
        fileServices.upload.mockRejectedValueOnce(jest.fn(() => error));
        preventDefaultMock = {
            preventDefault: jest.fn(() => ({}))
        };
        const form = component.find('form');
        form.simulate('submit', preventDefaultMock);

        expect(preventDefaultMock.preventDefault).toBeCalled();
        expect(toggleProgressMock).toBeCalledWith(true);
        expect(fileServices.upload).toBeCalled();
        expect(actionShowRouteMock).not.toBeCalledWith("5ace8cd14c147400048aa6b0");
        // expect(await window.alert).toBeCalledWith(error.message);
        // expect(await actionShowRouteMock).toBeCalledWith(null);
    });
});
