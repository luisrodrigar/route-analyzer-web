import {
    getElevationsData,
    getElevationsLaps,
    getHeartRateAvgValues,
    getHeartRateData,
    getHeartRateLaps, getSpeedAvgData, getSpeedData, getSpeedLaps
} from "../__test__/test-utilities";

export function mockHeartRateMethods(operations) {
    operations.getLapsHeartRate.mockImplementationOnce(() => getHeartRateLaps());
    operations.getHeartRateData.mockImplementationOnce(() => getHeartRateData());
    operations.getAvgBpm.mockImplementationOnce(() => getHeartRateAvgValues());
    return operations;
}

export function mockElevationsMethods(operations) {
    operations.getElevationData.mockImplementationOnce(() => getElevationsData());
    operations.getLapsElevations.mockImplementationOnce(() => getElevationsLaps());
    return operations;
}

export function mockSpeedMethods(operations) {
    operations.getLapsSpeed.mockImplementationOnce(() => getSpeedLaps());
    operations.getSpeedData.mockImplementationOnce(() => getSpeedData());
    operations.getAvgSpeed.mockImplementationOnce(() => getSpeedAvgData());
    return operations;
}

