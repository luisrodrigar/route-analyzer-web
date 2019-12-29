import * as operations from "../Utils/operations";

export function getLaps() {
    return [
        {
            index: 1,
            totalTimeSeconds: 10,
            maximumSpeed: 4.727421976808574,
            averageSpeed: 2.9996712051,
            averageHearRate: 94,
            maximumHeartRate: 98,
            tracks: [
                {
                    date: "2018-12-21T14:38:07",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.548370361328125,
                        longitudeDegrees: -6.5837578773498535
                    },
                    altitudeMeters: 556.4249877929688,
                    speed: 1.271920433274412,
                    heartRateBpm: 90
                },
                {
                    date: "2018-12-21T14:38:17",
                    index: 2,
                    position: {
                        latitudeDegrees: 42.54838943481445,
                        longitudeDegrees: -6.583323001861572
                    },
                    altitudeMeters: 556.6911010742188,
                    speed: 4.727421976808574,
                    heartRateBpm: 98
                }
            ]
        },
        {
            index: 2,
            totalTimeSeconds: 10,
            maximumSpeed: 4.533650591446289,
            averageSpeed: 3.1588017983,
            averageHearRate: 115,
            maximumHeartRate: 120,
            tracks: [
                {
                    date: "2018-12-21T14:38:27",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.54792022705078,
                        longitudeDegrees: -6.5830583572387695
                    },
                    altitudeMeters: 553.3866577148438,
                    speed: 1.7839530051752528,
                    heartRateBpm: 110
                },
                {
                    date: "2018-12-21T14:38:37",
                    index: 2,
                    position: {
                        latitudeDegrees: 42.54783248901367,
                        longitudeDegrees: -6.58258581161499
                    },
                    altitudeMeters: 551.2217407226562,
                    speed: 4.533650591446289,
                    heartRateBpm: 120
                }
            ]
        },
        {
            index: 3,
            totalTimeSeconds: 0,
            maximumSpeed: 2.179150563690673,
            averageSpeed: 2.179150563690673,
            averageHearRate: 135,
            maximumHeartRate: 135,
            tracks: [
                {
                    date: "2018-12-21T14:38:37",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.546897888183594,
                        longitudeDegrees: -6.582358360290527
                    },
                    altitudeMeters: 542.0283203125,
                    speed: 2.179150563690673,
                    heartRateBpm: 135
                }
            ]
        }
    ];
}

export function getHeartRateData() {
    return [
        [1545403087000, 90],
        [1545403097000, 98],
        [1545403107000, 110],
        [1545403117000, 120],
        [1545403127000, 135]
    ];
}

export function getHeartRateLaps() {
    return [
        {
            index: 1,
            color: '#ffcc80',
            label: "Lap0",
            tracks: [
                [1545403087000, 90],
                [1545403097000, 98],
            ]
        },
        {
            index: 2,
            color: '#ffbb97',
            label: "Lap1",
            tracks: [
                [1545403107000, 110],
                [1545403117000, 120]
            ]
        },
        {
            index: 3,
            color: '#aaff14',
            label: "Lap2",
            tracks: [
                [1545403127000, 135]
            ]
        }
    ];
}

export function getHeartRateAvgValues() {
    return [
        [1545403092000, 94],
        [1545403112000, 115],
        [1545403127000, 135]
    ];
}

export function getCurrentTrackPoint() {
    return {
        date: "2018-12-21T14:38:17",
        index: 2,
        position: {
            latitudeDegrees: 42.54838943481445,
            longitudeDegrees: -6.583323001861572
        },
        altitudeMeters: 556.6911010742188,
        speed: 4.727421976808574,
        heartRateBpm: 98
    };
}

export function getElevationsData() {
    return [
        [1545403087000, 556.4249877929688],
        [1545403097000, 556.6911010742188],
        [1545403107000, 553.3866577148438],
        [1545403117000, 551.2217407226562],
        [1545403127000, 542.0283203125]
    ];
}

export function getElevationsLaps() {
    return [
        {
            index: 1,
            color: '#ffcc80',
            label: "Lap0",
            tracks: [
                [1545403087000, 556.4249877929688],
                [1545403097000, 556.6911010742188],
            ]
        },
        {
            index: 2,
            color: '#ffbb97',
            label: "Lap1",
            tracks: [
                [1545403107000, 553.3866577148438],
                [1545403117000, 551.2217407226562]
            ]
        },
        {
            index: 3,
            color: '#aaff14',
            label: "Lap2",
            tracks: [
                [1545403127000, 542.0283203125]
            ]
        }
    ];
}

export function getSpeedData() {
    return [
        [1545403087000, 1.271920433274412],
        [1545403097000, 4.727421976808574],
        [1545403107000, 1.7839530051752528],
        [1545403117000, 4.533650591446289],
        [1545403127000, 2.179150563690673]
    ];
}

export function getSpeedLaps() {
    return [
        {
            index: 1,
            color: '#ffcc80',
            label: "Lap0",
            tracks: [
                [1545403087000, 1.271920433274412],
                [1545403097000, 4.727421976808574],
            ]
        },
        {
            index: 2,
            color: '#ffbb97',
            label: "Lap1",
            tracks: [
                [1545403107000, 1.7839530051752528],
                [1545403117000, 4.533650591446289]
            ]
        },
        {
            index: 3,
            color: '#aaff14',
            label: "Lap2",
            tracks: [
                [1545403127000, 2.179150563690673]
            ]
        }
    ];
}

export function getSpeedAvgData() {
    return [
        [1545403092000, 2.9996712051],
        [1545403112000, 3.1588017983],
        [1545403127000, 2.179150563690673]
    ];
}
