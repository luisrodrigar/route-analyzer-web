import React from "react";
import {HeartRateChart} from "./HeartRateChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import * as operations from '../Utils/operations';
import Grid from '@material-ui/core/Grid';
import toJson from "enzyme-to-json";

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Heart Rate Chart Test", () => {
    let heartRates;
    let heartRatesLap;
    let heartRatesAvg;
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
            bpm: 98
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
                        bpm: 90
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2122,
                            lng: 0.2325
                        },
                        alt: 12.543,
                        bpm: 98
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
                        bpm: 110
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2128,
                            lng: 0.2326
                        },
                        alt: 15.543,
                        bpm: 120
                    }
                ]
            }
        ];
        heartRates = [
            ["2019-07-07T10:34:00Z", 90],
            ["2019-07-07T10:34:10Z", 98],
            ["2019-07-07T10:34:20Z", 110],
            ["2019-07-07T10:34:30Z", 120],
            ["2019-07-07T10:34:40Z", 135]
        ];
        heartRatesLap = [
            {
                index: 0,
                color: '#032',
                label: "Lap0",
                tracks: [
                    ["2019-07-07T10:34:00Z", 90],
                    ["2019-07-07T10:34:10Z", 98],
                ]
            },
            {
                index: 1,
                color: '#012',
                label: "Lap1",
                tracks: [
                    ["2019-07-07T10:34:20Z", 110],
                    ["2019-07-07T10:34:30Z", 120]
                ]
            },
            {
                index: 2,
                color: '#002',
                label: "Lap2",
                tracks: [
                    ["2019-07-07T10:34:40Z", 135]
                ]
            }
        ];
        heartRatesAvg = [
            ["2019-07-07T10:34:05Z", 94],
            ["2019-07-07T10:34:25Z", 115],
            ["2019-07-07T10:34:40Z", 135]
        ];
        props = {
            currentTrackpoint: currentTrackpoint,
            laps: laps,
        };
    });
    beforeEach( () => {
        operations.getLapsHeartRate.mockImplementationOnce(() => heartRatesLap);
        operations.getHeartRateData.mockImplementationOnce(() => heartRates);
        operations.getAvgBpm.mockImplementationOnce(() => heartRatesAvg);
        updateTrackPointMock = jest.fn();
    });
    afterEach( () => {
        jest.resetAllMocks();
        component.unmount();
    });
    it("Checking the heart rate snapshot",() => {
        component = shallow(<HeartRateChart />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it("Checking the resize event on window heart rate.",() => {
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
