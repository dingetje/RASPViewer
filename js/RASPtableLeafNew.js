/**********************
 *  RASPtableLeaf.js  *
 **********************/

/* 7 Mar 2018
 *
 * Update for GM3.32++ & "new renderer"
 *
 * 01-May-2019
 *
 * Based on UK RASP site, heavily modified for Dutch RASP NL site:
 * - use OpenStreetMap tiles
 * - removed archive mode (diskspace on vps is expensive!)
 * - added ajax loader overlay
 * - added animation mode
 * - added spin box for animation delay
 * - moved description to tooltip
 * - added next/prev day buttons
 * - added full screen toggle
 *
 * 05-May-2019
 * - ported from Google Maps API to Leaflet MAP API
 *
 * 08-May-2019
 * - use stamen tile server (http://maps.stamen.com/)
 *
 * 09-May-2019
 * - added self hosted Open Street Map tiles
 *
 * 15-May-2019
 * - added ko-fi.com donation button
 *
 * 16-May-2019
 * - changed default zoom level to 7
 *
 * 30-May-2019
 * - added side-bar v2
 */

/* 
 * Global Variables
 */

var oldDayIndex;
var Loaded        = [];
var SoundingPics  = [];
var Overlays      = [];
var theTitles     = [];
var theScales     = [];
var theSideScales = [];
var timerId = null;
var spinboxDelay;
var ajaxLoaderOverlay;
var ffversion;
var tileLayer;
var higherOpacity;
var lowerOpacity;
var blipSpotPopup = false;
var tonerLayer;
var terrainLayer;
var paramDescriptionWindow;
var fullSet;

var oldParam;
var times;

var map;
var overlay = null; /* RASP overlay */
var SoundingMarkerArray = [];
var SoundingGroup;
var infoArray = [];
var taskMarkerArray = [];
var TPmarkerArray = []; // all Turnpoint markers
var airspaceArray = [];
var ASstring;
var Event;

var origTblHt;
var imgHt;
var imgWid;
var topHeight;

var map;
var resolution = 4; // 4km
var opacity = 50;   // default opacity
var centre;
var zoom = 7;       // default zoom
var ctrFlag = false;
var waslong = "N";  // longclick
var wasSounding = false ;

 /***********************
 * initIt()             *
 *                      *
 * Initialise Variables *
 * Build Menus, etc     *
 ***********************/
function initIt()
{
  document.body.style.overflow = "hidden"; // Disable Scrolling
  window.onresize = function(){setSize(); doChange(); }

  oldDayIndex = document.getElementById("Day").options.selectedIndex;
  oldParam = document.getElementById("Param").options.value;

  /* There is a bug in FF 1.5 & 2 with DOMMouseScroll - look for ffversion below */
  if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
    ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
  }

  /**********************/
  /* Build the Day Menu */
  /**********************/

  var Now = new Date().getTime(); // Time now - in milliSec(!)
//  var Now = new Date(2019,3,16).getTime();  // Time now - in milliSec(!)
  var mS_Day = 24 * 60 * 60 * 1000; // mS in a day
  var T = new Date();     // Instantiate a Date object
  var dayName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var day = document.getElementById("Day"); // save typing

  T.setTime(Now);         // Today
  day.options[0] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()] + " - Today", mkdat(T));
  T.setTime(Now + mS_Day);  // Tomorrow
  day.options[1] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
  T.setTime(Now + 2 * mS_Day);
  day.options[2] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
  T.setTime(Now + 3 * mS_Day);
  day.options[3] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
  T.setTime(Now + 4 * mS_Day);
  day.options[4] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
/*
  T.setTime(Now + 5 * mS_Day);
  day.options[5] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
  T.setTime(Now + 6 * mS_Day);
  day.options[6] = new Option(dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()], mkdat(T));
*/

  /***********************/
  /* Set Default Options */
  /***********************/

  // Set Short Param List
  fullSet = false;
  for(var i = 0; i < paramListLite.length; i++) {
    document.getElementById("Param").options[i] = new Option(paramListLite[i][2], paramListLite[i][1]);
    document.getElementById("Param").options[i].className = paramListLite[i][0];
  }

  // Install Handlers
  document.getElementById("Param").onchange        = doChange;
  document.getElementById("Day").onchange          = doChange;
  document.getElementById("Time").onchange         = doChange;
  document.getElementById("paramSet").onmousedown  = switchParamList;

  /* Install Time options and adjust Table times for DST
     Assume that Standard Time is in force on Jan 1 2012
     And Daylight Saving Time in the summer
     May be incorrect in southern hemisphere
     See also setTimes()
   */
  dateNow = new Date();
  dateJan = new Date(2012, 0, 1)
  if(dateNow.getTimezoneOffset() == dateJan.getTimezoneOffset())
    times = tzArray["STD"];
  else
    times = tzArray["DST"];

  for(var i = 0; i < times.length; i++) {
    document.getElementById("Time").options[i] = new Option(times[i], times[i]);
    if(times[i] == "1200")
      document.getElementById("Time").options[i].selected = true;
  }

  document.getElementById("Day").options[0].selected    = true;       // Today
  document.getElementById("Param").options[1].selected  = true;       // wstar
  document.getElementById("popup").info[0].checked      = true;       // "Value" in infoWindow (not "Day" or "SkewT")
  // use jQuery to set tooltip text
