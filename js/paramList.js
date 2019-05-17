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

/* 1 */ ["",		 "wstar_bsratio",	"Thermal Updraft Velocity & B/S Ratio", "A composite plot displaying the Thermal Updraft Velocity contours in colors overlaid by a stipple representing the Buoyancy/Shear Ratio. The stipple is heavy for B/S Ratios 0-4 and light for B/S Ratios 4-7. The intent is to mark regions where a small B/S Ratio will make thermals difficult (or impossible) to work, though that depends upon pilot skill and circling radius"],

/* 2 */ ["optionBoldBlue", "wstar",					"Thermal Updraft Velocity (W*)", "Average dry thermal updraft strength near mid-BL height.  Subtract glider descent rate to get average vario reading for cloudless thermals.  Updraft strengths will be stronger than this forecast if convective clouds are present, since cloud condensation adds buoyancy aloft (i.e. this neglects cloudsuck).  W* depends upon both the surface heating and the BL depth"],

/* 3 */ ["",		 "bsratio",				"Buoyancy/Shear Ratio", "Dry thermals may be broken up by vertical wind shear (i.e. wind changing with height) and unworkable if B/S ratio is 5 or less.  [Though hang-gliders can soar with smaller B/S values than can sailplanes.]  If convective clouds are present, the actual B/S ratio will be larger than calculated here due to the neglect of 'cloudsuck'.  [This parameter is truncated at 10 for plotting.]"],

/* 4 */ ["",		 "hbl",						"BL Top", "Height of the top of the mixing layer, which for thermal convection is the average top of a dry thermal.  Over flat terrain, maximum thermalling heights will be lower due to the glider descent rate and other factors.  In the presence of clouds (which release additional buoyancy aloft, creating cloudsuck) the updraft top will be above this forecast, but the maximum thermalling height will then be limited by the cloud base. Further, when the mixing results from shear turbulence rather than thermal mixing this parameter is not useful for glider flying.  NB: this BL Top is not the height where the Thermal Index (TI) is zero, which is a criteria used by many simple determinations of the BL top - instead, the RASP BL Top uses a more sophisticated BL Top criteria based on turbulent fluxes"],

/* 5 */ ["",		 "hglider",				"Thermalling Height", "This is the minimum of the height at which updraft strength falls below 175 fpm (0.9 m/s), the Cu Cloudbase and the OverDevelopment Cloudbase. It might thus indicate the maximum soaring height which is achievable in thermals, clear of cloud."],

/* 6 */ ["",		 "bltopvariab",		"Thermal Height Uncertainty", "This parameter estimates the uncertainty (variability) of the BL Top height prediction which can result from meteorological variations.  Specifically, it gives the expected increase of a BL Top height based on a Thermal Index (TI) = 0 criteria should the actual surface temperature be 4 °F warmer than forecast.  Larger values indicate greater uncertainty/variability and thus better thermalling over local 'hot spots' or small-scale topography not resolved by the model.  But larger values also indicate greater sensitivity to error in the predicted surface temperature, so actual conditions have a greater likelihood of differing from those predicted.  Small values often result from the presence of a stable (inversion) layer capping and limiting thermal growth.  This parameter is most easily utilized through relative values, i.e. by first determining a 'typical' value for a location and subsequently noting whether predictions for a given day are for more/less uncertainty than is typical."],

/* 7 */ ["optionBoldBlue", "experimental1",	"Ht of Critical Updraft Strength", "This parameter estimates the height at which the average dry updraft strength drops below 175 fpm or 0.9 m/s and is expected to give better quantitative numbers for the maximum cloudless thermalling height than the BL Top height forecast, especially when mixing results from vertical wind shear rather than thermals.  (Note: the present assumptions tend to underpredict the max. thermalling height for dry conditions.) In the presence of clouds the maximum thermalling height may instead be limited by the cloud base. Being for dry thermals, this parameter omits the effect of cloudsuck"],

/* 8 */ ["",		 "zwblmaxmin",		"MSL Height of max/min Wbl", "Height at which the max / min of the vertical velocity in the Boundary Layer occurs, i.e. of \"BL Max Up/Down (Convergence)\" (qv)"],

