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
        return getLapTrackPoint(lap);
    });
  }

  export function getZoomOfALap(lap){
    let tracksPositionNotNull = getLapTracksWithPosition(lap);
    const min = tracksPositionNotNull.reduce((min, track) => {
      if(min.lat > track.position.latitudeDegrees
          && min.lng > track.position.longitudeDegrees)
        return {
          lat: track.position.latitudeDegrees,
          lng: track.position.longitudeDegrees
        }
    },0.0);
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
    return getLapTracksWithPosition(lap).map(track => {
        var lat = parseFloat(track.position.latitudeDegrees);
        var lng = parseFloat(track.position.longitudeDegrees);
        return {
          lat,
          lng
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