import toJson from "enzyme-to-json";

jest.mock('js-file-download');
jest.mock("../Services/file");
jest.mock("../Services/activity");
import React from "react";
import { DownloadFileComponent } from "./DownloadFileComponent";
import { shallow } from 'enzyme';
import jsFileDownload from 'js-file-download';
import * as fileService from '../Services/file';
import * as activityService from '../Services/activity';
import flushPromises from "flush-promises";

describe("Download File Component Test", () => {
    const gpxType = "gpx";
    const tcxType = "tcx";
    let id;
    let gpxProps;
    let tcxProps;
    beforeAll(() => {
        id = "5ace8cd14c147400048aa6b0";
        gpxProps = {
            id,
            type: gpxType
        };
        tcxProps = {
            id,
            type: tcxType
        };
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it("Initial render without crashing", async () => {
        const component = shallow(<DownloadFileComponent {...tcxProps} />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Download a file", async () => {
        const response = {
            result: true,
            value: "Mocked response."
        };
        fileService.get.mockResolvedValueOnce(response);
        const component = shallow(<DownloadFileComponent {...gpxProps} />);
        const instance = component.instance();
        await instance.busy;
        const buttonDownload = component.find('button').at(0);
        expect(buttonDownload.text()).toBe("Download file ");
        await buttonDownload.simulate('click');
        expect(fileService.get).toBeCalledWith(id, gpxType);
        expect(jsFileDownload).toBeCalledWith(response, id + "_" + gpxType + ".xml");
    });
    it("Error downloading gpx file", async () => {
        const error = {
            message: "Mocked error response."
        };
        fileService.get.mockRejectedValueOnce(error);
        const component = shallow(<DownloadFileComponent {...gpxProps} />);
        const instance = component.instance();
        await instance.busy;
        const buttonDownload = component.find('button').at(0);
        expect(buttonDownload.text()).toBe("Download file ");
        await buttonDownload.simulate('click');
        expect(fileService.get).toHaveBeenCalledWith(id, gpxType);
        expect(jsFileDownload).not.toHaveBeenCalled();
    });
    it("Export activity to tcx file", async () => {
        const response = {
            message: "Activity exported."
        };
        activityService.exportAs.mockResolvedValueOnce(response);
        const component = shallow(<DownloadFileComponent {...tcxProps} />);
        const instance = component.instance();
        await instance.busy;
        const buttonExportTcx = component.find('button').at(1);
        expect(buttonExportTcx.text()).toBe("Export as TCX");
        await buttonExportTcx.simulate('click');
        expect(activityService.exportAs).toHaveBeenCalledWith(id, tcxType);
        expect(jsFileDownload).toHaveBeenCalledWith(response, id + "_" + tcxType + ".xml");
    });
    it("Export activity to gpx file", async () => {
        const response = {
            message: "Activity exported."
        };
        activityService.exportAs.mockResolvedValueOnce(response);
        const component = shallow(<DownloadFileComponent {...gpxProps} />);
        const instance = component.instance();
        await instance.busy;
        const buttonExportGpx = component.find('button').at(2);
        expect(buttonExportGpx.text()).toBe("Export as GPX");
        await buttonExportGpx.simulate('click');
        expect(activityService.exportAs).toHaveBeenCalledWith(id, gpxType);
        expect(jsFileDownload).toHaveBeenCalledWith(response, id + "_" + gpxType + ".xml");
    });
    it("Error exporting activity", async () => {
        window.alert = jest.fn(() => ({}));
        const error = {
            message: "Error exporting an activity."
        };
        activityService.exportAs.mockRejectedValueOnce(error);
        const component = shallow(<DownloadFileComponent {...tcxProps} />);
        const instance = component.instance();
        await instance.busy;
        const buttonExportTcx = component.find('button').at(1);
        buttonExportTcx.simulate('click');

        await flushPromises();

        expect(activityService.exportAs).toHaveBeenCalledWith(id, tcxType);
        expect(jsFileDownload).not.toHaveBeenCalledWith();
        expect(window.alert).toBeCalledWith(error.message);
    });
});

