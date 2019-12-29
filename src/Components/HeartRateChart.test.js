import React from "react";
import {HeartRateChart} from "./HeartRateChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import Grid from '@material-ui/core/Grid';
import toJson from "enzyme-to-json";
import {getCurrentTrackPoint, getLaps} from "../__test__/test-utilities";
import {mockHeartRateMethods} from "../__mocks__/mock-utils";
import * as operations from '../Utils/operations';

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Heart Rate Chart Test", () => {
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
        mockHeartRateMethods(operations);
        updateTrackPointMock = jest.fn();
    });
    afterEach( () => {
        jest.resetAllMocks();
        component.unmount();
    });
    it("Checking the heart rate snapshot",async () => {
        component = shallow(<HeartRateChart />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Checking the resize event on window heart rate.",async () => {
        const mockSizeGrid = sizeMe({monitorHeight: true})(Grid);
        const widthMockValue = 15;
        const heightMockValue = 10;
        mockSizeGrid.state = {
            width: widthMockValue,
            height: heightMockValue
        };
        component = mount(<HeartRateChart props={props}
                                           yTitle={'Heart Rate (bpm)'}
                                           xTitle={'Time (hh:mm:ss)'}
                                           updateTrackpoint={updateTrackPointMock}/>);
        const instance = component.instance();
        instance.chartGrid = mockSizeGrid;
        window.dispatchEvent(new Event('resize'));
        expect(instance.state.width).toEqual(widthMockValue);
        expect(instance.state.height).toEqual(heightMockValue);
    });
});
