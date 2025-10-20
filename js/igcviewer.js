
function getBearing(pt1, pt2) {
	// Get bearing from pt1 to pt2 in degrees
	// Formula from: http://www.movable-type.co.uk/scripts/latlong.html
	// Start by converting to radians.
	var degToRad = Math.PI / 180.0;
	var lat1 = pt1[0] * degToRad;
	var lon1 = pt1[1] * degToRad;
	var lat2 = pt2[0] * degToRad;
	var lon2 = pt2[1] * degToRad;

	var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
	var x = Math.cos(lat1) * Math.sin(lat2) -
		Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

	var bearing = Math.atan2(y, x) / degToRad;
	bearing = (bearing + 360.0) % 360.0;
	return bearing;
}

function getLine(pt1, pt2, linerad, drawOptions) {
	//returns line through pt1, at right angles to line between pt1 and pt2, length linerad.
	//Use Pythogoras- accurate enough on this scale
	var latdiff = pt2[0] - pt1[0];
	//need radians for cosine function
	var northmean = (pt1[0] + pt2[0]) * Math.PI / 360;
	var startrads = pt1[0] * Math.PI / 180;
	var longdiff = (pt1[1] - pt2[1]) * Math.cos(northmean);
	var hypotenuse = Math.sqrt(latdiff * latdiff + longdiff * longdiff);
	//assume earth is a sphere circumference 40030 Km 
	var latdelta = linerad * longdiff / hypotenuse / 111.1949269;
	var longdelta = linerad * latdiff / hypotenuse / 111.1949269 / Math.cos(startrads);
	var linestart = L.latLng(pt1[0] - latdelta, pt1[1] - longdelta);
	var lineend = L.latLng(pt1[0] + latdelta, longdelta + pt1[1]);
	var polylinePoints = [linestart, lineend];
	var polylineOptions = {
		color: 'green',
		weight: 3,
		opacity: 0.8
	};

	return L.polyline(polylinePoints, drawOptions);
}

function getTpSector(centrept, pt1, pt2, sectorRadius, sectorAngle, drawOptions) {
	var headingIn = getBearing(pt1, centrept);
	var bearingOut = getBearing(pt2, centrept);
	var bisector = headingIn + (bearingOut - headingIn) / 2;

	if (Math.abs(bearingOut - headingIn) > 180) {
		bisector = (bisector + 180) % 360;
	}

	var beginangle = bisector - sectorAngle / 2;

	if (beginangle < 0) {
		beginangle += 360;
	}

	var endangle = (bisector + sectorAngle / 2) % 360;
	var sectorOptions = jQuery.extend({}, drawOptions, { startAngle: beginangle, stopAngle: endangle });
	return L.circle(centrept, sectorRadius, sectorOptions);
}

function clearIGC() {
  resetIGC();
  $('#igctask').hide();
  $('#timePositionDisplay').text('');
  $('#fileControl').val('');
  $("#slider").css("display", "none");
  var headerTable = $('#headerInfo tbody');
  headerTable.html('');
}

function resetIGC() {
	// Clear any existing track data so that a new file can be loaded.
	if (baseLayers.track) {
		map.removeLayer(baseLayers.track);
		layersControl.removeLayer(baseLayers.track);
	}

	if (baseLayers.igctask) {
		map.removeLayer(baseLayers.igctask);
		layersControl.removeLayer(baseLayers.igctask);
	}
}

function addTrack(latLong) {
		trackLatLong = latLong;
		var trackLine = L.polyline(latLong, { color: 'red', weight: 3 });
		timePositionMarker = L.marker(latLong[0], { icon: planeIcon });
		baseLayers.track = L.layerGroup([
			trackLine,
			timePositionMarker
		]).addTo(map);
		layersControl.addOverlay(baseLayers.track, 'Flight path');

		map.fitBounds(trackLine.getBounds());
}