//  $("#paramTooltip").attr('data-tooltip', paramListLite[document.getElementById("Param").selectedIndex][3]);

  for(i = 0; i < document.getElementById("Time").options.length; i++){
    theScales[i]     = new Image();
    theSideScales[i] = new Image();
    theTitles[i]     = new Image();
    Overlays[i]      = null;
    Loaded[i]        = false;
  }

  resolution = getResolution();
  centre = corners.Centre[resolution];

  // Save the original Selector Table Height
  origTblHt = document.getElementById("selectors").offsetHeight;

  // default self hosted map tiles
  var maptype="mapbox.streets";

  /*****************************************
   * Process URL tail and set menu values  *
   *****************************************/
  if( location.href.split("?")[1]){ // Any args?
    args=location.href.split("?")[1].split("&");

    for(i = 0; i < args.length; i++){
      prams = args[i].split("=");
      if(prams[0] == "param"){
        for(j = 0; j < document.getElementById("Param").options.length; j++){
          if(document.getElementById("Param").options[j].value == prams[1]){
            document.getElementById("Param").options[j].selected = true;
            break;
          }
        }
        if(j == document.getElementById("Param").options.length){
          switchParamList();
          for(j = 0; j < document.getElementById("Param").options.length; j++){
            if(document.getElementById("Param").options[j].value == prams[1]){
              document.getElementById("Param").options[j].selected = true;
              break;
            }
          }
          if(j == document.getElementById("Param").options.length){
            switchParamList();  // Put back if not found
          }
        }
      }
      if(prams[0] == "time"){
        for(j = 0; j < document.getElementById("Time").options.length; j++){
          if(document.getElementById("Time").options[j].value == prams[1])
            document.getElementById("Time").options[j].selected = true;
        }
      }
      
      if(prams[0] == "date"){
        var dateNow = new Date();
        dateNow.setHours(0, 0, 0, 0);
        // Build requested date
        var newDate = new Date(prams[1].substr(0,4), prams[1].substr(4,2) - 1, prams[1].substr(6,2), 0, 0, 0, 0);
        if(newDate >= dateNow){
          // Set forecast date Menu Option
          for(j = 1; j < SAVE_DAYS; j++){
            dateNow.setDate(dateNow.getDate() + 1);
            // alert("dateNow = " + dateNow + "\nnewDate = " + newDate);
            if(newDate.getFullYear() == dateNow.getFullYear()
              && newDate.getMonth() == dateNow.getMonth()
              && newDate.getDate() == dateNow.getDate()){
                day.options[j].selected = true;
                break;
            }
          }
          dateNow.setDate(dateNow.getDate());
          if(newDate > dateNow) {
            alert("No forecast for " + newDate.toDateString() + " - Too far ahead!");
          }
        }
      }
      if(prams[0] == "opacity"){
        opacity = parseInt(prams[1]);
      }
      if(prams[0] == "maptype"){
        maptype = prams[1];
      }
      if(prams[0] == "zoom"){
        zoom = parseInt(prams[1]);
      }
      if(prams[0] == "centre"){
        latlon = prams[1].split(',');
        lat = latlon[0];
        lon = latlon[1];
        if (lat && lon) {
          centre = new L.latLng(lat, lon);
        }
      }
    }
  }

  // create the OSM tile layers 
  var tonerLayer = new L.StamenTileLayer("toner", { id: 'mapbox.toner' });
  var terrainLayer = new L.StamenTileLayer("terrain", { id: 'mapbox.terrain' });
  var ownLayer = L.tileLayer('https://blipmaps.nl/OSM/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://openstreetmap.org" target="_blank">&copy; OpenStreetMap contributors</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    maxZoom: 10,
    minZoom: 6,
    id: 'mapbox.streets'});

  // for Stamen class, for some reason minZoom, maxZoom options were not set when passed through via options
  // so explicit set them via their options
  tonerLayer.options.maxZoom = 12;
  tonerLayer.options.minZoom = 6;
  terrainLayer.options.maxZoom = 12;
  terrainLayer.options.minZoom = 6;

  if (maptype === "mapbox.toner") {
    tileLayer = tonerLayer;
  }
  if (maptype === "mapbox.terrain") {
    tileLayer = terrainLayer;
  }
  if (maptype === "mapbox.streets") {
    tileLayer = ownLayer;
  }
    
  // create the map object
  //                                       0          1           2
  map = new L.map('map',{layers:[ownLayer, tonerLayer, terrainLayer]});
  // do not allow to move out of these boundaries
  map.setMaxBounds(corners.Bounds[resolution]);

  // add a scale control to the map
  L.control.scale().addTo(map);
  
  // Ko-fi button
  L.easyButton('<img src="img/Ko-fi_Icon_Blue.png" width="26" height="26" alt="Support us!" title="Buy a Coffee for RASP blipmaps.nl" class="kofibuttononmap">',
    function(btn, map){ 
      window.open("https://ko-fi.com/blipmapsnl","_blank");
    }).addTo(map);

  // animate button
  L.easyButton('<i id="animateButtonOnMap" class="fas fa-play-circle fa-lg" title="Animate"></i>',
    function(btn, map){ 
      animateTimer();
    }).addTo(map);

  // fullscreen button
  L.easyButton('<i id="fullScreenButtonOnMap" class="fas fa-toggle-off fa-lg" title="Toggle Full Screen"></i>',
    function(btn, map){ 
      toggleFullScreen();
    }).addTo(map);

  // sounding markers
  addSndMarkers();

  // add the layer control
  var baseLayers = {
    "OSM": ownLayer,
    "Toner": tonerLayer,
    "Terrain": terrainLayer,
  };
  // Soundings
  var soundingLayer = {
	  "Soundings": SoundingGroup,
  };
  L.control.layers(baseLayers, soundingLayer).addTo(map);
  // enable Soundings visible by default
  var layerControlSounding = document.getElementsByClassName('leaflet-control-layers-overlays')[0];
  if (layerControlSounding) {
     layerControlSounding.getElementsByTagName('input')[0].click();
  }

  // add the tiles layer to the map
  tileLayer.addTo(map);
    
  // fit map and set center and zoom level
  map.fitBounds(corners.Bounds[resolution]);
  map.setView(centre, zoom);

  // select the active layer in layercontrol
  var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
  if (layerControlElement) {
    switch(tileLayer.options.id) {
      case "mapbox.streets":
         layerControlElement.getElementsByTagName('input')[0].click();
         break;
      case "mapbox.toner":
         layerControlElement.getElementsByTagName('input')[1].click();
         break;
      case "mapbox.terrain":
         layerControlElement.getElementsByTagName('input')[2].click();
         break;
    }   
  }
  // add opacity controls in upper right corner
  createOpacityControl(map);

  // add sidebar
  var sidebar = L.control.sidebar('sidebar').addTo(map);
  
  setSize();

  map.on('click', function(event) { L_click(event);}); 
  map.on('contextmenu', function(event) { R_click(event);}); 
  map.on('zoomend', function(event) { constrainMap(event);});
  map.on('moveend', function(event) { constrainMap(event);});
  
  new LongClick(map, 3000); // instatiate longclick
  ajaxLoaderOverlay = new RASPoverlay(corners.Bounds[resolution],
                                        "img/ajax-loader.gif",
                                        map,
                                        'visible');
  ajaxLoaderOverlay.onAdd();

  // spinbox for animation timer
  spinboxDelay = new SpinBox('animateDelay',{'minimum' : 250, 'maximum' : 5000, 'step' : 100});
  spinboxDelay.setValue(1000);
  
  url = location.href;
  head = url.slice(0, url.lastIndexOf('/'))
  var airspacetype = document.getElementById("airspace");
  for(i = 0; i < airspacetype.length; i++){
	airspacetype[i].checked = false;  // Clear Airspace checkboxes
	airspaceArray.push(null);
	if (isIE()) {
		// horrible performance in IE for the KML overlay loading
		var airspaceForm = document.getElementById("airspaceForm");
		airspace.style.display = 'none';
	}
  }

  // add handler for Full Screen change detected
  if (screenfull.enabled) {
   var fullScreenButtonOnMap = document.getElementById('fullScreenButtonOnMap');
   screenfull.on('change', function() {
	   // console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
	   // $('#fullscreentoggle').prop('checked', screenfull.isFullscreen);
     if(fullScreenButtonOnMap) {
       if (screenfull.isFullscreen) {
	       fullScreenButtonOnMap.setAttribute("class", "fas fa-toggle-on fa-lg");
       }
       else {
	       fullScreenButtonOnMap.setAttribute("class", "fas fa-toggle-off fa-lg");       
       }
     }
   });
   screenfull.on('error', function(event) {
	 console.error('Failed to enable fullscreen', event);
     if(fullScreenButtonOnMap) {
       fullScreenButtonOnMap.setAttribute("class", "fas fa-toggle-off fa-lg");
	 }
	 // $('#fullscreentoggle').prop('checked', false);
    });
  }
  
  // screen orientatien matches
