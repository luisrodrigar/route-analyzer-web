import * as operations from './operations';
import * as colorsOperations from './colors';
import {
    expectedLapsWithColor,
    getArrayColors,
    getElevationsData,
    getElevationsLaps,
    getExpectedSpeedLaps,
    getHeartRateAvgValues,
    getHeartRateAvgValuesOneLap,
    getHeartRateData,
    getHeartRateLaps,
    getLaps,
    getRouteAnalyzerWebLaps,
    getRouteAnalyzerWebOneLap,
    getSpeedAvgData,
    getSpeedAvgDataOneLap,
    getSpeedData,
    lapsWithoutColors
} from '../__test__/test-utilities';

jest.mock('./colors');

describe("Logic operations test suite.", () => {
    const laps = getLaps();
    const webLaps = getRouteAnalyzerWebLaps();
    const webOneLap = getRouteAnalyzerWebOneLap();
    it("Test laps to track points", () => {
        const result = operations.getLapsTrackPoints(laps);
        const expectedResult = getRouteAnalyzerWebLaps();
        expect(result).toStrictEqual(expectedResult);
    });
    it("Test setting the color and light color in a lap", () => {
        const lapsNoColors = lapsWithoutColors();
        colorsOperations.getColorRandom.mockImplementation(() => getArrayColors());
        operations.setLapColors(lapsNoColors);
        const expectedResult = expectedLapsWithColor();
        expect(lapsNoColors).toStrictEqual(expectedResult);
    });
    it("Test get laps speed", () => {
        const result = operations.getLapsSpeed(webLaps);
        const expectedSpeedLaps = getExpectedSpeedLaps();
        expect(result).toStrictEqual(expectedSpeedLaps);
    });
    it("Test get laps heart rate", () => {
        const result = operations.getLapsHeartRate(webLaps);
        const expectedHeartRateLaps = getHeartRateLaps();
        expect(result).toStrictEqual(expectedHeartRateLaps);
    });
    it("Test get laps elevations", () => {
        const result = operations.getLapsElevations(webLaps);
        const expectedElevationLaps = getElevationsLaps();
        expect(result).toStrictEqual(expectedElevationLaps);
    });
    it("Test get avg bpm", () => {
        const result = operations.getAvgBpm(webLaps);
        const expectedAvgBpmValues = getHeartRateAvgValues();
        expect(result).toStrictEqual(expectedAvgBpmValues);
    });
    it("Test get avg speed", () => {
        const result = operations.getAvgSpeed(webLaps);
        const expectedSpeedAvgData = getSpeedAvgData();
        expect(result).toStrictEqual(expectedSpeedAvgData);
    });
    it("Test get avg bpm one lap", () => {
        const result = operations.getAvgBpm(webOneLap);
        const expectedAvgBpmOneLap = getHeartRateAvgValuesOneLap();
        expect(result).toStrictEqual(expectedAvgBpmOneLap);
    });
    it("Test get avg speed one lap", () => {
        const result = operations.getAvgSpeed(webOneLap);
        const expectedSpeedAvgOneLap = getSpeedAvgDataOneLap();
        expect(result).toStrictEqual(expectedSpeedAvgOneLap);
    });
    it("Test get speed data", () => {
        const result = operations.getSpeedData(webLaps);
        const expectedSpeedData = getSpeedData();
        expect(result).toStrictEqual(expectedSpeedData);
    });
    it("Test get bpm data", () => {
        const result = operations.getHeartRateData(webLaps);
        const expectedHeartRateData = getHeartRateData();
        expect(result).toStrictEqual(expectedHeartRateData);
    });
    it("Test get elevation data", () => {
        const result = operations.getElevationData(webLaps);
        const expectedElevationData = getElevationsData();
        expect(result).toStrictEqual(expectedElevationData);
    });
    it("Test get nearest track point", () => {
        let position = {
            lat: 42.546897888183510,
            lng: -6.582358360290530
        };
        const result = operations.getNearestPosition(webLaps, position);
        expect(result).toBeTruthy();
        // Given index values to get accessed in an array
        expect(result.indexLap).toBe(2);
        expect(result.indexTrackpoint).toBe(0);
    });
});
