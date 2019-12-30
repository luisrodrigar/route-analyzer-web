import * as operations from "../Utils/operations";

export function getLaps() {
    return [
        {
            index: 1,
            startTime: "2018-12-21T14:38:07Z",
            totalTimeSeconds: 10,
            maximumSpeed: 4.727421976808574,
            averageSpeed: 2.9996712051,
            averageHearRate: 94,
            maximumHeartRate: 98,
            calories: 67,
            intensity: "LOW",
            color: '#ff320b',
            lightColor: '#cccc80',
            distanceMeters: null,
            tracks: [
                {
                    date: "2018-12-21T14:38:07Z",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.548370361328125,
                        longitudeDegrees: -6.5837578773498535
                    },
                    altitudeMeters: 556.4249877929688,
                    speed: 1.271920433274412,
                    heartRateBpm: 90,
                    distanceMeters: 0
                },
                {
                    date: "2018-12-21T14:38:17Z",
                    index: 2,
                    position: {
                        latitudeDegrees: 42.54838943481445,
                        longitudeDegrees: -6.583323001861572
                    },
                    altitudeMeters: 556.6911010742188,
                    speed: 4.727421976808574,
                    heartRateBpm: 98,
                    distanceMeters: 20
                }
            ]
        },
        {
            index: 2,
            startTime: "2018-12-21T14:38:27Z",
            totalTimeSeconds: 10,
            maximumSpeed: 4.533650591446289,
            averageSpeed: 3.1588017983,
            averageHearRate: 115,
            maximumHeartRate: 120,
            calories: 145,
            intensity: "HIGH",
            color: '#ffbb97',
            lightColor: '#00aa80',
            distanceMeters: null,
            tracks: [
                {
                    date: "2018-12-21T14:38:27Z",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.54792022705078,
                        longitudeDegrees: -6.5830583572387695
                    },
                    altitudeMeters: 553.3866577148438,
                    speed: 1.7839530051752528,
                    heartRateBpm: 110,
                    distanceMeters: 0
                },
                {
                    date: "2018-12-21T14:38:37Z",
                    index: 2,
                    position: {
                        latitudeDegrees: 42.54783248901367,
                        longitudeDegrees: -6.58258581161499
                    },
                    altitudeMeters: 551.2217407226562,
                    speed: 4.533650591446289,
                    heartRateBpm: 120,
                    distanceMeters: 57
                }
            ]
        },
        {
            index: 3,
            totalTimeSeconds: 0,
            startTime: "2018-12-21T14:38:47Z",
            maximumSpeed: 2.179150563690673,
            averageSpeed: 2.179150563690673,
            averageHearRate: 135,
            maximumHeartRate: 135,
            calories: 89,
            intensity: "LOW",
            color: '#0214ff',
            lightColor: '#caac80',
            distanceMeters: 0,
            tracks: [
                {
                    date: "2018-12-21T14:38:47Z",
                    index: 1,
                    position: {
                        latitudeDegrees: 42.546897888183594,
                        longitudeDegrees: -6.582358360290527
                    },
                    altitudeMeters: 542.0283203125,
                    speed: 2.179150563690673,
                    heartRateBpm: 135,
                    distanceMeters: 0
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
            color: '#cccc80',
            label: "Lap 1",
            tracks: [
                [1545403087000, 90],
                [1545403097000, 98],
            ]
        },
        {
            index: 2,
            color: '#00aa80',
            label: "Lap 2",
            tracks: [
                [1545403107000, 110],
                [1545403117000, 120]
            ]
        },
        {
            index: 3,
            color: '#caac80',
            label: "Lap 3",
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
            color: '#ff320b',
            label: "Lap 1",
            tracks: [
                [1545403087000, 556.4249877929688],
                [1545403097000, 556.6911010742188],
            ]
        },
        {
            index: 2,
            color: '#ffbb97',
            label: "Lap 2",
            tracks: [
                [1545403107000, 553.3866577148438],
                [1545403117000, 551.2217407226562]
            ]
        },
        {
            index: 3,
            color: '#0214ff',
            label: "Lap 3",
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
            color: '#cccc80',
            label: "Lap 1",
            tracks: [
                [1545403087000, 1.271920433274412],
                [1545403097000, 4.727421976808574],
            ]
        },
        {
            index: 2,
            color: '#00aa80',
            label: "Lap 2",
            tracks: [
                [1545403107000, 1.7839530051752528],
                [1545403117000, 4.533650591446289]
            ]
        },
        {
            index: 3,
            color: '#caac80',
            label: "Lap 3",
            tracks: [
                [1545403127000, 2.179150563690673]
            ]
        }
    ];
}

export function getExpectedSpeedLaps() {
    let speedLaps = getSpeedLaps();
    speedLaps[0].stroke = 2;
    speedLaps[1].stroke = 2;
    speedLaps[2].stroke = 2;
    return speedLaps;
}

export function getSpeedAvgData() {
    return [
        [1545403092000, 2.9996712051],
        [1545403112000, 3.1588017983],
        [1545403127000, 2.179150563690673]
    ];
}

