import React from "react";
import {ElevationsChart} from "./ElevationsChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import * as operations from '../Utils/operations';
import Grid from '@material-ui/core/Grid';
import toJson from "enzyme-to-json";
import {getCurrentTrackPoint, getLaps} from "../__test__/test-utilities";
import {mockElevationsMethods} from "../__mocks__/mock-utils";

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Elevations Chart Test", () => {
    let elevationsData;
    let elevationsLap;
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
        mockElevationsMethods(operations);
        updateTrackPointMock = jest.fn();
    });
    afterEach( () => {
        jest.resetAllMocks();
        component.unmount();
    });
    it("Checking the elevation chart snapshot", async () => {
        component = shallow(<ElevationsChart/>);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Checking the resize event on window elevation chart.", async () => {
        const mockSizeGrid = sizeMe({monitorHeight: true})(Grid);
        const widthMockValue = 15;
        const heightMockValue = 10;
        mockSizeGrid.state = {
            width: widthMockValue,
            height: heightMockValue
        };
        component = mount(<ElevationsChart props={props}
                                           yTitle={'Altitude (m)'}
                                           xTitle={'Time (hh:mm:ss)'}
                                           updateTrackpoint={updateTrackPointMock}/>);
        const instance = component.instance();
        instance.chartGrid = mockSizeGrid;
        window.dispatchEvent(new Event('resize'));
        expect(instance.state.width).toEqual(widthMockValue);
        expect(instance.state.height).toEqual(heightMockValue);
    });
});
