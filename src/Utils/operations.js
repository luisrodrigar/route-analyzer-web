import {getColorRandom} from './colors';
import * as date        from 'datejs';

export function getLapsTrackPoints(laps){
  return laps.map(lap => {
      return {
            index:lap.index,
            tracks:getLapTrackPoint(lap),
            color:lap.color,
            lightColor: lap.lightColor,
            startTime: lap.startTime ?  parseDate(lap.startTime).getTime() : null,
            totalTime: lap.totalTimeSeconds,
            distance: lap.distanceMeters,
            maxSpeed: lap.maximumSpeed,
            avgSpeed: lap.averageSpeed,
            avgBpm: lap.averageHearRate,
            maxBpm: lap.maximumHeartRate,
            cal: lap.calories,
            intensity: lap.intensity
      }
  });
}

function getLapTrackPoint(lap){
  return getLapTracksWithPosition(lap).map(trackPoint => {
      const lat = parseFloat(trackPoint.position.latitudeDegrees);
      const lng = parseFloat(trackPoint.position.longitudeDegrees);
      const position = {lat, lng};
      const alt = parseFloat(trackPoint.altitudeMeters);
      const speed = parseFloat(trackPoint.speed);
      const date = trackPoint.date ? parseDate(trackPoint.date).getTime() : null;
      const dist = parseFloat(trackPoint.distanceMeters);
      const bpm = parseInt(trackPoint.heartRateBpm,10);
      const index = parseInt(trackPoint.index,10);
      return {
        index,
        date,
        position,
        alt,
        speed,
        dist,
        bpm
      };
  });
}

function parseDate(dateString){
  return Date.parse(dateString);
}

export function setLapColors(laps){
  let currentColors = laps
      .filter(lap => lap.color && lap.lightColor)
      .map(lap => [lap.color,lap.lightColor]);
  let numLapsWithoutColor = laps
      .filter(lap=> !lap.color && !lap.lightColor)
      .length;
  const colors = getColorRandom(numLapsWithoutColor, currentColors);
  laps.filter(lap => !lap.color && !lap.lightColor)
      .forEach((lap, index) => {
        lap.color = colors[index][0];
        lap.lightColor = colors[index][1];
      });
}

export function getLapsSpeed(laps){
  return laps.map(lap=> {
    return {
      index: lap.index,
      color: lap.lightColor,
      label: "Lap " + lap.index,
      stroke: 2,
      tracks:lap.tracks.map(track=>[track.date, track.speed])
    }
  });
}

export function getLapsHeartRate(laps){
  return laps.map(lap=> {
    return {
      index: lap.index,
      color: lap.lightColor,
      label: "Lap " + lap.index,
      tracks: lap.tracks.map(track => [track.date, track.bpm])
    }
  });
}

export function getLapsElevations(laps){
  return laps.map(lap=> {
    return {
      index: lap.index,
      color: lap.color,
      label: "Lap " + lap.index,
      tracks: lap.tracks.map(track => [track.date, track.alt])
    }
  });
}

export function calculateAvgValues(laps, avgMethod) {
    return laps
        .map(lap => [getAvgDate(lap.tracks), avgMethod(lap)]);
}

function getAvgDate(tracks) {
    return (tracks[0].date + tracks[tracks.length-1].date) / 2;
}

function calculateAvgSingleLap(laps, avgArray, avgMethod) {
    let avgDate = avgArray[0][0];
    let initDate = laps[0].tracks[0].date;
    let endDate = laps[0].tracks[(laps[0].tracks.length)-1].date;
    avgArray = [];
    avgArray.push([initDate, avgMethod(laps[0])]);
    avgArray.push([avgDate, avgMethod(laps[0])]);
    avgArray.push([endDate, avgMethod(laps[0])]);
    return avgArray;
}

export function getAvgBpm(laps){
    let avgBpmMethod = function(lap) {
        return lap.avgBpm;
    };
    let avgBpm = calculateAvgValues(laps, avgBpmMethod);
    return laps.length > 1 ? avgBpm : calculateAvgSingleLap(laps, avgBpm, avgBpmMethod);
}

export function getAvgSpeed(laps){
    let avgSpeedMethod = function(lap) {
        return lap.avgSpeed;
    };
    let avgSpeed = calculateAvgValues(laps, avgSpeedMethod);
    return laps.length > 1 ? avgSpeed : calculateAvgSingleLap(laps, avgSpeed, avgSpeedMethod);
}

export function getHeartRateData(laps) {
  return laps.flatMap(lap =>
      lap.tracks.map(track => [track.date,track.bpm]));
}

export function getElevationData(laps) {
  return laps.flatMap(lap =>
    lap.tracks.map(track => [track.date,track.alt]));
}

export function getSpeedData(laps){
  return laps.flatMap(lap =>
      lap.tracks.map(track => [track.date,track.speed]));
}

function getLapTracksWithPosition(lap){
  return lap.tracks
    .filter(track => {
      if(track && track.position)
        return track;
      else return null;
    });
}

export function getNearestPosition(laps,position){
  let indexLap =null, indexTrackpoint = null, minDistance = Number.POSITIVE_INFINITY;
  laps.forEach((lap, eachIndexLap)=>{
    lap.tracks.forEach((track,eachIndexTrackpoint)=>{
      let eachPosition = {
        lat: track.position.lat,
        lng: track.position.lng,
      };
      let currentMin = getDistanceBetweenPoints(eachPosition,position);
      if(currentMin<minDistance){
        indexTrackpoint = eachIndexTrackpoint;
        indexLap = eachIndexLap;
        minDistance = currentMin;
      }
    })
  })
  return {
    indexLap,
    indexTrackpoint
  }
}

function getDistanceBetweenPoints(point1, point2){
  // Convert degrees to radians
  let latP1 = degrees2Radians(point1.lat), lngP1 = degrees2Radians(point1.lng);
  let latP2 = degrees2Radians(point2.lat), lngP2 = degrees2Radians(point2.lng);

  // Radius of earth in meters
  let earthRadiusMeters = 6378100;

  // Point P 
  let rho1 = earthRadiusMeters * Math.cos(latP1);
  let z1 = earthRadiusMeters * Math.sin(latP1);
  let x1 = rho1 * Math.cos(lngP1);
  let y1 = rho1 * Math.sin(lngP1);

  // Point Q
  let rho2 = earthRadiusMeters * Math.cos(latP2);
  let z2 = earthRadiusMeters * Math.sin(latP2);
  let x2 = rho2 * Math.cos(lngP2);
  let y2 = rho2 * Math.sin(lngP2);

  // Dot product
  let dot = (x1 * x2 + y1 * y2 + z1 * z2);
  let cosTheta = dot / (Math.pow(earthRadiusMeters, 2));

  let theta = Math.acos(cosTheta);

  return earthRadiusMeters * theta;

}

function degrees2Radians(degree){
  return degree * Math.PI / 180.0;
}