/*  var mql = window.matchMedia("(orientation: portrait)");

  // If there are matches, we're in portrait
  if(mql.matches) {  
    alert("This site looks better in landscape mode");
  }
  // Add a media query change listener
  mql.addListener(function(m) {
    if(m.matches) {
      alert("This site looks better in landscape mode");
    }
  });
 */
 
  // Wait till tiles loaded, then doChange()
  tileLayer.on("load", function() { doChange(null); } );  
}

/****************************************
 *      END OF INITIALISATION STUFF     *
 *      Start of functions              *
 ****************************************/

// Return "yyyymmdd" from T as string
function mkdat(T)
{
  var dom, mon, year;

  dom = T.getDate();
  if(dom < 10){dom = "0" + dom;}
  mon = T.getMonth() + 1;
  if(mon < 10){mon = "0" + mon;}
  year = T.getFullYear()
  return( "" + year + mon + dom);
}


/* Called when idle - end of drag or zoom change
 * Centre map if outside ViewPort
 */
function constrainMap(E)
{
  var VPbounds, URL;

  while(!(VPbounds = map.getBounds()))
    ; // Hmmm! Busy wait?
  
  // Check that overlay corners are within ViewPort
  if( !VPbounds.intersects(corners.Bounds[resolution])){
    if(confirm("Map Outside ViewPort\nReCentre?")){
      map.setView(corners.Centre[resolution]);
    }
  }
  centre = map.getCenter();
  zoom = map.getZoom();
  doUrl();
}

/**************** SOUNDINGS Markers *************************************************/

function addSndMarkers()
{
  // Install the Sounding markers - but only if needed
  if(SoundingMarkerArray && SoundingMarkerArray[1]){  // No Sounding0?
    return;
  }
  var siz    = 20;
  var anchor = siz / 2;
  var sndIcon = new L.icon( {
                     iconUrl: 'img/sndmkr.png',   // url
                     iconSize: [siz,siz],         // size (duh!)
                     iconAnchor: [anchor,anchor]  // anchor
  });

  for(i = 1; i < soundings.LOC.length; i++ ){ // No Sounding0 !!
    if (soundings.NAM[i] != undefined) {
      var marker = L.marker(soundings.LOC[i], {icon: sndIcon, myId: i});
      marker.bindTooltip(soundings.NAM[i], { permanent: false, direction: 'bottom'} );
      // and the popup function
      marker.on('click', function(e) {
       // Use the lat, lon to find the marker      
      var id = this.options.myId;
      var sndURL = '<img src="' + Server + getBasedir() + '/';
      sndURL += '/sounding' + id + '.curr.'
           + document.getElementById("Time").value 
           + 'lst.d2.png" height=640 width=640>' ;

      ctrFlag = true;
      var popupSounding = L.popup({maxWidth:imgWid/2})
        .setLatLng(soundings.LOC[id])
        .setContent(sndURL)
        .openOn(map);

      infoArray.push(popupSounding);        
    });
    SoundingMarkerArray.push(marker);
   }
  }
  SoundingGroup = L.layerGroup(SoundingMarkerArray);
}
/**************** End SOUNDINGS Markers *************************************************/


/******************* Start TRACK AVERAGE Stuff ***************************/

var task = [];
var TParray = [];
var taskList = [];

