/************************************
 * Parameter List                   *
 *                                  *
 * Full List is first               *
 *                                  *
 * Lite List chooses from Full List *
 ***********************************/

var paramList = 	[

/****************************************************************
 *                                                              *
 *  [ Style Class Name, Value, Description, Full Description ]  *
 *                                                              *
 *  NOTE: Style Class Names are defined in the .html file       *
 *                                                              *
 ****************************************************************/


/* 0 */ ["optionBoldRed",  "nope1",					"- - - THERMAL PARAMETERS - - -", " "],

/* 1 */ ["",		 "bsratio",	"B/S Ratio", "Buoyancy/Shear Ratio. The intent is to mark regions where a small B/S Ratio will make thermals difficult (or impossible) to work, though that depends upon pilot skill and circling radius"],

/* 2 */ ["optionBoldBlue", "wstar",					"Thermal Updraft Velocity (W*)", "Average dry thermal updraft strength near mid-BL height.  Subtract glider descent rate to get average vario reading for cloudless thermals.  Updraft strengths will be stronger than this forecast if convective clouds are present, since cloud condensation adds buoyancy aloft (i.e. this neglects cloudsuck).  W* depends upon both the surface heating and the BL depth"],

/* 3 */ ["",		 "hbl",						"BL Top", "Height of the top of the mixing layer, which for thermal convection is the average top of a dry thermal.  Over flat terrain, maximum thermalling heights will be lower due to the glider descent rate and other factors.  In the presence of clouds (which release additional buoyancy aloft, creating cloudsuck) the updraft top will be above this forecast, but the maximum thermalling height will then be limited by the cloud base. Further, when the mixing results from shear turbulence rather than thermal mixing this parameter is not useful for glider flying.  NB: this BL Top is not the height where the Thermal Index (TI) is zero, which is a criteria used by many simple determinations of the BL top - instead, the RASP BL Top uses a more sophisticated BL Top criteria based on turbulent fluxes"],

/* 4 */ ["",		 "hglider",				"Thermalling Height", "This is the minimum of the height at which updraft strength falls below 175 fpm (0.9 m/s), the Cu Cloudbase and the OverDevelopment Cloudbase. It might thus indicate the maximum soaring height which is achievable in thermals, clear of cloud."],

/* 5 */ ["",		 "bltopvariab",		"Thermal Height Uncertainty", "This parameter estimates the uncertainty (variability) of the BL Top height prediction which can result from meteorological variations.  Specifically, it gives the expected increase of a BL Top height based on a Thermal Index (TI) = 0 criteria should the actual surface temperature be 4 °F warmer than forecast.  Larger values indicate greater uncertainty/variability and thus better thermalling over local 'hot spots' or small-scale topography not resolved by the model.  But larger values also indicate greater sensitivity to error in the predicted surface temperature, so actual conditions have a greater likelihood of differing from those predicted.  Small values often result from the presence of a stable (inversion) layer capping and limiting thermal growth.  This parameter is most easily utilized through relative values, i.e. by first determining a 'typical' value for a location and subsequently noting whether predictions for a given day are for more/less uncertainty than is typical."],

/* 6 */ ["optionBoldBlue", "experimental1",	"Ht of Critical Updraft Strength", "This parameter estimates the height at which the average dry updraft strength drops below 175 fpm or 0.9 m/s and is expected to give better quantitative numbers for the maximum cloudless thermalling height than the BL Top height forecast, especially when mixing results from vertical wind shear rather than thermals.  (Note: the present assumptions tend to underpredict the max. thermalling height for dry conditions.) In the presence of clouds the maximum thermalling height may instead be limited by the cloud base. Being for dry thermals, this parameter omits the effect of cloudsuck"],

/* 7 */ ["",		 "zwblmaxmin",		"MSL Height of max/min Wbl", "Height at which the max / min of the vertical velocity in the Boundary Layer occurs, i.e. of \"BL Max Up/Down (Convergence)\" (qv)"],

/* 8 */ ["optionBoldBlue", "sfcsunpct",			"Normalized Sfc. Sun", "The 'Solar Radiation' actually reaching the surface divided by the amount of solar radiation which would reach the surface in a dry atmosphere (i.e. in the absence of clouds and water vapor), expressed as a percentage.  This parameter indicates the degree of cloudiness, i.e. where clouds limit the sunlight reaching the surface."],

/* 9 */ ["",		 "sfctemp",				"Sfc.Temperature", "The temperature at a height of 2m above ground level.  This can be compared to observed surface temperatures as an indication of model simulation accuracy; e.g. if observed surface temperatures are significantly below those forecast, then soaring conditions will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 10 */ ["",		 "sfcdewpt", 			"Sfc.Dewpoint", "The dew point temperature at a height of 2m above ground level.  This can be compared to observed surface dew point temperatures as an indication of model simulation accuracy; e.g. if observed surface dew point temperatures are significantly below those forecast, then BL cloud formation will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 11 */ ["optionBoldRed",  "nope1", 				"- - - WIND PARAMETERS - - -", ""],

/* 12 */ ["optionBoldBlue", "sfcwind0", 			"Sfc.Wind (2m)", "The speed and direction of the wind 2m above the ground.  Speed is depicted by different colors and direction by streamlines.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 13 */ ["optionBoldBlue", "blwind", 				"BL Avg. Wind", "The speed and direction of the vector-averaged wind in the BL.  This prediction can be misleading if there is a large change in wind direction through the BL (for a complex wind profile, no single number is an adequate descriptor!)."],

/* 14 */ ["",		 "bltopwind", 		"Wind at BL Top", "The speed and direction of the wind at the top of the BL.  Speed is depicted by different colors and direction by streamlines."],

/* 15 */ ["",		 "blwindshear", 	"BL Wind Shear", "The vertical change in wind through the BL, specifically the magnitude of the vector wind difference between the top and bottom of the BL.  Note that this represents vertical wind shear and does not indicate so-called 'shear lines' (which are horizontal changes of wind speed/direction)."],

/* 16 */ ["optionBoldBlue", "wblmaxmin", 		"BL Max. Up/Down (Convergence)", "Maximum grid-area-averaged extensive upward or downward motion within the BL as created by horizontal wind convergence.  Positive convergence is associated with local small-scale convergence lines (often called 'shear lines' by pilots, which are horizontal changes of wind speed/direction) - however, the actual size of such features is much smaller than can be resolved by the model so only stronger ones will be forecast and their predictions are subject to much error.  If CAPE is also large, thunderstorms can be triggered.  Negative convergence (divergence) produces subsiding vertical motion, creating low-level inversions which limit thermalling heights.  This parameter can be noisy, so users should be wary.  For a grid resolution of 12km or better convergence lines created by terrain are commonly predicted - sea-breeze predictions can also be found for strong cases, though they are best resolved by smaller-resolution grids."],

/* 17 */ ["optionBoldRed",  "nope1", 				"- - - CLOUD PARAMETERS - - -", ""],

/* 18 */ ["optionBoldBlue", "zsfclclmask", 	"Cu Cloudbase where CuPotential > 0", "This plot is a combination of the value of the 'Cumulus Potential for non-extensive puffy cloud' (LCL - which indicates areas where cloud may form) and the 'Lifted Condensation Level' (the level to which humid air must rise to form cloud). It thus depicts the Cumulus Cloudbase at locations where cumulus may form and so alleviates the need to look at both Cumulus Potential and Cumulus Cloudbase plots. Note that the threshold Cumulus Potential should be empirically determined for your site, which has not been done for the Netherlands: it is assumed to approximate to the theoretical value of zero.  For locations where the actual threshold is greater than zero, as is often the case, this depiction will over-estimate the extent of the cumulus region."],

/* 19 */ ["optionBoldBlue", "zblclmask", 		"OD Cloudbase where ODpotential > 0", "Combining the previous two parameters, this depicts the OvercastDevelopment (OD) Cloudbase only at locations where the OD Potential parameter is positive.  This single plot can be used, instead of needing to look at both the OD Potential and OD Cloudbase plots, if the threshold OD Potential empirically determined for your site approximately equals the theoretical value of zero."],

/* 20 */ ["",		 "rain1", 				"Rain", "Rain accumulated over the last hour. Note that this requires a forecast for the previous hour, so it is not possible to plot this parameter until 1 hour after the first forecast for the day."],

/* 21 */ ["",		 "cape", 					"CAPE", "Convective Available Potential Energy indicates the atmospheric stability affecting deep convective cloud formation above the BL.  A higher value indicates greater potential instability, larger updraft velocities within deep convective clouds, and greater potential for thunderstorm development (since a trigger is needed to release that potential).  Note that thunderstorms may develop in regions of high CAPE and then get transported downwind to regions of lower CAPE.  Also, locations where both convergence and CAPE values are high can be subject to explosive thunderstorm development."],

/* 22 */ ["",		 "wrf=CFRACL", 		"Low-level Cloud Cover", "The low-level cloud cover percentage (<2,5km). This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 23 */ ["",		 "wrf=CFRACM", 		"Mid-level Cloud Cover", "The mid-level cloud cover percentage (2,5-6km). This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 24 */ ["",		 "wrf=CFRACH", 		"High-level Cloud Cover", "The high-level cloud cover percentage (>6km). This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],


/* 25 */ ["optionBoldRed",  "nope1", 				"- - - Potential Flight Distance - - -", ""],

/* 26 */ ["optionBoldBlue",		 "pfd_tot", "Potential Flight Distance", "De potentiele vliegafstand over de berekende weersvoorspellingsperiode voor een Discus met 100 liter waterballast in kilometers. Hierbij is de 'Thermieksterkte zonder eigen dalen' minus 1,15 m/s (bij benadering het eigen-dalen met water in de bocht) gebruikt als de thermieksterkte. Deze thermieksterkte en een Discus polaire (met 100 liter water) zijn gebruikt om met Reichmann's formules de gemiddelde overlandsnelheid, ofwel de vliegafstand, te berekenen per half uur. Vervolgens zijn deze opgeteld over de dag. Hierbij zijn geen weerscorrecties toegepast. De 'Potentiele vliegafstand' geeft een eerste indruk van de vliegcondities in verschillende gebieden over de gehele dag."],
	
	
/* 27 */ ["optionBoldRed",  "nope1", 				"- - - WAVE PARAMETERS - - -", ""],

/* 28 */ ["",		 "press955", 			"Wave/Convergence at ~ 500m AMSL", "Wave/Convergence at ca. 500m AMSL (pressure level of 955mb), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 29 */ ["",		 "press899", 			"Wave/Convergence at ~ 1000m AMSL", "Wave/Convergence at ca. 1000m AMSL (pressure level of 899mb), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 30 */ ["",		 "press846", 			"Wave/Convergence at ~ 1500m AMSL", "Wave/Convergence at ca. 1500m AMSL (pressure level of 846mb), plus wind speed/direction barbs.  [846mb presure level is approximately at 5000 ft AMSL or 1500 m AMSL.]  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 31 */ ["",		 "press795", 			"Wave/Convergence at ~ 2000m AMSL", "Wave/Convergence at ca. 2000m AMSL (pressure level of 795mb), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 32 */ ["",		 "press701", 			"Wave/Convergence at ~ 3000m AMSL", "Wave/Convergence at ca. 3000m AMSL (pressure level of 701mb), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 33 */ ["",		 "press616", 			"Wave/Convergence at ~ 4000m AMSL", "Wave/Convergence at ca. 4000m AMSL (pressure level of 616mb), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 34 */ ["",		 "press540", 			"Wave/Convergence at ~ 5000m AMSL", "Wave/Convergence at ca. 5000m AMSL (pressure level of 540mb), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 35 */ ["optionBoldRed",  "nope1", 				"- - - SOUNDINGS - - -", ""],
/* 36 */ ["",		 "sounding1", 		"#1: Amsterdam", "Predicted SkewT*LogP Sounding Plot for Amsterdam"],
/* 37 */ ["",		 "sounding2", 		"#2: Eindhoven", "Predicted SkewT*LogP Sounding Plot for Eindhoven"],
/* 38 */ ["",		 "sounding3", 		"#3: Groningen", "Predicted SkewT*LogP Sounding Plot for Groningen"],
/* 39 */ ["",		 "sounding4", 		"#4: Düsseldorf", "Predicted SkewT*LogP Sounding Plot for Düsseldorf"],
/* 40 */ ["",		 "sounding5", 		"#5: Bremen", "Predicted SkewT*LogP Sounding Plot for Bremen"],
/* 41 */ ["",		 "sounding6", 		"#6: Kassel", "Predicted SkewT*LogP Sounding Plot for Kassel"],
/* 42 */ ["",		 "sounding7", 		"#7: Hannover", "Predicted SkewT*LogP Sounding Plot for Hannover"],
/* 43 */ ["",		 "sounding8", 		"#8: Hamburg", "Predicted SkewT*LogP Sounding Plot for Hamburg"],
/* 44 */ ["",		 "sounding9", 		"#9: Erfurt", "Predicted SkewT*LogP Sounding Plot for Erfurt"],
/* 45 */ ["",		 "sounding10", 		"#10: Magdenburg", "Predicted SkewT*LogP Sounding Plot for Magdenburg"],
/* 46 */ ["",		 "sounding11", 		"#11: Brussel", "Predicted SkewT*LogP Sounding Plot for Brussel"],
/* 47 */ ["",		 "sounding12", 		"#12: Luxemburg", "Predicted SkewT*LogP Sounding Plot for Luxemburg"],
/* 48 */ ["",		 "sounding13", 		"#13: Frankfurt", "Predicted SkewT*LogP Sounding Plot for Frankfurt"],
/* 49 */ ["",		 "sounding14", 		"#14: Neurenberg", "Predicted SkewT*LogP Sounding Plot for Neurenberg"],
/* 50 */ ["",		 "sounding15", 		"#15: Lille", "Predicted SkewT*LogP Sounding Plot for Lille"],
/* 51 */ ["",		 "sounding18", 		"#18: Terlet", "SkewT*LogP Sounding Plot for Terlet"],
/* 52 */ ["",		 "sounding23", 		"#23: Lemelerveld", "SkewT*LogP Sounding Plot for Lemelerveld"],

/* 53 */ ["optionBoldRed",  "nope1", 				"- - - METEOGRAMS - - -", ""],
/* 54 */ ["",		 "meteogram#1",		"Meteogram for Terlet"],
/* 55 */ ["",		 "meteogram#2",		"Meteogram for Lemelerveld"],
/* 56 */ ["",		 "meteogram#3",		"Meteogram for Venlo"],
/* 57 */ ["",		 "meteogram#4",		"Meteogram for Soesterberg"],
/* 58 */ ["",		 "meteogram#5",		"Meteogram for Malden"],
/* 59 */ ["",		 "meteogram#6",		"Meteogram for Teuge"],
/* 60 */ ["",		 "meteogram#7",		"Meteogram for Langeveld"],
/* 61 */ ["",		 "meteogram#8",		"Meteogram for Leeuwarden"],
/* 62 */ ["",		 "meteogram#9",		"Meteogram for Veendam"],
/* 63 */ ["",		 "meteogram#10",	"Meteogram for Hoogeveen"],
/* 64 */ ["",		 "meteogram#11",	"Meteogram for De Voorst"],
/* 65 */ ["",		 "meteogram#12",	"Meteogram for Twente"],
/* 66 */ ["",		 "meteogram#13",	"Meteogram for Castricum"],
/* 67 */ ["",		 "meteogram#14",	"Meteogram for Deelen"],
/* 68 */ ["",		 "meteogram#15",	"Meteogram for Nistelrode"],
/* 69 */ ["",		 "meteogram#16",	"Meteogram for Volkel"],
/* 70 */ ["",		 "meteogram#17",	"Meteogram for De_Peel"],
/* 71 */ ["",		 "meteogram#18",	"Meteogram for Gilze-Rijen"],
/* 72 */ ["",		 "meteogram#19",	"Meteogram for Haamstede"],
/* 73 */ ["",		 "meteogram#20",	"Meteogram for Schinveld"],
/* 74 */ ["",		 "meteogram#21",	"Meteogram for Axel"],
/* 75 */ ["",		 "meteogram#22",	"Meteogram for Woensdrecht"],
/* 76 */ ["",		 "meteogram#23",	"Meteogram for Hilversum"],
/* 77 */ ["",		 "meteogram#24",	"Meteogram for Biddinghuizen"],
/* 78 */ ["",		 "meteogram#25",	"Meteogram for Noordkop"],
/* 79 */ ["",		 "meteogram#26",	"Meteogram for Schiedam"],
/* 80 */ ["",		 "meteogram#27",	"Meteogram for KNMI"],

/* 81 */ ["optionBoldRed",  "nope1", 				"- - - MODEL TOPOGRAPHY - - -", ""],

/* 82 */ ["",		 "topo", 					"Topography", "Topography"],

/* 83 */ ["",		 "grid", 					"Grid Map", "The Grid Map shows the grid boundaries of the RASP model"]

];

var	paramListFull  = [
	paramList[0],
	paramList[1],
	paramList[2],
	paramList[3],
	paramList[4],
	paramList[5],
	paramList[6],
	paramList[7],
	paramList[8],
	paramList[9],
	paramList[10],
	paramList[11],
	paramList[12],
	paramList[13],
	paramList[14],
	paramList[15],
	paramList[16],
	paramList[17],
	paramList[18],
	paramList[19],
	paramList[20],
	paramList[21],
	paramList[22],
	paramList[23],
	paramList[24],
	paramList[25],
	paramList[26],
	paramList[27],
	paramList[28],
	paramList[29],
	paramList[30],
	paramList[31],
	paramList[32],
	paramList[33],
	paramList[34],
	paramList[35],
	paramList[36],
	paramList[37],
	paramList[38],
	paramList[39],
	paramList[40],
	paramList[41],
	paramList[42],
	paramList[43],
	paramList[44],
	paramList[45],
	paramList[46],
	paramList[47],
	paramList[48],
	paramList[49],
	paramList[50],
	paramList[51],
	paramList[52],
	paramList[53],
	paramList[54],
	paramList[55],
	paramList[56],
	paramList[57],
	paramList[58],
	paramList[59],
	paramList[60],
	paramList[61],
	paramList[62],
	paramList[63],
	paramList[64],
	paramList[65],
	paramList[66],
	paramList[67],
	paramList[68],
	paramList[69],
	paramList[70],
	paramList[71],
	paramList[72],
	paramList[73],
	paramList[74],
	paramList[75],
	paramList[76],
	paramList[77],
	paramList[78],
	paramList[79],
	paramList[80],
	paramList[81],
	paramList[82],
	paramList[83]
	// Do NOT forget to have "," between each item
	// Last one must NOT have "," or YouKnowWho bombs
];

var paramListLite  = [
	paramList[0],	// 0
	paramList[2],	// 1
	paramList[6],	// 2
	paramList[8],	// 3
	paramList[12],	// 4
	paramList[13],	// 5
	paramList[16],	// 6
	paramList[17],	// 7
	paramList[18],	// 8
	paramList[19],	// 9
	paramList[26]	// pfd_tot
	// Do NOT forget to have "," between each item
	// Last one must NOT have "," or YouKnowWho bombs
];

