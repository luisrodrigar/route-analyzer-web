import {getColorRandom} from './materialColors';

export function getLapsTrackPoints(laps){
  let newLaps = laps.map(lap => {

      return {
            index:lap.index,
            tracks:getLapTrackPoint(lap),
            color:lap.color?lap.color:null,
            lightColor: lap.lightColor?lap.lightColor:null,
            startTime: lap.startTime,
            totalTime: lap.totalTimeSeconds,
            distance: lap.distanceMeters,
            maxSpeed: lap.maximunSpeed,
            avgSpeed: lap.averageSpeed,
            avgBpm: lap.averageHearRate,
            maxBpm: lap.maximunHeartRate,
            cal: lap.calories,
            intensity: lap.intensity
      }
  });
  let currentColors = newLaps.map(lap=>{
    if(lap.color&&lap.lightColor) 
      return [lap.color,lap.lightColor]
    else
      return null;
  }).filter(item=>item);
  let numLapsWithoutColor = newLaps.filter(lap=>!lap.color&&!lap.lightColor).length;
  const colors = getColorRandom(numLapsWithoutColor, currentColors);
  let index = 0;
  newLaps.forEach(lap=>{
    if(!lap.color && !lap.lightColor){
      lap.color = colors[index][0];
      lap.lightColor = colors[index++][1];
    }
  });
  return newLaps;
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
      tracks:lap.tracks.map(track=>[track.date, track.bpm])
    }
  });
}

export function getLapsElevations(laps){
  return laps.map(lap=> {
    return {
        index: lap.index,
        color: lap.color,
        label: "Lap " + lap.index,
      tracks:lap.tracks.map(track=>[track.date, track.alt])
    }
  });
}

export function getAvgBpm(laps){
  let avgBpm = [];
  laps.forEach( lap =>
    avgBpm.push([((lap.tracks[0].date+lap.tracks[lap.tracks.length-1].date)/2),lap.avgBpm])
  );

  if(laps.length===1){
    let avgDate = avgBpm[0][0];
    let initDate = laps[0].tracks[0].date;
    let endDate = laps[0].tracks[(laps[0].tracks.length)-1].date;
    avgBpm = [];
    avgBpm.push([initDate, laps[0].avgBpm]);
    avgBpm.push([avgDate, laps[0].avgBpm]);
    avgBpm.push([endDate, laps[0].avgBpm]);
  }
  return avgBpm;
}

export function getAvgSpeed(laps){
  let avgSpeed = [];
  laps.forEach( lap =>
    avgSpeed.push([((lap.tracks[0].date+lap.tracks[lap.tracks.length-1].date)/2),lap.avgSpeed])
  );

  if(laps.length===1){
    let avgDate = avgSpeed[0][0];
    let initDate = laps[0].tracks[0].date;
    let endDate = laps[0].tracks[(laps[0].tracks.length)-1].date;
    avgSpeed = [];
    avgSpeed.push([initDate, laps[0].avgSpeed]);
    avgSpeed.push([avgDate, laps[0].avgSpeed]);
    avgSpeed.push([endDate, laps[0].avgSpeed]);
  }
  return avgSpeed;
}

export function getHeartRateData(laps){
  let bpms = [];
  laps.forEach( lap =>
    lap.tracks.forEach(track => 
      bpms.push([track.date,track.bpm])
      )
    )
  return bpms;
}

export function getElevationData(laps){
  let elevations = [];
  laps.forEach( lap =>
    lap.tracks.forEach(track => 
      elevations.push([track.date,track.alt])
      )
    )
  return elevations;
}

export function getSpeedData(laps){
  let speed = [];
  laps.forEach( lap =>
    lap.tracks.forEach(track => 
      speed.push([track.date,track.speed])
      )
    )
  return speed;
}

function getLapTracksWithPosition(lap){
  return lap.tracks
    .filter(track => {
      if(track && track.position)
        return track;
      else return null;
    });
}

function getLapTrackPoint(lap){
  return getLapTracksWithPosition(lap).map(trackPoint => {
      var lat = parseFloat(trackPoint.position.latitudeDegrees);
      var lng = parseFloat(trackPoint.position.longitudeDegrees);
      var alt = parseFloat(trackPoint.altitudeMeters);
      var speed = parseFloat(trackPoint.speed);
      var date = parseInt(trackPoint.date,10);
      var dist = parseFloat(trackPoint.distanceMeters);
      var bpm = parseInt(trackPoint.heartRateBpm,10);
      var index = parseInt(trackPoint.index,10);
      return {
        index,
        date,
        position:{
          lat,
          lng
        },
        alt,
        speed,
        dist,
        bpm
      };
  });
}

export function getDistanceBetweenPoints(point1, point2){
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