var siz    = 24;
var anchor = siz / 2;
var tpRd = new L.icon( { iconUrl: "img/iconRed.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpGn = new L.icon( { iconUrl: "img/iconGreen.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpBl = new L.icon( { iconUrl: "img/iconBlue.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpCy = new L.icon( { iconUrl: "img/iconCyan.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpMg = new L.icon( { iconUrl: "img/iconMagenta.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpYl = new L.icon( { iconUrl: "img/iconYellow.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });
var tpWt = new L.icon( { iconUrl: "img/iconWhite.png", iconSize: [siz,siz], iconAnchor: [anchor,anchor] });

/* Remove all Turnpoint Markers */
function rmTPMarkers()
{
  clearTask();
  for (m in TPmarkerArray){
    TPmarkerArray[m].remove();
  }
}

function getIconForTpCategory(cat)
{
  var TpIcon;
    switch(cat){
    case "A": TpIcon = tpGn; break;
    case "G": TpIcon = tpCy; break;
    case "C": TpIcon = tpMg; break;
    default:
    case "D": TpIcon = tpBl; break;
  }
  return TpIcon;
}

/* Install All waypoints */
function addTPMarkers()
{
  // JavaScript array turnPts defined in TurnPts.js
  for(p in turnPts ){
    var lat = turnPts[p].latlon.split(',')[0];
    var lon = turnPts[p].latlon.split(',')[1];
    var pos = new L.latLng(lat, lon);
    var TpIcon = getIconForTpCategory(turnPts[p].cat[0]);
    var marker = L.marker(new L.latLng(lat, lon), {icon: TpIcon, myId: p}).addTo(map);
    marker.bindTooltip(turnPts[p].name + '<br>' + turnPts[p].cat + '<br>freq: ' + turnPts[p].freq + ' MHz', { permanent: false, direction: 'top'} );
    marker.on('click', function() {
      var tp = this.options.myId;
      if(TParray[TParray.length - 1] == tp){
        return; // Avoid adjacent duplicates
      }
      TParray.push(tp);
      if(isNewTP(this) || isStartTP(this)){
        this.setIcon(tpWt);
        task.push(this);
      }
      else{
        var icon = getIconForTpCategory(turnPts[tp].cat[0]);
        this.setIcon(icon);
        removeTP(this);
      }
      // round distance to 1 decimal
      var distance = drawTask().toFixed(1);
      var text = '<div><ol>';
      for(var i=0; i< task.length; i++) {
        text += '<li>' + TParray[i] + '</li>';
      }
      text += '</ol></div><br>';
      text += '<div><button type=button onclick="clearTask()">Clear Task</button></div><br>';
      text += '<div><b>Task Distance: ' + distance + ' km</b></div>';
      var infoWindow = new L.popup( { minWidth: 'auto' })
            .setLatLng(this.getLatLng())
            .setContent(text)
            .openOn(map);

      infoArray.push(infoWindow);
    });
    TPmarkerArray.push(marker);
  }
}

function clearTask()
{
  if (flightPath) {
    flightPath.remove();
  }
  // restore original icons
  for (var i=0; i<task.length; i++) {
    var tp = task[i].options.myId;
  // first char. of category
    var cat = turnPts[tp].cat[0];
    var icon;
    switch(cat){
  default:
    case "A": icon = tpGn; break;
    case "G": icon = tpYl; break;
    case "C": icon = tpMg; break;
    case "D": icon = tpRd; break;
    }
    task[i].setIcon(icon);
  }
  TParray = [];
  task = [];
}

function removeTP(marker)
{
  for (var i=0; i<task.length; i++) {
    if(task[i].getLatLng().lng == marker.getLatLng().lng
       && task[i].getLatLng().lat == marker.getLatLng().lat) {
      task.splice(i,1);
    }
  }
}

function isNewTP(marker)
{
  for(var i = 0; i < task.length; i++){
    if(marker.getLatLng().lat == task[i].getLatLng().lat &&
       marker.getLatLng().lon == task[i].getLatLng().lon) {
      return(false);
    }
  }
  return(true);
}

function isStartTP(marker)
{
  return marker.getLatLng().lat == task[0].getLatLng().lat && marker.getLatLng.lon == task[0].getLatLng().lon;
}

var flightPath;

function drawTask()
{
  var legs = [];
  var d;

  if (flightPath!=null) {
    flightPath.remove();
  }

  for (var i=0; i<task.length; i++) {
    legs.push(task[i].getLatLng());
  }
  flightPath = new L.Polyline(legs, { smoothFactor: 0.5 }).addTo(map);
  
  d = 0.0;
  if (task.length > 1) {
  for(var i=1; i< task.length; i++) {
    d += legs[i - 1].distanceTo(legs[i]);
  }
  }
  return d / 1000.0; // return in km
}

/******************** POPUP ********************************************/
function popup(mylink, windowname, wid, ht)
{
  if (! window.focus)return true;
  var href;
  if (typeof(mylink) == 'string')
    href=mylink;
  else
    href=mylink.href;
  args = 'width=' + wid + ',height=' + ht + ',scrollbars=yes';
  // window.open(href, windowname, args);
  window.open(href, '', args);  // IE objects to a window name
  return false;
}

function animateTimer()
{
  var button = document.getElementById('animateButton');
  var buttonOnMap = document.getElementById('animateButtonOnMap');
  var delay = document.getElementById("animateDelayInput");
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
	  buttonOnMap.setAttribute("class", "fas fa-play-circle fa-lg");
	  if (button) {
      button.innerText = button.textContent = 'Start Animation';
      if (delay) {
        delay.disabled = false; 
      }
    }
  }
  else{
    timerId = setInterval(timerTick, spinboxDelay.getValue());
    if (delay) {
        delay.disabled = true;
    }
	  buttonOnMap.setAttribute("class", "fas fa-pause-circle fa-lg");
    if (button) {
      button.innerText = button.textContent = 'Stop Animation';
    }
  }
}

function timerTick()
{
  // Catch stupid parameter selection
  if (document.getElementById("Param").value === "nope1") {
    if (timerId) animateTimer(); // stop timer
    return;
  }
  if (document.getElementById("Param").value === "topo") {
    if (timerId) animateTimer(); // stop timer
    return;
  }
  if (document.getElementById("Param").value === "pfd_tot") {
    if (timerId) animateTimer(); // stop timer
    return;
  }
  // step to next time value with wrap around
  var i = document.getElementById("Time").selectedIndex;
  i = (i + 1) % times.length;
  document.getElementById("Time").options[i].selected = true;
  doChange(null); 
}

/********************************/
/* CallBack for onclick (image) */
/********************************/
function L_click(E)
{
  // Catch a stupid selection
  if (document.getElementById("Param").value === "nope1") {
    return false;
  }
// we allow topo now
//  if (document.getElementById("Param").value === "topo") {
//    return false;
//  }
  if (document.getElementById("Param").value === "pfd_tot") {
    return false;
  }
    
  if(waslong == "Y"){ // longclick
    waslong = "N";
  }
  else {
    var i = document.getElementById("Time").selectedIndex;
    i = (i + 1) % times.length;
    document.getElementById("Time").options[i].selected = true;
    doChange(E);
  }
}


/******************************************************
 * Check if "Value" or "Day" for param is implemented
 *
 * Returns: "" if not implemented
 *          Parameter name, or
 *          2+ Parameter names for some Parameters
 ******************************************************/
function checkParam()
{
  var badParams = new Array();
  badParams[0]  = "";
  badParams[1]  = "boxwmax";
  badParams[2]  = "sounding1";
  badParams[3]  = "sounding2";
  badParams[4]  = "sounding3";
  badParams[5]  = "sounding4";
  badParams[6]  = "sounding5";
  badParams[7]  = "sounding6";
  badParams[8]  = "sounding7";
  badParams[9]  = "sounding8";
  badParams[10] = "sounding9";
  badParams[11] = "sounding10";
  badParams[12] = "sounding11";
  badParams[13] = "sounding12";
  badParams[14] = "sounding13";
  badParams[15] = "sounding14";
  badParams[16] = "sounding15";
  badParams[17] = "sounding23";
  badParams[18] = "pfd_tot";

  var param =document.getElementById("Param").value;
  for(i = 0; i < badParams.length; i++) 
    if( param === badParams[i])
      return "" ;

  /* Identify the Vector Params */
  if(param === "wstar_bsratio") return("wstar bsratio");
  if(param === "sfcwind0")  return("sfcwind0spd sfcwind0dir");
  if(param === "sfcwind")   return("sfcwindspd sfcwinddir");
  if(param === "blwind")    return("blwindspd blwinddir");
  if(param === "bltopwind") return("bltopwindspd bltopwinddir");
  if(param === "press1000") return("press1000 press1000wspd press1000wdir");
  if(param === "press950")  return("press950 press950wspd press950wdir");
  if(param === "press850")  return("press850 press850wspd press850wdir");
  if(param === "press700")  return("press700 press700wspd press700wdir");
  if(param === "press500")  return("press500 press500wspd press500wdir");
  if(param === "wind950")   return("wind950spd wind950dir");
  if(param === "wind850")   return("wind850spd wind850dir");
//  if(param === "zsfclclmask") return("zsfclcl zsfclcldif");
  return param ;
}

      
var req = false;

function doCallback(url, data, Event, infoType)
{
  /************************************************/
  /* This stuff needed if running from file://... */
  /* DELETE THE LINE BELOW TO INCLUDE  */
  /*
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  } catch (e) {
    alert("Permission UniversalBrowserRead denied.");
  }
  */
  /* AND THE LINE ABOVE */
  // End This stuff needed
  /************************************************/
  if (window.XMLHttpRequest) {
    try { req = new XMLHttpRequest(); }
    catch (e) { req = false; }
  }
  else if (window.ActiveXObject) {
    // For Internet Explorer on Windows
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) {
      try { req = new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) { req = false; }
    }
  }
  if (req) {
    req.onreadystatechange = function(){
      if(req.readyState == 4 && req.status == 200){
        blipSpotPopup = true;
        addInfo(Event.latlng, '<pre>' + req.responseText + '</pre>', infoType);
      }
    }
    try { req.open('POST', url, true); }
    catch (E){ alert(E); }
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(data);
  }
  else { alert("Failed to send XML data"); }
}

// Determine the Map Resolution
function getResolution()
{
    // all NL maps are in 4km resolution for now
    return(4);
}

/******************/
/* Set Image Size */
/******************/

var Format;

function setSize()
{
  var titleBox;
  var zoomBox;
  var scaleBox;
  var sideScaleBox;

  if(document.body.clientWidth !== undefined) { // IE in various versions
    imgHt  = document.body.clientHeight;
    imgWid = document.body.clientWidth;
  }
  else if(document.documentElement && document.documentElement.clientWidth !== undefined) {
    imgHt  = document.documentElement.clientHeight;
    imgWid = document.documentElement.clientWidth;
  }
  else if(window.innerWidth !== undefined){
    imgHt  = window.innerHeight;
    imgWid = window.innerWidth;
  }
  else {  // FF etc
    imgHt  = document.body.scrollHeight;
    imgWid = document.body.scrollWidth;
  }

  // Subtract width of side-bar
  imgWid -= 55; //((document.getElementById("selectors").offsetWidth) + 10);
  imgHt  -= 6;

  // Determine whether image is Portrait or Landscape
  if(imgHt > imgWid){ Format = "Portrait";  }
  else              { Format = "Landscape"; }
  if(Format == "Landscape") {
    botHeight = 0  // Turn off Bottom Scale
    sideWidth = imgHt * 0.09;   // Ratio wid / ht */
  }
  else {
    sideWidth = 0; // Turn Off Side Scale
    botHeight = imgWid * 0.09;
  }

  /* 
   * See http://www.w3schools.com/Css/pr_class_position.asp
   * for interaction of position = absolute, fixed, relative, static & inherit
   */

  /* This messing allows variable size title in the centre */
  topWidth  =  imgWid - sideWidth;
  topHeight = topWidth * 0.08;    // Ht of Title: Ratio of img ht / wid
  topHeight *= TitleScale;
  if (isSmallScreen()) {
	  topHeight *= 0.6;
  }
  topWidth  *= TitleScale;

  titleD = document.getElementById("topDiv");
  titleD.style.overflow = "hidden";
  titleD.style.position = "relative";
  titleD.style.width = imgWid - sideWidth + "px";

  /* position next day button */
  document.getElementById("next-day-button").style.left = imgWid - sideWidth - 30 + "px";

  titleBox = document.getElementById("topTitle");
  titleBox.style.position = "relative" ;
  titleBox.style.left = (imgWid - sideWidth - topWidth) / 2 + "px";

  titleObj = document.getElementById("theTitle");
  titleObj.style.top      = 0 + "px";
  titleObj.style.height   = topHeight + "px";
  titleObj.style.width    = topWidth + "px";

  zoomBox = document.getElementById("map");
  zoomBox.style.left     = 0  + "px" ;
  zoomBox.style.top      = 0  + "px";
  zoomBox.style.height   = (imgHt - topHeight - botHeight ) + "px";
  zoomBox.style.width    = (imgWid - sideWidth) + "px";
  zoomBox.style.overflow = "hidden" ;
  zoomBox.style.position = "relative" ;

  sideScaleBox = document.getElementById("sideScale");
  sideScaleBox.style.overflow = "hidden" ;
  sideScaleBox.style.position = "relative" ;

  sideScaleObj = document.getElementById("theSideScale");
  sideScaleObj.style.left     = 0  + "px";
  sideScaleObj.style.top      = 0 + "px";
  sideScaleObj.style.width    = sideWidth  + "px";
  sideScaleObj.style.height   = zoomBox.style.height

  scaleBox = document.getElementById("botScale");
  scaleBox.style.overflow = "hidden" ;
  scaleBox.style.position = "relative" ;

  scaleObj = document.getElementById("theScale");
  scaleObj.style.left     = 0 + "px";
  scaleObj.style.top      = 0 + "px";
  scaleObj.style.height   = botHeight  + "px";
  scaleObj.style.width    = zoomBox.style.width;

  /* Now do the Selectors */

  tblHt = document.getElementById("selectors").offsetHeight;
  map.fitBounds(corners.Bounds[resolution]);

//  alert("TableHt = " + tblHt + "ImgHt = " + imgHt);
      
  if( tblHt > imgHt ){
    /* small screen, show only 1 item */
    document.getElementById("Param").size = 1;  // Number of visible Parameters
    document.getElementById("Time").size  = 1;  // Number of visible Times
    document.getElementById("Day").size   = 1;  // Number of visible Days
  }

  else {              // The big Tables will fit
    document.getElementById("Param").size = paramListLite.length;
    document.getElementById("Time").size  = SAVE_DAYS;
    document.getElementById("Day").size   = SAVE_DAYS;
  }  

/*  if (screenfull.enabled) {
    if(isSmallScreen()) {
       if (screenfull.isFullscreen) {
         document.getElementById("Url").style.visibility = 'hidden';
       }
       else {
         document.getElementById("Url").style.visibility = 'visible';
       }    
    }
  }
*/
  setTimeout(function(){ map.invalidateSize()}, 400);
//  map.invalidateSize();
}

/* 
 * Set the times in the table for STD or DST
 *
 */
function setTimes()
{
  // assume at 1-jan-2012 DST was not active...
  var dateJan = new Date(2012, 0, 1);
  var dateNow = new Date();

  var mS_Day = 24 * 60 * 60 * 1000; // mS in a day

  switch( document.getElementById("Day").selectedIndex ){
    case 0:                                                     break;     // Today
    case 1: dateNow = new Date(dateNow.valueOf() +     mS_Day); break;     // Today+1
    case 2: dateNow = new Date(dateNow.valueOf() + 2 * mS_Day); break;     // Today+2
    case 3: dateNow = new Date(dateNow.valueOf() + 3 * mS_Day); break;     // Today+3
    case 4: dateNow = new Date(dateNow.valueOf() + 4 * mS_Day); break;     // Today+4
    case 5: dateNow = new Date(dateNow.valueOf() + 5 * mS_Day); break;     // Today+5
    case 6: dateNow = new Date(dateNow.valueOf() + 6 * mS_Day); break;     // Today+6
  }

  if(dateNow.getTimezoneOffset() == dateJan.getTimezoneOffset())
    times = tzArray["STD"];
  else
    times = tzArray["DST"];

  // Keep the same time selected
  Tindex = document.getElementById("Time").selectedIndex;

  for(var i = 0; i < times.length; i++) {
    document.getElementById("Time").options[i] = new Option(times[i], times[i]);
    if(Tindex == i)
      document.getElementById("Time").options[i].selected = true;
  }
}

/*******************************/
/* CallBack from the selectors */
/*******************************/
function doChange(E)
{
  hideLoading();
  
  if(document.getElementById("Param").value === "nope1" ) {
    return 0;   // Catch a stupid selection
  }
  if (paramDescriptionWindow) {
	  if (paramDescriptionWindow.isOpen()) {
		  paramDescriptionWindow.remove();
	  }
  }
	  
  if(oldParam !== document.getElementById("Param").value) {
	  /*  Descriptions are popups now */
	  var description;
	  if(fullSet){
		description=paramListFull[document.getElementById("Param").selectedIndex][3];
	  }
	  else {
		description=paramListLite[document.getElementById("Param").selectedIndex][3];
	  }
	  paramDescriptionWindow = new L.popup( { minWidth: imgWid/2 })
		.setLatLng(corners.Centre[resolution])
		.setContent(description)
		.openOn(map);
  }
  /* Clear saved images
   * if Param or Day changes
   */
  if((oldParam !== document.getElementById("Param").value)
        || (oldDayIndex !== document.getElementById("Day").selectedIndex)){
    for(i = 0; i < document.getElementById("Time").options.length; i++){
      Loaded[i] = false;
      if(Overlays[i]){
        Overlays[i].hide();
        Overlays[i] = null;
      }
    }
    setTimes();
  }

  // Change the resolution if Day changes 
  if(oldDayIndex !== document.getElementById("Day").selectedIndex){
    resolution = getResolution();
  }

  /* Save current values, so can detect change */
  oldParam        = document.getElementById("Param").value;
  oldDayIndex     = document.getElementById("Day").selectedIndex;

  loadImage(1); // forwards
}

function getBasedir()
{
  var basedir;

  switch(document.getElementById("Day").selectedIndex){
    case 0: basedir = "NL+0"; break;
    case 1: basedir = "NL+1"; break; 
    case 2: basedir = "NL+2"; break;
    case 3: basedir = "NL+3"; break;
    case 4: basedir = "NL+4"; break;
//    case 6: basedir = "NL+5"; break;
//    case 7: basedir = "NL+6"; break;
    default: alert("getBasedir: Bad day selector: " + document.getElementById("Day").selectedIndex); break;
  }
  return(basedir);
}

function doUrl() // Set up URL link
{
  var T      = new Date();  // Initialised to "Now"
  var str = location.href.split("?")[0]
  offset = document.getElementById("Day").selectedIndex;
  if(offset > 1){
      T.setDate(T.getDate() + offset);  // DayOfMonth 
  }
  month = T.getMonth() + 1; // month now 1 to 12
  month = (month < 10) ? "0" + month : month;
  date  = T.getDate();
  date  = (date < 10) ? "0" + date : date;
  year  = T.getFullYear();

    // active maptype
  var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
  if (layerControlElement) {
    if (layerControlElement.getElementsByTagName('input')[0].checked){
      maptype="mapbox.streets";
    }
    if (layerControlElement.getElementsByTagName('input')[1].checked){
      maptype="mapbox.toner";
    }
    if (layerControlElement.getElementsByTagName('input')[2].checked){
      maptype="mapbox.terrain";
    }
  }
  
  str += "?"
      + "date="     + year + month + date
      + "&param="   + document.getElementById("Param").value
      + "&time="    + document.getElementById("Time").value
      + "&zoom="    + zoom
      + "&opacity=" + opacity
      + "&maptype=" + maptype
      + "&centre="  + centre.lat + "," + centre.lng;

  document.getElementById("Url").innerHTML = '<a href="' + str +'">Page URL</a>';
  hideLoading();
}

/************************************************/
/* Load the Image                               */
/* -1 => backwards; 0 => neither; 1 => forwards */
/************************************************/
function loadImage(dirn)
{
  var imgURL;
  var tIdx   = document.getElementById("Time").selectedIndex;
  var param  = document.getElementById("Param").value;

  deleteInfo();   // Remove the InfoWindows

  if(overlay){ // If already have an overlay, hide it
    overlay.hide();
  }
  // topography is pretty static...
  if(param == "topo"){
    imgURL = "topo/";
  }
  else {
    imgURL =  Server + getBasedir() + "/" ;
  }

  // Load image(s) / overlays
  for(x = tIdx, i = 0; i < 2; i++){
    if(!Loaded[x]){
      t = document.getElementById("Time").options[x].value;
      ximgURL = imgURL + param;
      if(param == "topo"){
        ximgURL += resolution;  // no time needed for topo picture
      }
      else{
        if(param != "pfd_tot") {
          ximgURL += ".curr." + t + "lst.d2" ;
        }
      }
      if(param.match("sounding")){
        isSounding = true;
        siz = (Format == "Landscape" ? imgHt : imgWid);
        SoundingPics[x] = new Image(siz, siz);
        SoundingPics[x].src = ximgURL + ".png" ;
      }
      else{
        isSounding = false;
        theTitles[x].src     = ximgURL + ".head.png";
        theSideScales[x].src = ximgURL + ".side.png";
        theScales[x].src     = ximgURL + ".foot.png";
        // Visible if overlay is current one
        Overlays[x] = new RASPoverlay(corners.Bounds[resolution],
                           ximgURL + ".body.png",
                           map,
                           i == 0 ? "visible" : "hidden" );
        Overlays[x].onAdd();
        Loaded[x] = true;
      }
    }
    x = (x + dirn) % times.length;
    x = (x < 0) ? times.length - 1 : x;
  }

  // Install the new Overlay or Sounding
  var imgData = document.getElementById("imgdata");
  if(!isSounding){  // Map
    if(wasSounding){
      wasSounding = false;
      if(!imgFragment)
        alert("Error! - No saved image fragment");
      imgData.replaceChild(imgFragment, imgData.firstChild);
    }

    for(x = 0; x < Overlays.length; x++){
      if(Overlays[x]){
        if(x == tIdx){ 
          overlay = Overlays[x];
          overlay.show();
        }
        else { 
          Overlays[x].hide();    
        }
      }
    }
    document.getElementById("theTitle").src     = theTitles[tIdx].src;
    document.getElementById("theScale").src     = theScales[tIdx].src;
    document.getElementById("theSideScale").src = theSideScales[tIdx].src;

    overlay.setOpacity();
  }
  else {  // Sounding
    if(wasSounding == false){
      wasSounding = true;
      if(!imgFragment) imgFragment = document.createDocumentFragment();
      imgFragment.appendChild( document.getElementById("imgDiv")); // "appending" imgData removes it from old tree
      imgData.insertBefore( SoundingPics[tIdx], imgData.firstChild);
    }
    else {
      imgData.replaceChild( SoundingPics[tIdx], imgData.firstChild);
    }
    dunnit = imgData.firstChild.getAttribute("done");
    if( !dunnit || (dunnit && dunnit.length == 0)){ // null OR a zero-length string if no attribute
      if( typeof(attachEvent) != "undefined")
        imgData.firstChild.attachEvent('onclick', function(event) {L_click(event);});
      else
        imgData.firstChild.addEventListener('click', function(event) {L_click(event);});
      imgData.firstChild.done = "done";
    }
  }
  doUrl();  // Set/update the Page URL
}

function raspImageNotLoaded() {
  var t = document.getElementById("theTitle");
  t.src = "img/notfound.png";
  var bs =  document.getElementById("theScale");
  bs.src = "img/notfound.png";
  var ss =  document.getElementById("theSideScale");
  ss.src = "img/error.png";
}

var imgFragment = null;

function doAirspace()
{
  var airspacetype = document.getElementById("airspace");

  for(i = 0; i < airspacetype.length; i++){
    if(airspacetype[i].checked){
		// first time here for this airspace?
		if (airspaceArray[i] == null) {
			// then load the KML overlay (slow!)
			showLoading();
			var d = new Date().toLocaleString();
			ASstring = head + "/airspace/airspace_class_" + airspacetype[i].value + ".kml?dummy=" + d;
			var mystyle = "#ff0000";
			switch(airspacetype[i].value) {
				case 'A': mystyle = "#ff0000"; break;
				case 'B': mystyle = "#0000ff"; break;
				case 'C': mystyle = "#e9871c"; break;
				case 'D': mystyle = "#000000"; break;
				case 'E': mystyle = "#ff00ff"; break;
				case 'X': mystyle = "#902147"; break;
			}
			airspaceArray[i] = new L.KML(ASstring, mystyle, {async: true });
			airspaceArray[i].on("loaded", function(e) {
				hideLoading();
				map.addLayer(this);
				this.addTo(map);
			});
		}
	    else {
			map.addLayer(airspaceArray[i]);
			airspaceArray[i].addTo(map);
		}
    }
    else{
	  if (airspaceArray[i] != null) {
		airspaceArray[i].remove();
	  }
    }
  }
}


function R_click(E)
{
  var tail;
  var parameter;
  var str;
  var lat;
  var lon;

  if( !corners.Bounds[resolution].contains(E.latlng)){ // Outside forecast area!
    return;
  }

  lat = E.latlng.lat;
  lon = E.latlng.lng;

  parameter = checkParam();
  if(parameter === "") {
    addInfo(E.latlng, "<pre>Values for " + document.getElementById("Param").value + "\n are not available</pre>");
    return;
  }
  // Get type of Popup from Radio Button Selector
  var el = document.getElementById("popup").info;
  for(i = 0; i < el.length; i++){
    if(el[i].checked)
      infoPopup = el[i].value;
  }

  str = getBasedir().replace("\+", "%2b"); // %2b == '+'
  switch(infoPopup){
  case "Value":
      blipSpotUrl = Server + "cgi-bin/get_rasp_blipspot.cgi";

      tail = "region=" + str
           + "&grid="   + "d2"
           + "&day=0"
           + "&linfo=1"
           + "&lat="        + lat
           + "&lon="        + lon
           + "&time="       + document.getElementById("Time").value + "lst"
           + "&param="      + parameter;

      doCallback(blipSpotUrl, tail, E, infoPopup);
      break;

  case "Day":
      blipSpotUrl = Server + "cgi-bin/get_rasp_blipspot.cgi";
      tail = "region=" + str
           + "&grid="   + "d2"
           + "&day=0"
           + "&linfo=1"
           + "&lat="        + lat
           + "&lon="        + lon
           + "&param=" + parameter;
      doCallback(blipSpotUrl, tail, E, infoPopup);
      break;
  }
}

function getRegion()
{
  switch(document.getElementById("Day").selectedIndex){
    case 0: regn = "NL%2b0"; break;
    case 1: regn = "NL%2b1"; break; 
    case 2: regn = "NL%2b2"; break;
    case 3: regn = "NL%2b3"; break;
    case 4: regn = "NL%2b4"; break;
    case 5: regn = "NL%2b5"; break;
    case 6: regn = "NL%2b6"; break;
    default: alert("Bad day selector: " + document.getElementById("Day").selectedIndex); break;
  }
  return(regn);
}

function addInfo(location, txt, infoType)
{
  // if((imgWid < 480) || (imgHeight < 480))  // Remove other infoWindows on small screens
  //  deleteInfo();
  
  var nlines = 2; // Always need at least two lines to  prevent scroll bars
  var ind = 0;
  var longline = false;
  for(var start = 0; (ind = txt.indexOf("\n", start)) > -1; start++, nlines++){
    if(ind - start > 50)
      longline = true;
    start = ind;
  }
  // Deal also with html <br>'s
  for(var start = 0; (ind = txt.indexOf("<br>", start)) > -1; start++, nlines++){
    if(ind - start > 50)
      longline = true;
    start = ind;
  }

  if(longline)  // Allow for bottom scrollbar
    nlines++;

  var infoWindow = new L.popup( { maxWidth: imgWid/3 })
            .setLatLng(location)
            .setContent('<div style="height: ' + nlines + 'em;" >' + txt + '</div>')
            .openOn(map);
  infoWindow.on('remove', function(e) { popupClosed(e) }); 
  // array is not really needed, because default Leaflet will close
  // any open infoWindow before opening a new one
  infoArray.push(infoWindow);
}

function popupClosed(e){
  if (blipSpotPopup) {
    blipSpotPopup = false;
  }
}

function deleteInfo()
{
  if (infoArray) {
    for(i  = 0; i < infoArray.length; i++) {
      infoArray[i].remove();
    }
    // clear the array
    infoArray.length = 0;
  }
  if(ctrFlag){
    map.panTo(centre); // Centre the map if Sounding has scrolled it
    ctrFlag = false;
  }
}


function switchParamList(E)
{
  if(fullSet){
    changeParamset(paramListLite);
    document.getElementById("paramSet").innerHTML = "Press for Full Parameter set";
  }
  else{
    changeParamset(paramListFull);
    document.getElementById("paramSet").innerHTML = "Press for Reduced Parameter set";
  }
}
    

function changeParamset(newParams)
{
  for(var i = 0; i < newParams.length; i++) {
    document.getElementById("Param").options[i] = new Option(newParams[i][2], newParams[i][1]);
    document.getElementById("Param").options[i].className = newParams[i][0];
  }
  if(document.getElementById("Param").options.length > newParams.length){
    for(i = newParams.length; i < document.getElementById("Param").length; i++){
      document.getElementById("Param").options[i] = null;
    }
  }
  document.getElementById("Param").options.length = newParams.length;
  fullSet = ((fullSet == true) ? false : true);

  // The parameter punter had selected is available as oldParam !!
  for(var i = 0; i < document.getElementById("Param").options.length; i++){
    if(document.getElementById("Param").options[i].value == oldParam)
      break;
  }
  if(i == document.getElementById("Param").options.length){
    document.getElementById("Param").options[1].selected = true;  // Not available
  }
  else{
    document.getElementById("Param").options[i].selected =true;
  }
}

LongClick.prototype.onMouseUp_ = function(e) {
  if (blipSpotPopup) {
    return;
  }
  var now = new Date;
  if (now - this.down_ > this.length_) {
      R_click(e);
      waslong = "Y";
  }
}

LongClick.prototype.onMouseDown_ = function() {
  this.down_ = new Date;
}

function LongClick(map, length) {
  this.length_ = length;
  var me = this;
  me.map_ = map;
  L.DomEvent.addListener(map, 'mousedown', function(e) { me.onMouseDown_(e) });
  L.DomEvent.addListener(map, 'mouseup',   function(e) { me.onMouseUp_(e)   });
}


function cancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation) e.stopPropagation();
  if(e.preventDefault)  e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

/**
* Get the position of the mouse relative to the document.
* @param {Object} e  Mouse event
* @return {Object} left & top position
*/
function getMousePosition(e)
{
  var posX = 0, posY = 0;
  e = e || window.event;
  if (typeof e.pageX !== "undefined") {
    posX = e.pageX;
    posY = e.pageY;
  }
  else if (typeof e.clientX !== "undefined") {
    posX = e.clientX + (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft);
    posY = e.clientY + (typeof document.documentElement.scrollTop  !== "undefined" ? document.documentElement.scrollTop  : document.body.scrollTop);
  }
  return {
    left: posX,
    top: posY
  };
};


/**
 * Get the position of an HTML element relative to the document.
 * @param {Object} h  HTML element
 * @return {Object} left & top position
 */
function getElementPosition(h)
{
  var posX = h.offsetLeft;
  var posY = h.offsetTop;
  var parent = h.offsetParent;
  // Add offsets for all ancestors in the hierarchy
  while (parent !== null) {
    // Adjust for scrolling elements which may affect the map position.
    //
    // See http://www.howtocreate.co.uk/tutorials/javascript/browserspecific
    //
    // "...make sure that every element [on a Web page] with an overflow
    // of anything other than visible also has a position style set to
    // something other than the default static..."
    if (parent !== document.body && parent !== document.documentElement) {
      posX -= parent.scrollLeft;
      posY -= parent.scrollTop;
    }
    posX += parent.offsetLeft;
    posY += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    left: posX,
    top: posY
  };
};

/**************** Start OVERLAY Stuff ******************/

var RASPoverlay = L.Class.extend({  
  // this is the constructor
  initialize: function (bounding, image, map, vis) {
//    L.Util.setOptions(this, options);
//    this._selector = selector;
  this._map    = map;
  this.bounds_ = bounding;
  this.url_    = image;
  this.map_    = map;
  this.Id_     = image;
  this.div     = null;
  this.vis_    = vis;
  this.raspLayer_ = null; // layer is added in onAdd
  },
  
  onAdd: function() {
    var div = document.createElement("div") ;
    div.style.border      = "none";
    div.style.borderwidth = "0px";
    div.style.position    = "absolute" ;
    div.setAttribute('Id',this.Id) ;

    var img = document.createElement("img");
    img.src            = this.url_;
    img.style.width    = "100%";
    img.style.height   = "100%";
    img.style.position = "absolute";
    img.addEventListener("error",raspImageNotLoaded);
    div.appendChild(img);

    this.div_ = div;

    this.raspLayer_ = L.imageOverlay(this.url_, this.bounds_).addTo(map);

    var o = opacity / 100;
    if      (typeof(div.style.opacity)      == 'string') { div.style.opacity      = o ; }
    else if (typeof(div.style.KHTMLOpacity) == 'string') { div.style.KHTMLOpacity = o ; }
    else if (typeof(div.style.MozOpacity)   == 'string') { div.style.MozOpacity   = o ; }
    else if (typeof(div.style.filter)       == 'string') { div.style.filter = 'alpha(opacity=' + opacity + ')'; } //<IE9

    div.style.visibility = this.vis_;
  },
  
  draw: function() {
    var overlayProjection = this.getProjection();

    if(overlayProjection == undefined)
    return;

    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Position our DIV using our bounds
    var div = this.div_;
    div.style.left   = sw.x + "px";
    div.style.top    = ne.y + "px";
    div.style.width  = ne.x - sw.x + "px";
    div.style.height = sw.y - ne.y + "px";
  },
  /* 
   * Opacity utility functions
   */
  isVisible: function() {
    return ( this.div_ ? ((this.div_.style.visibility == 'visible') ?  true : false ) : false);
  },
  hide: function() {
    if (this.raspLayer_) {
      this.raspLayer_.remove();
    }     
  },

  show: function() {
    if (this.raspLayer_){
      var c = opacity/100.0;
      this.raspLayer_.addTo(map);
      this.raspLayer_.setOpacity(c);
      // set the active layer for the opacity control
      higherOpacity.setOpacityLayer(this.raspLayer_);
      lowerOpacity.setOpacityLayer(this.raspLayer_);
    }
  },

  setOpacity: function() {
    var c = opacity/100.0;
    if (this.raspLayer_) {
      this.raspLayer_.setOpacity(c);
    }
    var d = document.getElementById( this.Id ) ;
    if (d) {
    if      (typeof(d.style.opacity)      == 'string') { d.style.opacity      = c ; }
    else if (typeof(d.style.KHTMLOpacity) == 'string') { d.style.KHTMLOpacity = c ; }
    else if (typeof(d.style.MozOpacity)   == 'string') { d.style.MozOpacity   = c ; }
    else if (typeof(d.style.filter)       == 'string') { d.style.filter = 'alpha(opacity='+opacity+')'; } //<IE9

    doUrl();
    }
  },
});

/**************** End OVERLAY Stuff ******************/


/* indexOf function - For Widnows Exploder < IE9 */
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(val, fromIndex) {
    if (typeof(fromIndex) != 'number')
      fromIndex = 0;
    for(var index = fromIndex,len = this.length; index < len; index++)
      if (this[index] == val)
        return index;
      return -1;
  }
}
/* End indexOf */

