import randomColor from 'randomcolor'; 

  // Unused because It delegates calculating the zoom to fitBound in RouteMapComponent (zoomToMarkers)  
  export function getCenterLaps(laps){
    let resumeCenterByLap = laps.map(lap=>{
        return getCenterOfALap(lap);
      });
    const lat = resumeCenterByLap.reduce((total, center)=>{
      return total = total + parseFloat(center.lat);
    }, 0.0)/laps.length;
    const lng = resumeCenterByLap.reduce((total, center)=>{
      return total = total + parseFloat(center.lng);
    }, 0.0)/laps.length;

    return {
      lat,
      lng
    }
  }

  export function getLapsTrackPoints(laps){
    return laps.map(lap => {
        return {
              index:lap.index,
              tracks:getLapTrackPoint(lap),
              color:randomColor(),
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


  function getCenterOfALap(lap){
    const tracksPositionNotNull = getLapTracksWithPosition(lap);
    const lat = tracksPositionNotNull
      .map(track =>{
        return parseFloat(track.position.latitudeDegrees);
      }).reduce(
        (total,lat) => {return total+lat;}, 0.0
      )/tracksPositionNotNull.length;

    const lng = tracksPositionNotNull
      .map(track=>{
        return parseFloat(track.position.longitudeDegrees);
      }).reduce(
        (total,lng)=> {return total+lng;},0.0
      )/tracksPositionNotNull.length;

    return { 
      lat,
      lng
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