function addTask(coordinates, names) {
	//Clearer if we don't show track to and from start line and finish line, as we are going to show lines
	var taskLayers = [L.polyline(coordinates, { color: 'blue', weight: 3 })];
	var lineDrawOptions = {
		fillColor: 'green',
		color: 'black',
		weight: 2,
		opacity: 0.8
	};
	var sectorDrawOptions = {
		fillColor: 'green',
		fillOpacity: 0.1,
		color: 'black',
		weight: 1,
		opacity: 0.8
	};
	//definitions from BGA rules
	//defined here as any future changes will be easier
	var startLineRadius = 5;
	var finishLineRadius = 1;
	var tpCircleRadius = 500;
	var tpSectorRadius = 20000;
	var tpSectorAngle = 90;
	var j;
	for (j = 0; j < coordinates.length; j++) {
		taskLayers.push(L.marker(coordinates[j]).bindPopup(names[j]));
		switch (j) {
			case 0:
				var startline = getLine(coordinates[0], coordinates[1], startLineRadius, lineDrawOptions);
				taskLayers.push(startline);
				break;
			case (coordinates.length - 1):
				var finishline = getLine(coordinates[j], coordinates[j - 1], finishLineRadius, lineDrawOptions);
				taskLayers.push(finishline);
				break;
			default:
				taskLayers.push(L.circle(coordinates[j], tpCircleRadius, sectorDrawOptions));
				var tpsector = getTpSector(coordinates[j], coordinates[j - 1], coordinates[j + 1], tpSectorRadius, tpSectorAngle, sectorDrawOptions);
				taskLayers.push(tpsector);
		}
	}
	baseLayers.igctask = L.layerGroup(taskLayers).addTo(map);
	layersControl.addOverlay(baseLayers.igctask, 'IGC Task');
}

function setTimeMarker(timeIndex) {
	var markerLatLng = trackLatLong[timeIndex];
	if (markerLatLng) {
		timePositionMarker.setLatLng(markerLatLng);

		if (!map.getBounds().contains(markerLatLng)) {
			map.panTo(markerLatLng);
		}
	}
}

