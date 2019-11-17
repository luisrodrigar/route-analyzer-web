jest.mock('js-file-download');
jest.mock("../Services/file");
import React from "react";
import { DownloadFileComponent } from "./DownloadFileComponent";
import { shallow } from 'enzyme';
import jsFileDownload from 'js-file-download';
import * as fileService from '../Services/file';

describe("Download File Component Test", () => {
    let id;
    const gpxType = "gpx";
    const tcxType = "tcx";
    beforeAll(() => {
        id = "5ace8cd14c147400048aa6b0";
    });
    it("Download a file", async () => {
        const response = {
            result: true,
            value: "Mocked response."
        };
        fileService.get.mockResolvedValue(response);
        const props = {
            id,
            type: gpxType
        };
        const component = shallow(<DownloadFileComponent {...props} />);
        const instance = component.instance();
        await instance.busy;
        const buttonDownload = component.find('button').at(0);
        await buttonDownload.simulate('click');
        expect(fileService.get).toBeCalledWith(id, gpxType);
        expect(jsFileDownload).toBeCalledWith(response, id + "_" + gpxType + ".xml");
    });
});