export function getRouteAnalyzerWebLaps() {
    return [
        {
            index:1,
            tracks:[
                {
                    index: 1,
                    position:{
                        lat: 42.548370361328125,
                        lng: -6.5837578773498535
                    },
                    alt: 556.4249877929688,
                    speed: 1.271920433274412,
                    date: 1545403087000,
                    dist: 0,
                    bpm: 90
                },
                {
                    index: 2,
                    position:{
                        lat: 42.54838943481445,
                        lng: -6.583323001861572
                    },
                    alt: 556.6911010742188,
                    speed: 4.727421976808574,
                    date: 1545403097000,
                    dist: 20,
                    bpm: 98
                }
            ],
            color: '#ff320b',
            lightColor: '#cccc80',
            startTime: 1545403087000,
            totalTime: 10,
            distance: null,
            maxSpeed: 4.727421976808574,
            avgSpeed: 2.9996712051,
            avgBpm: 94,
            maxBpm: 98,
            cal: 67,
            intensity: "LOW"
        },
        {
            index:2,
            tracks:[
                {
                    index: 1,
                    position:{
                        lat: 42.54792022705078,
                        lng: -6.5830583572387695
                    },
                    alt: 553.3866577148438,
                    speed: 1.7839530051752528,
                    date: 1545403107000,
                    dist: 0,
                    bpm: 110
                },
                {
                    index: 2,
                    position: {
                        lat: 42.54783248901367,
                        lng: -6.58258581161499
                    },
                    alt: 551.2217407226562,
                    speed: 4.533650591446289,
                    date: 1545403117000,
                    dist: 57,
                    bpm: 120
                }
            ],
            color:'#ffbb97',
            lightColor: '#00aa80',
            startTime: 1545403107000,
            totalTime: 10,
            distance: null,
            maxSpeed: 4.533650591446289,
            avgSpeed: 3.1588017983,
            avgBpm: 115,
            maxBpm: 120,
            cal: 145,
            intensity: "HIGH"
        },
        {
            index:3,
            tracks:[
                {
                    index: 1,
                    date: 1545403127000,
                    position:{
                        lat: 42.546897888183594,
                        lng: -6.582358360290527
                    },
                    alt: 542.0283203125,
                    speed: 2.179150563690673,
                    dist: 0,
                    bpm: 135
                }
            ],
            color: '#0214ff',
            lightColor: '#caac80',
            startTime: 1545403127000,
            totalTime: 0,
            distance: 0,
            maxSpeed: 2.179150563690673,
            avgSpeed: 2.179150563690673,
            avgBpm: 135,
            maxBpm: 135,
            cal: 89,
            intensity: "LOW"
        }
    ];
}

export function lapsWithoutColors() {
    return [
        {
            index:1,
            tracks: [],
            color: null,
            lightColor: null,
            startTime: 1545403087000,
            totalTime: 10
        },
        {
            index:2,
            tracks: [],
            color:'#ffbb97',
            lightColor: '#00aa80',
            startTime: 1545403107000,
            totalTime: 10
        },
        {
            index:3,
            tracks: [],
            color: null,
            lightColor: null,
            startTime: 1545403127000,
            totalTime: 0
        }
    ];
}

export function getArrayColors() {
    return [['#ff320b', '#cc7e6c'],['#0214ff', '#8798ca']];
}

export function expectedLapsWithColor() {
    return [
        {
            index:1,
            tracks: [],
            color: '#ff320b',
            lightColor: '#cc7e6c',
            startTime: 1545403087000,
            totalTime: 10
        },
        {
            index:2,
            tracks: [],
            color:'#ffbb97',
            lightColor: '#00aa80',
            startTime: 1545403107000,
            totalTime: 10
        },
        {
            index:3,
            tracks: [],
            color: '#0214ff',
            lightColor: '#8798ca',
            startTime: 1545403127000,
            totalTime: 0
        }
    ];
}

export function getRouteAnalyzerWebOneLap() {
    return [
        {
            index:1,
            tracks:[
                {
                    index: 1,
                    position:{
                        lat: 42.548370361328125,
                        lng: -6.5837578773498535
                    },
                    alt: 556.4249877929688,
                    speed: 1.271920433274412,
                    date: 1545403087000,
                    dist: 0,
                    bpm: 90
                },
                {
                    index: 2,
                    position:{
                        lat: 42.54838943481445,
                        lng: -6.583323001861572
                    },
                    alt: 556.6911010742188,
                    speed: 4.727421976808574,
                    date: 1545403097000,
                    dist: 20,
                    bpm: 98
                }
            ],
            color: '#ff320b',
            lightColor: '#cccc80',
            startTime: 1545403087000,
            totalTime: 10,
            distance: null,
            maxSpeed: 4.727421976808574,
            avgSpeed: 2.9996712051,
            avgBpm: 94,
            maxBpm: 98,
            cal: 67,
            intensity: "LOW"
        }
    ];
}

export function getSpeedAvgDataOneLap() {
    return [
        [1545403087000, 2.9996712051],
        [1545403092000, 2.9996712051],
        [1545403097000, 2.9996712051]
    ];
}

export function getHeartRateAvgValuesOneLap() {
    return [
        [1545403087000, 94],
        [1545403092000, 94],
        [1545403097000, 94]
    ];
}