/* 9 */ ["optionBoldBlue", "sfcsunpct",			"Normalized Sfc. Sun", "The 'Solar Radiation' actually reaching the surface divided by the amount of solar radiation which would reach the surface in a dry atmosphere (i.e. in the absence of clouds and water vapor), expressed as a percentage.  This parameter indicates the degree of cloudiness, i.e. where clouds limit the sunlight reaching the surface."],

/* 10 */ ["",		 "sfctemp",				"Sfc.Temperature", "The temperature at a height of 2m above ground level.  This can be compared to observed surface temperatures as an indication of model simulation accuracy; e.g. if observed surface temperatures are significantly below those forecast, then soaring conditions will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 11 */ ["",		 "sfcdewpt", 			"Sfc.Dewpoint", "The dew point temperature at a height of 2m above ground level.  This can be compared to observed surface dew point temperatures as an indication of model simulation accuracy; e.g. if observed surface dew point temperatures are significantly below those forecast, then BL cloud formation will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 12 */ ["optionBoldRed",  "nope1", 				"- - - WIND PARAMETERS - - -", ""],

/* 13 */ ["optionBoldBlue", "sfcwind0", 			"Sfc.Wind (2m)", "The speed and direction of the wind 2m above the ground.  Speed is depicted by different colors and direction by streamlines.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 14 */ ["",		 "sfcwind", 			"Sfc.Wind (10m)", "The speed and direction of the wind at 10m above the ground.  Speed is depicted by different colors and direction by streamlines.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation."],

/* 15 */ ["optionBoldBlue", "blwind", 				"BL Avg. Wind", "The speed and direction of the vector-averaged wind in the BL.  This prediction can be misleading if there is a large change in wind direction through the BL (for a complex wind profile, no single number is an adequate descriptor!)."],

/* 16 */ ["",		 "bltopwind", 		"Wind at BL Top", "The speed and direction of the wind at the top of the BL.  Speed is depicted by different colors and direction by streamlines."],

/* 17 */ ["",		 "blwindshear", 	"BL Wind Shear", "The vertical change in wind through the BL, specifically the magnitude of the vector wind difference between the top and bottom of the BL.  Note that this represents vertical wind shear and does not indicate so-called 'shear lines' (which are horizontal changes of wind speed/direction)."],

/* 18 */ ["optionBoldBlue", "wblmaxmin", 		"BL Max. Up/Down (Convergence)", "Maximum grid-area-averaged extensive upward or downward motion within the BL as created by horizontal wind convergence.  Positive convergence is associated with local small-scale convergence lines (often called 'shear lines' by pilots, which are horizontal changes of wind speed/direction) - however, the actual size of such features is much smaller than can be resolved by the model so only stronger ones will be forecast and their predictions are subject to much error.  If CAPE is also large, thunderstorms can be triggered.  Negative convergence (divergence) produces subsiding vertical motion, creating low-level inversions which limit thermalling heights.  This parameter can be noisy, so users should be wary.  For a grid resolution of 12km or better convergence lines created by terrain are commonly predicted - sea-breeze predictions can also be found for strong cases, though they are best resolved by smaller-resolution grids."],

/* 19 */ ["optionBoldRed",  "nope1", 				"- - - CLOUD PARAMETERS - - -", ""],

/* 20 */ ["optionBoldBlue", "zsfclclmask", 	"Cu Cloudbase where CuPotential > 0", "This plot is a combination of the value of the 'Cumulus Potential for non-extensive puffy cloud' (LCL - which indicates areas where cloud may form) and the 'Lifted Condensation Level' (the level to which humid air must rise to form cloud). It thus depicts the Cumulus Cloudbase at locations where cumulus may form and so alleviates the need to look at both Cumulus Potential and Cumulus Cloudbase plots. Note that the threshold Cumulus Potential should be empirically determined for your site, which has not been done for the Netherlands: it is assumed to approximate to the theoretical value of zero.  For locations where the actual threshold is greater than zero, as is often the case, this depiction will over-estimate the extent of the cumulus region."],

/* 21 */ ["optionBoldBlue", "zblclmask", 		"OD Cloudbase where ODpotential > 0", "Combining the previous two parameters, this depicts the OvercastDevelopment (OD) Cloudbase only at locations where the OD Potential parameter is positive.  This single plot can be used, instead of needing to look at both the OD Potential and OD Cloudbase plots, if the threshold OD Potential empirically determined for your site approximately equals the theoretical value of zero."],

/* 22 */ ["",		 "blcloudpct", 		"BL Cloud Cover", "This parameter provides an additional means of evaluating the formation of clouds within the BL and might be used either in conjunction with or instead of the other cloud prediction parameters.  It assumes a very simple relationship between cloud cover percentage and the maximum relative humidity within the BL.  The cloud base height is not predicted, but is expected to be below the BL Top height.  DrJack does not have a lot of faith in this prediction, since the formula used is so simple, and expects its predictions to be very approximate - but other meteorologists have used it and it is better than nothing.  Note: Since The the 'BL Cloud Cover', 'Cumulus Potential', and 'BL Extensive CloudBase' are based upon fundamentally different model predictions -- respectively the predicted maximum moisture in the BL, the predicted surface moisture, and an explicit cloud-water prediction -- they can yield somewhat differing predictions, e.g. the 'Cumulus Potential' can predict puffy cloud formation when the 'BL Cloud Cover' is zero or vice versa."],

/* 23 */ ["",		 "rain1", 				"Rain", "Rain accumulated over the last hour. Note that this requires a forecast for the previous hour, so it is not possible to plot this parameter until 1 hour after the first forecast for the day."],

/* 24 */ ["",		 "cape", 					"CAPE", "Convective Available Potential Energy indicates the atmospheric stability affecting deep convective cloud formation above the BL.  A higher value indicates greater potential instability, larger updraft velocities within deep convective clouds, and greater potential for thunderstorm development (since a trigger is needed to release that potential).  Note that thunderstorms may develop in regions of high CAPE and then get transported downwind to regions of lower CAPE.  Also, locations where both convergence and CAPE values are high can be subject to explosive thunderstorm development."],

/* 25 */ ["optionBoldRed",  "nope1", 				"- - - WAVE PARAMETERS - - -", ""],

/* 26 */ ["",		 "press955", 			"Vertical Velocity at 955mb", "Vertical velocity at a constant pressure level of 955mb (ca. 500m AMSL), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 27 */ ["",		 "press899", 			"Vertical Velocity at 899mb", "Vertical velocity at a constant pressure level of 899mb (ca. 1000m AMSL), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 28 */ ["",		 "press846", 			"Vertical Velocity at 846mb", "Vertical velocity at a constant pressure level of 846mb (ca. 1500m AMSL), plus wind speed/direction barbs.  [846mb presure level is approximately at 5000 ft AMSL or 1500 m AMSL.]  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 29 */ ["",		 "press795", 			"Vertical Velocity at 795mb", "Vertical velocity at a constant pressure level of 795mb (ca. 2000m AMSL), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 30 */ ["",		 "press701", 			"Vertical Velocity at 701mb", "Vertical velocity at a constant pressure level of 701mb (ca. 3000m AMSL), plus wind speed/direction barbs. Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 31 */ ["",		 "press616", 			"Vertical Velocity at 616mb", "Vertical velocity at a constant pressure level of 616mb (ca. 4000m AMSL), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 32 */ ["",		 "press540", 			"Vertical Velocity at 540mb", "Vertical velocity at a constant pressure level of 540mb (ca. 5000m AMSL), plus wind speed/direction barbs.  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"],

/* 33 */ ["optionBoldRed",  "nope1", 				"- - - SOUNDINGS - - -", ""],
/* 34 */ ["",		 "sounding1", 		"#1: Amsterdam", "Voorspelde SkewT*LogP Sounding Grafiek voor Amsterdam"],
/* 35 */ ["",		 "sounding2", 		"#2: Eindhoven", "Voorspelde SkewT*LogP Sounding Grafiek voor Eindhoven"],
/* 36 */ ["",		 "sounding3", 		"#3: Groningen", "Voorspelde SkewT*LogP Sounding Grafiek voor Groningen"],
/* 37 */ ["",		 "sounding4", 		"#4: Düsseldorf", "Voorspelde SkewT*LogP Sounding Grafiek voor Düsseldorf"],
/* 38 */ ["",		 "sounding5", 		"#5: Bremen", "Voorspelde SkewT*LogP Sounding Grafiek voor Bremen"],
/* 39 */ ["",		 "sounding6", 		"#6: Kassel", "Voorspelde SkewT*LogP Sounding Grafiek voor Kassel"],
/* 40 */ ["",		 "sounding7", 		"#7: Hannover", "Voorspelde SkewT*LogP Sounding Grafiek voor Hannover"],
/* 41 */ ["",		 "sounding8", 		"#8: Hamburg", "Voorspelde SkewT*LogP Sounding Grafiek voor Hamburg"],
/* 42 */ ["",		 "sounding9", 		"#9: Erfurt", "Voorspelde SkewT*LogP Sounding Grafiek voor Erfurt"],
/* 43 */ ["",		 "sounding10", 		"#10: Magdenburg", "Voorspelde SkewT*LogP Sounding Grafiek voor Magdenburg"],
/* 44 */ ["",		 "sounding11", 		"#11: Brussel", "Voorspelde SkewT*LogP Sounding Grafiek voor Brussel"],
/* 45 */ ["",		 "sounding12", 		"#12: Luxemburg", "Voorspelde SkewT*LogP Sounding Grafiek voor Luxemburg"],
/* 46 */ ["",		 "sounding13", 		"#13: Frankfurt", "Voorspelde SkewT*LogP Sounding Grafiek voor Frankfurt"],
/* 47 */ ["",		 "sounding14", 		"#14: Neurenberg", "Voorspelde SkewT*LogP Sounding Grafiek voor Neurenberg"],
/* 48 */ ["",		 "sounding15", 		"#15: Lille", "Voorspelde SkewT*LogP Sounding Grafiek voor Lille"],
/* 49 */ ["",		 "sounding23", 		"#23: Lemelerveld", "Voorspelde SkewT*LogP Sounding Grafiek voor Lemelerveld"],

/* 50 */ ["optionBoldRed",  "nope1", 				"- - - MODEL TOPOGRAPHY - - -", ""],

/* 51 */ ["",		 "topo", 					"Topography", "Topography"],

/* 52 */ ["optionBoldRed",  "nope1", 				"- - - Potential Flight Distance - - -", ""],

/* 53 */ ["optionBoldBlue",		 "pfd_tot",		"Potential flight distance", "De potentiele vliegafstand over de berekende weersvoorspellingsperiode voor een Discus met 100 liter waterballast in kilometers. Hierbij is de 'Thermieksterkte zonder eigen dalen' minus 1,15 m/s (bij benadering het eigen-dalen met water in de bocht) gebruikt als de thermieksterkte. Deze thermieksterkte en een Discus polaire (met 100 liter water) zijn gebruikt om met Reichmann's formules de gemiddelde overlandsnelheid, ofwel de vliegafstand, te berekenen per half uur. Vervolgens zijn deze opgeteld over de dag. Hierbij zijn geen weerscorrecties toegepast. Correcties die hadden kunnen worden toegepast zijn: het aftrekken van 0,4 m/s van de thermieksterkte om rekening te houden met tegenwind en of een bepaalde drempelwaarde, het halveren van de vliegafstand bij blauwe thermiek, het voor iedere achtse bewolking boven de 4/8 de vliegafstand met 25% te verminderen, als thermieksterkte 0 aanhouden bij een cumulus wolkenbasis onder de 700 meter en als thermieksterkte 0 aanhouden bij blauwe thermiek met een basis onder de 900 meter. Uit enkele OLC-vergelijkingen kan bij een doorsnee blauwe thermiekdag rond de 50% van de berekende 'Potentiele vliegafstand' worden aangehouden en bij een doorsnee dag met cumuluswolken rond de 75%. Samengevat geeft de 'Potentiele vliegafstand' een eerste indruk van de vliegcondities in verschillende gebieden over de gehele dag en wordt empirische evaluatie van deze indicator geadviseerd."],
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
	paramList[53]
	// Do NOT forget to have "," between each item
	// Last one must NOT have "," or YouKnowWho bombs
];

var paramListLite  = [
	paramList[0],
	paramList[2],
	paramList[7],
	paramList[9],
	paramList[13],
	paramList[15],
	paramList[18],
	paramList[19],
	paramList[20],
	paramList[21],
	paramList[53],
	// Do NOT forget to have "," between each item
	// Last one must NOT have "," or YouKnowWho bombs
];
