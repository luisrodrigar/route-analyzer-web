import React from "react";
import {SpeedChart} from "./SpeedChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import * as operations from '../Utils/operations';
import Grid from '@material-ui/core/Grid';
import toJson from "enzyme-to-json";

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Elevations Chart Test", () => {
    let speedData;
    let speedLap;
    let speedAvg;
    let updateTrackPointMock;
    let currentTrackpoint;
    let laps;
    let component;
    let props;
    beforeAll(() => {
        currentTrackpoint = {
            index: 0,
            position: {
                lat: 1.2123,
                lng: 0.2324
            },
            alt: 12.343,
            speed: 4.5543
        };
        laps = [
            {
                index: 0,
                tracks: [
                    {
                        index: 0,
                        position: {
                            lat: 1.2123,
                            lng: 0.2324
                        },
                        alt: 12.343,
                        speed: 4.5543
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2122,
                            lng: 0.2325
                        },
                        alt: 12.543,
                        speed: 5.8675
                    }
                ]
            },
            {
                index: 1,
                tracks: [
                    {
                        index: 0,
                        position: {
                            lat: 1.2124,
                            lng: 0.2327
                        },
                        alt: 13.343,
                        speed: 4.9323
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2128,
                            lng: 0.2326
                        },
                        alt: 15.543,
                        speed: 5.0434
                    }
                ]
            }
        ];
        speedData = [
            ["2019-07-07T10:34:00Z", 5.0434],
            ["2019-07-07T10:34:10Z", 5.8675],
            ["2019-07-07T10:34:20Z", 5.0032],
            ["2019-07-07T10:34:30Z", 4.0034],
            ["2019-07-07T10:34:40Z", 4.9323]
        ];
        speedLap = [
            {
                index: 0,
                color: '#032',
                label: "Lap0",
                tracks: [
                    ["2019-07-07T10:34:00Z", 5.0434],
                    ["2019-07-07T10:34:10Z", 5.8675],
                ]
            },
            {
                index: 1,
                color: '#012',
                label: "Lap1",
                tracks: [
                    ["2019-07-07T10:34:20Z", 5.0032],
                    ["2019-07-07T10:34:30Z", 4.0034],
                ]
            },
            {
                index: 2,
                color: '#002',
                label: "Lap2",
                tracks: [
                    ["2019-07-07T10:34:40Z", 4.9323]
                ]
            }
        ];
        speedAvg = [
            ["2019-07-07T10:34:05Z", 5.4564],
            ["2019-07-07T10:34:25Z", 4.5543],
            ["2019-07-07T10:34:40Z", 4.9323]
        ];
        props = {
            currentTrackpoint: currentTrackpoint,
            laps: laps,
        };
    });
    beforeEach( () => {
        operations.getLapsSpeed.mockImplementationOnce(() => speedLap);
        operations.getSpeedData.mockImplementationOnce(() => speedData);
        operations.getAvgSpeed.mockImplementationOnce(() => speedAvg)
        updateTrackPointMock = jest.fn();
    });
    afterEach( () => {
        jest.resetAllMocks();
        component.unmount();
    });
    it("Checking the speed chart snapshot",() => {
        component = shallow(<SpeedChart />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Checking the resize event on window speed chart.",() => {
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
