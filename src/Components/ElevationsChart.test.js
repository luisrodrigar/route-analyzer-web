import React from "react";
import {ElevationsChart} from "./ElevationsChart";
import sizeMe from 'react-sizeme';
import {mount, shallow} from "enzyme";
import * as operations from '../Utils/operations';
import Grid from '@material-ui/core/Grid';
import ReactTestUtils from 'react-dom/test-utils';

jest.mock('../Utils/operations');
jest.mock('../actions/index');

describe("Elevations Chart Test", () => {
    let elevations;
    let elevationsLap;
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
            alt: 12.343
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
                        alt: 12.343
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2122,
                            lng: 0.2325
                        },
                        alt: 12.543
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
                        alt: 13.343
                    },
                    {
                        index: 1,
                        position: {
                            lat: 1.2128,
                            lng: 0.2326
                        },
                        alt: 15.543
                    }
                ]
            }
        ];
        elevations = [
            ["2019-07-07T10:34:00Z", 123],
            ["2019-07-07T10:34:10Z", 130],
            ["2019-07-07T10:34:20Z", 132],
            ["2019-07-07T10:34:30Z", 114],
            ["2019-07-07T10:34:40Z", 124]
        ];
        elevationsLap = [
            {
                index: 0,
                color: '#032',
                label: "Lap0",
                tracks: [
                    ["2019-07-07T10:34:00Z", 123],
                    ["2019-07-07T10:34:10Z", 130],
                ]
            },
            {
                index: 1,
                color: '#012',
                label: "Lap1",
                tracks: [
                    ["2019-07-07T10:34:20Z", 132],
                    ["2019-07-07T10:34:30Z", 114],
                    ["2019-07-07T10:34:40Z", 124]
                ]
            },
            {
                index: 2,
                color: '#002',
                label: "Lap2",
                tracks: [
                    ["2019-07-07T10:34:40Z", 124]
                ]
            }
        ];
        props = {
            currentTrackpoint: currentTrackpoint,
            laps: laps,
        };
    });
    beforeEach(() => {
        operations.getElevationData.mockImplementationOnce(() => elevations);
        operations.getLapsElevations.mockImplementationOnce(() => elevationsLap);
        updateTrackPointMock = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("Checking the snapshot",  () => {
        component = shallow(<ElevationsChart/>);
        expect(component).toMatchSnapshot();
        component.unmount();
    });
    it("Checking the resize event on window.",  () => {
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
        component.unmount();
    });
    it("Checking mouse over event.",   () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <ElevationsChart props={props}
                             yTitle={'Altitude (m)'}
                             xTitle={'Time (hh:mm:ss)'}
                             updateTrackpoint={updateTrackPointMock}/>
        );

        let areaChart = ReactTestUtils.findAllInRenderedTree(instance, (e) =>
            ReactTestUtils.findAllInRenderedTree(e, ed => console.log(ed)));

        ReactTestUtils.Simulate.mouseOver(ReactDOM.findDOMNode(areaChart));

        expect(updateTrackPointMock).toBeCalled();
    });
});