import React from "react";
import {SpeedChart} from "./SpeedChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import * as operations from '../Utils/operations';
import Grid from '@material-ui/core/Grid';
import toJson from "enzyme-to-json";
import {getCurrentTrackPoint, getLaps} from "../__test__/test-utilities";
import {mockSpeedMethods} from "../__mocks__/mock-utils";

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Elevations Chart Test", () => {
    let updateTrackPointMock;
    let currentTrackPoint;
    let laps;
    let component;
    let props;
    beforeAll(() => {
        currentTrackPoint = getCurrentTrackPoint();
        laps = getLaps();
        props = {
            currentTrackpoint: currentTrackPoint,
            laps: laps,
        };
    });
    beforeEach( () => {
        mockSpeedMethods(operations);
        updateTrackPointMock = jest.fn();
    });
    afterEach( () => {
        jest.resetAllMocks();
        component.unmount();
    });
    it("Checking the speed chart snapshot",async () => {
        component = shallow(<SpeedChart />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Checking the resize event on window speed chart.",async () => {
        const mockSizeGrid = sizeMe({monitorHeight: true})(Grid);
        const widthMockValue = 15;
        const heightMockValue = 10;
        mockSizeGrid.state = {
            width: widthMockValue,
            height: heightMockValue
        };
        component = mount(<SpeedChart props={props}
                                           yTitle={'Speed (m/s)'}
                                           xTitle={'Time (hh:mm:ss)'}
                                           updateTrackpoint={updateTrackPointMock}/>);
        const instance = component.instance();
        instance.chartGrid = mockSizeGrid;
        window.dispatchEvent(new Event('resize'));
        expect(instance.state.width).toEqual(widthMockValue);
        expect(instance.state.height).toEqual(heightMockValue);
    });
});