/****************** Start OPACITY CONTROL Stuff **********************/

function createOpacityControl(map)
{
  higherOpacity = new L.Control.higherOpacity();
  higherOpacity.setCallback(opacityCallback);
  map.addControl(higherOpacity);
  $('.higher_opacity_control').attr('title', 'Increase Opacity');
  
  lowerOpacity = new L.Control.lowerOpacity();
  map.addControl(lowerOpacity);
  $('.lower_opacity_control').attr('title', 'Decrease Opacity');
}

function opacityCallback(o) {
  opacity = o * 100;
}

/****************** End OPACITY CONTROL Stuff **********************/

/****************** Ajax Loading Indicator ************************/
function showLoading() {
  if (ajaxLoaderOverlay) {
    ajaxLoaderOverlay.show();
  }
}

function hideLoading() {
  if (ajaxLoaderOverlay) {
    ajaxLoaderOverlay.hide();
  }
}
/***************** End Ajax Loading Indicator *********************/

function isSmallScreen(){
  return $(window).height() < 500;
}

/****************** Full Screen Request *****************************/
function toggleFullScreen()
{
  if (screenfull.enabled) {
    screenfull.toggle();
    if(isSmallScreen()) {
      // hide these in full screen mode on small screens
      $("#animationDelayRow").slideToggle();
    }
  }
  else {
    alert("Sorry, your browser does not support Full Screen API");
  }
}

/******************* next/prev day handlers ************************/
function nextDay()
{
  var index = document.getElementById("Day").selectedIndex;
  index++;
  if (index >= SAVE_DAYS) {
    index = 0;
  }
  document.getElementById("Day").options[index].selected = true;
  doChange();
}

function prevDay()
{
  var index = document.getElementById("Day").selectedIndex;
  index--;
  if (index < 0) {
    index = SAVE_DAYS - 1;
  }
  document.getElementById("Day").options[index].selected = true;
  doChange();
}

function isIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE '); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11

  return (msie > 0 || trident > 0);
}