(function ($) {
   'use strict';

    var igcFile = null;
    var altitudeConversionFactor = 1.0; // Conversion from metres to required units
    
    function positionDisplay(position)  {
        function toDegMins(degreevalue) {
            var wholedegrees= Math.floor(degreevalue);
            var minutevalue = (60*(degreevalue-wholedegrees)).toFixed(3);
            return wholedegrees + '\u00B0\u00A0'  + minutevalue  + '\u00B4';
        }
    
        var positionLatitude= toDegMins(Math.abs(position[0]));
        var positionLongitude=toDegMins(Math.abs(position[1]));
        if(position[0]  >  0)  {
            positionLatitude += "N";
        }
        else  {
            positionLatitude += "S";
        }
        if(position[1]  >  0)  {
            positionLongitude += "E";
        }
        else  {
            positionLongitude += "W";
        }
        return positionLatitude + ",   " + positionLongitude;
    }
    
    function pad(n) {
        return (n < 10) ? ("0" + n.toString()) : n.toString();
    }
        
    function updateTimeline (timeIndex) {
        var currentPosition = igcFile.latLong[timeIndex];
        var positionText=positionDisplay(currentPosition);
        var unitName = $('#altitudeUnits').val();
        $('#timePositionDisplay').text(
            moment(igcFile.recordTime[timeIndex]).format('HH:mm:ss') + ': ' +
            (igcFile.pressureAltitude[timeIndex] * altitudeConversionFactor).toFixed(0) + ' ' +
            unitName + ' (baro) / ' +
            (igcFile.gpsAltitude[timeIndex] * altitudeConversionFactor).toFixed(0) + ' ' +
            unitName + ' (GPS); ' +
            positionText
        );
        
        setTimeMarker(timeIndex);
    }
    
    function displayIgc() {
        // Display the headers.
        var displayDate = moment(igcFile.recordTime[0]).format('LL');
        var headerTable = $('#headerInfo tbody');
        headerTable.html('')
                   .append(
                       $('<tr></tr>').append($('<th></th>').text('Date'))
                              .append($('<td></td>').text(displayDate))
                   );
        var headerName;
        var headerIndex;
        for (headerIndex = 0; headerIndex < igcFile.headers.length; headerIndex++) {
            headerTable.append(
                $('<tr></tr>').append($('<th></th>').text(igcFile.headers[headerIndex].name))
                              .append($('<td></td>').text(igcFile.headers[headerIndex].value))
            );
        }

        // Show the IGC task declaration if it is present.        
        if (igcFile.task.coordinates.length > 0) {
            //eliminate anything with empty start line coordinates
            if(igcFile.task.coordinates[0][0] !==0) {
                    $('#igctask').show();
                    var taskList = $('#igctask ul').first().html('');
                    var j;
                    //Now add TP numbers.  Change to unordered list
                    if(igcFile.task.takeoff.length > 0) {
                               taskList.append($('<li> </li>').text("Takeoff: " + igcFile.task.takeoff));
                    }
                    for (j =0; j <igcFile.task.names.length; j++) {
                            switch(j)  {
                            case 0:
                                    taskList.append($('<li> </li>').text("Start: " + igcFile.task.names[j]));
                                    break;
                            case ( igcFile.task.names.length-1):
                                    taskList.append($('<li> </li>').text("Finish: " + igcFile.task.names[j]));
                                    break;
                            default:
                                    taskList.append($('<li></li>').text("TP" + (j).toString() + ": " + igcFile.task.names[j]));
                        }
                    }
                 if(igcFile.task.landing.length > 0) {
                        taskList.append($('<li> </li>').text("Landing: : " + igcFile.task.landing)); 
                 }
                 addTask(igcFile.task.coordinates, igcFile.task.names);
                }
        }
        else {
            $('#igctask').hide();
        }

        // Reveal the map and graph. We have to do this before
        // setting the zoom level of the map or plotting the graph.
        $('#igcFileDisplay').show();
        
        addTrack(igcFile.latLong);
        
		// show time slider
		$("#slider").css("display", "block");
        $('#timeSlider').prop('max', igcFile.recordTime.length - 1);
        updateTimeline(0);
    }

    function storePreference(name, value) {
        if (window.localStorage) {
            try {
                localStorage.setItem(name, value);
            }
            catch (e) {
                // If permission is denied, ignore the error.
            }
        }
    }

    $(document).ready(function () {

        var timeZoneSelect = $('#timeZoneSelect');
        $.each(moment.tz.names(), function(index, name) {
            timeZoneSelect.append(
                 $('<option></option>', { value: name }).text(name));
        });
                
        timeZoneSelect.change(function () {
            var selectedZone = $(this).val();
            moment.tz.setDefault(selectedZone);
            if (igcFile !== null) {
                updateTimeline($('#timeSlider').val(), mapCont);
                $('#headerInfo td').first().text(moment(igcFile.recordTime[0]).format('LL'));
            }

            storePreference('timeZone', selectedZone);
        });
        
        $('#fileControl').change(function () {
            if (this.files.length > 0) {
                var reader = new FileReader();
                reader.onload = function(e)  {
                  try {
                      $('#errorMessage').text('');
                      resetIGC();
                      $('#timeSlider').val(0);

                      igcFile = parseIGC(this.result);
                      displayIgc();
                  } catch (ex) {
                      if (ex instanceof IGCException) {
                          $('#errorMessage').text(ex.message);
                      }
                      else {
                          throw ex;
                      }
                  }
                };
                reader.readAsText(this.files[0]);
            }
        });

        $('#altitudeUnits').change(function (e, raisedProgrammatically) {
            var altitudeUnit = $(this).val();
            if (altitudeUnit === 'feet') {
                altitudeConversionFactor = 3.2808399;
            }
            else {
                altitudeConversionFactor = 1.0;
            }
        
            if (igcFile !== null) {
                updateTimeline($('#timeSlider').val());
            }

            if (!raisedProgrammatically) {
                storePreference("altitudeUnit", altitudeUnit);
            }
        });
  
        // We need to handle the 'change' event for IE, but
        // 'input' for Chrome and Firefox in order to update smoothly
        // as the range input is dragged.
        $('#timeSlider').on('input', function() {
          var t = parseInt($(this).val(), 10);
          updateTimeline(t);
        });
        $('#timeSlider').on('change', function() {
           var t = parseInt($(this).val(), 10);
           updateTimeline(t);
        });
        
        $('#timeBack').click(function() {
           var slider = $('#timeSlider');
           var curTime = parseInt(slider.val(), 10);
           curTime--;
           if(curTime < 0) {
                 curTime = 0;
           }
           slider.val(curTime);
           updateTimeline(curTime);
        });
        
         $('#timeForward').click(function() {
           var slider = $('#timeSlider');
           var curTime = parseInt(slider.val(), 10);
           var maxval= slider.prop('max');
           curTime++;
           if(curTime >  maxval) {
                 curTime = maxval;
           }
           slider.val(curTime);
           updateTimeline(curTime);
        });
        
        // Load preferences from local storage, if available.

         var altitudeUnit = '';
         var timeZone = '';

         if (window.localStorage) {
             try {
                 altitudeUnit = localStorage.getItem('altitudeUnit');
                 if (altitudeUnit) {
                     $('#altitudeUnits').val(altitudeUnit).trigger('change', true);
                 }

                 timeZone = localStorage.getItem('timeZone');
             }
             catch (e) {
                 // If permission is denied, ignore the error.
             }
         }

         if (!timeZone) {
             timeZone = 'UTC';
         }

         timeZoneSelect.val(timeZone);
         moment.tz.setDefault(timeZone);
    });
}(jQuery));
