var meteograms = new Array();

meteograms["LAT"]
meteograms["LON"]
meteograms["NAM"]
meteograms["LOC"]

meteograms.LAT = new Array();
meteograms.LON = new Array();
meteograms.NAM = new Array();
meteograms.LOC = new Array();

// new start and end arrays for the meteogram locations per region
meteograms.REGION_START = new Array();
meteograms.REGION_END = new Array();

// follow same (strange) numbering as sitedata.ncl used in generation of the meteograms
meteograms.REGION_START[0] = 1;	 	//   1-100 Netherlands
meteograms.REGION_END[0]   = 30;
meteograms.REGION_START[1] = 101;	// 101-149 Belgium, 1
meteograms.REGION_END[1]   = 112;
meteograms.REGION_START[2] = 150;	// 150-200 Belgium, 2
meteograms.REGION_END[2]   = 155;
meteograms.REGION_START[3] = 201;	// 201-300 Germany
meteograms.REGION_END[3]   = 234;
meteograms.REGION_START[4] = 301;	// 301-400 Luxembourg
meteograms.REGION_END[4]   = 302;
meteograms.REGION_START[5] = 401;	// 401-500 France
meteograms.REGION_END[5]   = 405;
meteograms.REGION_START[6] = 406;	// 401-500 France
meteograms.REGION_END[6]   = 407;

// 1-100 Netherlands
// 1,Terlet,d2,5.9233,52.0567,
meteograms.LAT[1] = 52.0567;
meteograms.LON[1] = 5.9233;
meteograms.NAM[1] = "Terlet"
meteograms.LOC[1] = new L.latLng(meteograms.LAT[1], meteograms.LON[1]);

// 2,Lemelerveld,d2,6.3361,52.4667,
meteograms.LAT[2] = 52.4667;
meteograms.LON[2] = 6.3361;
meteograms.NAM[2] = "Lemelerveld"
meteograms.LOC[2] = new L.latLng(meteograms.LAT[2], meteograms.LON[2]);

// 3,Venlo,d2,6.2161,51.3630,
meteograms.LAT[3] = 51.3630;
meteograms.LON[3] = 6.2161;
meteograms.NAM[3] = "Venlo"
meteograms.LOC[3] = new L.latLng(meteograms.LAT[3], meteograms.LON[3]);

// 4,Soesterberg,d2,5.2761,52.1275,
meteograms.LAT[4] = 52.1275;
meteograms.LON[4] = 5.2761;
meteograms.NAM[4] = "Soesterberg"
meteograms.LOC[4] = new L.latLng(meteograms.LAT[4], meteograms.LON[4]);

// 5,Malden,d2,5.8805,51.7853,
meteograms.LAT[5] = 51.7853;
meteograms.LON[5] = 5.8805;
meteograms.NAM[5] = "Malden"
meteograms.LOC[5] = new L.latLng(meteograms.LAT[5], meteograms.LON[5]);

// 6,Teuge,d2,6.0467,52.2447,
meteograms.LAT[6] = 52.2447;
meteograms.LON[6] = 6.0467;
meteograms.NAM[6] = "Teuge"
meteograms.LOC[6] = new L.latLng(meteograms.LAT[6], meteograms.LON[6]);

// 7,Langeveld,d2,4.5136,52.2978,
meteograms.LAT[7] = 52.2978;
meteograms.LON[7] = 4.5136;
meteograms.NAM[7] = "Langeveld"
meteograms.LOC[7] = new L.latLng(meteograms.LAT[7], meteograms.LON[7]);

// 8,Leeuwarden,d2,5.7525,53.2253,
meteograms.LAT[8] = 53.2253;
meteograms.LON[8] = 5.7525;
meteograms.NAM[8] = "Leeuwarden"
meteograms.LOC[8] = new L.latLng(meteograms.LAT[8], meteograms.LON[8]);

// 9,Veendam,d2,6.8236,53.0844,
meteograms.LAT[9] = 53.0844;
meteograms.LON[9] = 6.8236;
meteograms.NAM[9] = "Veendam"
meteograms.LOC[9] = new L.latLng(meteograms.LAT[9], meteograms.LON[9]);

// 10,Hoogeveen,d2,6.5161,52.7308,
meteograms.LAT[10] = 52.7308;
meteograms.LON[10] = 6.5161;
meteograms.NAM[10] = "Hoogeveen"
meteograms.LOC[10] = new L.latLng(meteograms.LAT[10], meteograms.LON[10]);

// 11,De_Voorst,d2,5.9120,52.6842,
meteograms.LAT[11] = 52.6842;
meteograms.LON[11] = 5.9120;
meteograms.NAM[11] = "De_Voorst"
meteograms.LOC[11] = new L.latLng(meteograms.LAT[11], meteograms.LON[11]);

// 12,Twente,d2,6.8892,52.2758,
meteograms.LAT[12] = 52.2758;
meteograms.LON[12] = 6.8892;
meteograms.NAM[12] = "Twente"
meteograms.LOC[12] = new L.latLng(meteograms.LAT[12], meteograms.LON[12]);

// 13,Castricum,d2,4.6247,52.5364,
meteograms.LAT[13] = 52.5364;
meteograms.LON[13] = 4.6247;
meteograms.NAM[13] = "Castricum"
meteograms.LOC[13] = new L.latLng(meteograms.LAT[13], meteograms.LON[13]);

// 14,Deelen,d2,5.8719,52.0597,
meteograms.LAT[14] = 52.0597;
meteograms.LON[14] = 5.8719;
meteograms.NAM[14] = "Deelen"
meteograms.LOC[14] = new L.latLng(meteograms.LAT[14], meteograms.LON[14]);

// 15,Nistelrode,d2,5.5500,51.6831,
meteograms.LAT[15] = 51.6831;
meteograms.LON[15] = 5.5500;
meteograms.NAM[15] = "Nistelrode"
meteograms.LOC[15] = new L.latLng(meteograms.LAT[15], meteograms.LON[15]);

// 16,Volkel,d2,5.7081,51.6572,
meteograms.LAT[16] = 51.6572;
meteograms.LON[16] = 5.7081;
meteograms.NAM[16] = "Volkel"
meteograms.LOC[16] = new L.latLng(meteograms.LAT[16], meteograms.LON[16]);

// 17,De_Peel,d2,5.8558,51.5172,
meteograms.LAT[17] = 51.5172;
meteograms.LON[17] = 5.8558;
meteograms.NAM[17] = "De_Peel"
meteograms.LOC[17] = new L.latLng(meteograms.LAT[17], meteograms.LON[17]);

// 18,Gilze-Rijen,d2,4.9319,51.5675,
meteograms.LAT[18] = 51.5675;
meteograms.LON[18] = 4.9319;
meteograms.NAM[18] = "Gilze-Rijen"
meteograms.LOC[18] = new L.latLng(meteograms.LAT[18], meteograms.LON[18]);

// 19,Haamstede,d2,3.7128,51.7107,
meteograms.LAT[19] = 51.7107;
meteograms.LON[19] = 3.7128;
meteograms.NAM[19] = "Haamstede"
meteograms.LOC[19] = new L.latLng(meteograms.LAT[19], meteograms.LON[19]);

// 20,Schinveld,d2,6.0022,50.9814,
meteograms.LAT[20] = 50.9814;
meteograms.LON[20] = 6.0022;
meteograms.NAM[20] = "Schinveld"
meteograms.LOC[20] = new L.latLng(meteograms.LAT[20], meteograms.LON[20]);

// 21,Axel,d2,3.8933,51.2553,
meteograms.LAT[21] = 51.2553;
meteograms.LON[21] = 3.8933;
meteograms.NAM[21] = "Axel"
meteograms.LOC[21] = new L.latLng(meteograms.LAT[21], meteograms.LON[21]);

// 22,Woensdrecht,d2,4.3422,51.4489,
meteograms.LAT[22] = 51.4489;
meteograms.LON[22] = 4.3422;
meteograms.NAM[22] = "Woensdrecht"
meteograms.LOC[22] = new L.latLng(meteograms.LAT[22], meteograms.LON[22]);

// 23,Hilversum,d2,5.1470,52.1920,
meteograms.LAT[23] = 52.1920;
meteograms.LON[23] = 5.1470;
meteograms.NAM[23] = "Hilversum"
meteograms.LOC[23] = new L.latLng(meteograms.LAT[23], meteograms.LON[23]);

// 24,Biddinghuizen,d2,5.6742,52.4292,
meteograms.LAT[24] = 52.4292;
meteograms.LON[24] = 5.6742;
meteograms.NAM[24] = "Biddinghuizen"
meteograms.LOC[24] = new L.latLng(meteograms.LAT[24], meteograms.LON[24]);

// 25,Noordkop,d2,5.0056,52.8959,
meteograms.LAT[25] = 52.8959;
meteograms.LON[25] = 5.0056;
meteograms.NAM[25] = "Noordkop"
meteograms.LOC[25] = new L.latLng(meteograms.LAT[25], meteograms.LON[25]);

// 26,Schiedam,d2,4.38301,51.91280
meteograms.LAT[26] = 51.91280;
meteograms.LON[26] = 4.38301;
meteograms.NAM[26] = "Schiedam"
meteograms.LOC[26] = new L.latLng(meteograms.LAT[26], meteograms.LON[26]);

//27,KNMI,d2,5.17724,52.10044,
meteograms.LAT[27] = 52.10044;
meteograms.LON[27] = 5.17724;
meteograms.NAM[27] = "KNMI"
meteograms.LOC[27] = new L.latLng(meteograms.LAT[27], meteograms.LON[27]);

//28,Midden-Zeeland,d2,3.7306,51.5127,
meteograms.LAT[28] = 51.5127;
meteograms.LON[28] = 3.7306;
meteograms.NAM[28] = "Midden-Zeeland"
meteograms.LOC[28] = new L.latLng(meteograms.LAT[28], meteograms.LON[28]);

//29,Texel,d2,4.8306,53.1162,
meteograms.LAT[29] = 53.1162;
meteograms.LON[29] = 4.8306;
meteograms.NAM[29] = "Texel"
meteograms.LOC[29] = new L.latLng(meteograms.LAT[29], meteograms.LON[29]);

///////////////////////////////////////////////////////////////////////////////
// #101-200 Belgium
///////////////////////////////////////////////////////////////////////////////

// 101,Keiheuvel_Balen,d2,5.2208,51.1806,
meteograms.LAT[101] = 51.1806;
meteograms.LON[101] = 5.2208;
meteograms.NAM[101] = "Keiheuvel_Balen"
meteograms.LOC[101] = new L.latLng(meteograms.LAT[101], meteograms.LON[101]);

// 102,Zwartberg_Genk,d2,5.5264,51.0153,
meteograms.LAT[102] = 51.0153;
meteograms.LON[102] = 5.5264;
meteograms.NAM[102] = "Zwartberg_Genk"
meteograms.LOC[102] = new L.latLng(meteograms.LAT[102], meteograms.LON[102]);

// 103,Zutendaal,d2,5.5905,50.9475,
meteograms.LAT[103] = 50.9475;
meteograms.LON[103] = 5.5905;
meteograms.NAM[103] = "Zutendaal"
meteograms.LOC[103] = new L.latLng(meteograms.LAT[103], meteograms.LON[103]);

// 104,Kiewit_Hasselt,d2,5.3750,50.9703,
meteograms.LAT[104] = 50.9703;
meteograms.LON[104] = 5.3750;
meteograms.NAM[104] = "Kiewit_Hasselt"
meteograms.LOC[104] = new L.latLng(meteograms.LAT[104], meteograms.LON[104]);

// 105,Oostmalle_Zoersel,d2,4.7533,51.2647,
meteograms.LAT[105] = 51.2647;
meteograms.LON[105] = 4.7533;
meteograms.NAM[105] = "Oostmalle_Zoersel"
meteograms.LOC[105] = new L.latLng(meteograms.LAT[105], meteograms.LON[105]);

// 106,Brasschaat,d2,4.5025,51.3447,
meteograms.LAT[106] = 51.3447;
meteograms.LON[106] = 4.5025;
meteograms.NAM[106] = "Brasschaat"
meteograms.LOC[106] = new L.latLng(meteograms.LAT[106], meteograms.LON[106]);

// 107,Goetsenhoven_Tienen,d2,4.9578,50.7817,
meteograms.LAT[107] = 50.7817;
meteograms.LON[107] = 4.9578;
meteograms.NAM[107] = "Goetsenhoven_Tienen"
meteograms.LOC[107] = new L.latLng(meteograms.LAT[107], meteograms.LON[107]);

// 108,Schaffen_Diest,d2,5.0658,51.0042,
meteograms.LAT[108] = 51.0042;
meteograms.LON[108] = 5.0658;
meteograms.NAM[108] = "Schaffen_Diest"
meteograms.LOC[108] = new L.latLng(meteograms.LAT[108], meteograms.LON[108]);

// 109,Overboelare_Geraardsbergen,d2,3.8639,50.7555,
meteograms.LAT[109] = 50.7555;
meteograms.LON[109] = 3.8639;
meteograms.NAM[109] = "Overboelare_Geraardsbergen"
meteograms.LOC[109] = new L.latLng(meteograms.LAT[109], meteograms.LON[109]);

// 110,Wevelgem_Kortrijk,d2,3.2045,50.8172,
meteograms.LAT[110] = 50.8172;
meteograms.LON[110] = 3.2045;
meteograms.NAM[110] = "Wevelgem_Kortrijk"
meteograms.LOC[110] = new L.latLng(meteograms.LAT[110], meteograms.LON[110]);

// 111,Weelde,d2,4.9592,51.3942,
meteograms.LAT[111] = 51.3942;
meteograms.LON[111] = 4.9592;
meteograms.NAM[111] = "Weelde"
meteograms.LOC[111] = new L.latLng(meteograms.LAT[111], meteograms.LON[111]);

// Whoops, a sudden jump in the numbering... :-(

// 150,Verviers,d2,5.8536,50.5511,
meteograms.LAT[150] = 50.5511;
meteograms.LON[150] = 5.8536;
meteograms.NAM[150] = "Verviers"
meteograms.LOC[150] = new L.latLng(meteograms.LAT[150], meteograms.LON[150]);

// 151,Saint-Hubert,d2,5.4042,50.0358,
meteograms.LAT[151] = 50.0358;
meteograms.LON[151] = 5.4042;
meteograms.NAM[151] = "Saint-Hubert"
meteograms.LOC[151] = new L.latLng(meteograms.LAT[151], meteograms.LON[151]);

// 152,Namur,d2,4.7705,50.4897,
meteograms.LAT[152] = 50.4897;
meteograms.LON[152] = 4.7705;
meteograms.NAM[152] = "Namur"
meteograms.LOC[152] = new L.latLng(meteograms.LAT[152], meteograms.LON[152]);

// 153,Cerfontaine,d2,4.3872,50.1528,
meteograms.LAT[153] = 50.1528;
meteograms.LON[153] = 4.3872;
meteograms.NAM[153] = "Cerfontaine"
meteograms.LOC[153] = new L.latLng(meteograms.LAT[153], meteograms.LON[153]);

// 154,Tournai_Maubray,d2,3.4978,50.5314,
meteograms.LAT[154] = 50.5314;
meteograms.LON[154] = 3.4978;
meteograms.NAM[154] = "Tournai_Maubray"
meteograms.LOC[154] = new L.latLng(meteograms.LAT[154], meteograms.LON[154]);

///////////////////////////////////////////////////////////////////////////////
//#201-300 Germany
///////////////////////////////////////////////////////////////////////////////

// 201,Kamp-Lintfort,d2,6.5369,51.5295,
meteograms.LAT[201] = 51.5295;
meteograms.LON[201] = 6.5369;
meteograms.NAM[201] = "Kamp-Lintfort"
meteograms.LOC[201] = new L.latLng(meteograms.LAT[201], meteograms.LON[201]);

// 202,Dinslaken,d2,6.86102,51.61577,
meteograms.LAT[202] = 51.61577;
meteograms.LON[202] = 6.86102;
meteograms.NAM[202] = "Dinslaken"
meteograms.LOC[202] = new L.latLng(meteograms.LAT[202], meteograms.LON[202]);

// 203,Borkenberge,d2,7.2889,51.7785,
meteograms.LAT[203] = 51.7785;
meteograms.LON[203] = 7.2889;
meteograms.NAM[203] = "Borkenberge"
meteograms.LOC[203] = new L.latLng(meteograms.LAT[203], meteograms.LON[203]);

// 204,Porta_Westfalica,d2,8.8597,52.2211,
meteograms.LAT[204] = 52.2211;
meteograms.LON[204] = 8.8597;
meteograms.NAM[204] = "Porta_Westfalica"
meteograms.LOC[204] = new L.latLng(meteograms.LAT[204], meteograms.LON[204]);

// 205,Ithwiesen,d2,9.6628,51.9511,
meteograms.LAT[205] = 51.9511;
meteograms.LON[205] = 9.6628;
meteograms.NAM[205] = "Ithwiesen"
meteograms.LOC[205] = new L.latLng(meteograms.LAT[205], meteograms.LON[205]);

// 206,Dahlemer_Binz,d2,6.5289,50.4055,
meteograms.LAT[206] = 50.4055;
meteograms.LON[206] = 6.5289;
meteograms.NAM[206] = "Dahlemer_Binz"
meteograms.LOC[206] = new L.latLng(meteograms.LAT[206], meteograms.LON[206]);

// 207,Oerlinghausen,d2,8.6620,51.9325,
meteograms.LAT[207] = 51.9325;
meteograms.LON[207] = 8.6620;
meteograms.NAM[207] = "Oerlinghausen"
meteograms.LOC[207] = new L.latLng(meteograms.LAT[207], meteograms.LON[207]);

// 208,Kell,d2,6.8403,49.6217,
meteograms.LAT[208] = 49.6217;
meteograms.LON[208] = 6.8403;
meteograms.NAM[208] = "Kell"
meteograms.LOC[208] = new L.latLng(meteograms.LAT[208], meteograms.LON[208]);

// 209,Daun,d2,6.8578,50.1758,
meteograms.LAT[209] = 50.1758;
meteograms.LON[209] = 6.8578;
meteograms.NAM[209] = "Daun"
meteograms.LOC[209] = new L.latLng(meteograms.LAT[209], meteograms.LON[209]);

// 210,Wesel,d2,6.5958,51.6628,
meteograms.LAT[210] = 51.6628;
meteograms.LON[210] = 6.5958;
meteograms.NAM[210] = "Wesel"
meteograms.LOC[210] = new L.latLng(meteograms.LAT[210], meteograms.LON[210]);

// 211,Emmerich,d2,6.2744,51.8222,
meteograms.LAT[211] = 51.8222;
meteograms.LON[211] = 6.2744;
meteograms.NAM[211] = "Emmerich"
meteograms.LOC[211] = new L.latLng(meteograms.LAT[211], meteograms.LON[211]);

// 212,Kleve,d2,6.2992,51.7694,
meteograms.LAT[212] = 51.7694;
meteograms.LON[212] = 6.2992;
meteograms.NAM[212] = "Kleve"
meteograms.LOC[212] = new L.latLng(meteograms.LAT[212], meteograms.LON[212]);

// 213,Langenveld_Wiescheid,d2,6.9853,51.1408,
meteograms.LAT[213] = 51.1408;
meteograms.LON[213] = 6.9853;
meteograms.NAM[213] = "Langenveld_Wiescheid"
meteograms.LOC[213] = new L.latLng(meteograms.LAT[213], meteograms.LON[213]);

// 214,Brilon,d2,8.6421,51.4029,
meteograms.LAT[214] = 51.4029;
meteograms.LON[214] = 8.6421;
meteograms.NAM[214] = "Brilon"
meteograms.LOC[214] = new L.latLng(meteograms.LAT[214], meteograms.LON[214]);

// 215,Oeventrop,d2,8.1444,51.3961,
meteograms.LAT[215] = 51.3961;
meteograms.LON[215] = 8.1444;
meteograms.NAM[215] = "Oeventrop"
meteograms.LOC[215] = new L.latLng(meteograms.LAT[215], meteograms.LON[215]);

// 216,Wasserkuppe,d2,9.9536,50.4989,
meteograms.LAT[216] = 50.4989;
meteograms.LON[216] = 9.9536;
meteograms.NAM[216] = "Wasserkuppe"
meteograms.LOC[216] = new L.latLng(meteograms.LAT[216], meteograms.LON[216]);

// 217,Grefrath,d2,6.3597,51.3342,
meteograms.LAT[217] = 51.3342;
meteograms.LON[217] = 6.3597;
meteograms.NAM[217] = "Grefrath"
meteograms.LOC[217] = new L.latLng(meteograms.LAT[217], meteograms.LON[217]);

// 218,Bohmte,d2,8.3280,52.3511,
meteograms.LAT[218] = 52.3511;
meteograms.LON[218] = 8.3280;
meteograms.NAM[218] = "Bohmte"
meteograms.LOC[218] = new L.latLng(meteograms.LAT[218], meteograms.LON[218]);

// 219,Borghorst_Fuecht,d2,7.4519,52.1503,
meteograms.LAT[219] = 52.1503;
meteograms.LON[219] = 7.4519;
meteograms.NAM[219] = "Borghorst_Fuecht"
meteograms.LOC[219] = new L.latLng(meteograms.LAT[219], meteograms.LON[219]);

// 220,Quakenbruck,d2,7.9264,52.6631,
meteograms.LAT[220] = 52.6631;
meteograms.LON[220] = 7.9264;
meteograms.NAM[220] = "Quakenbruck"
meteograms.LOC[220] = new L.latLng(meteograms.LAT[220], meteograms.LON[220]);

// 221,Perleberg,d2,11.8181,53.0705,
meteograms.LAT[221] = 53.0705;
meteograms.LON[221] = 11.8181;
meteograms.NAM[221] = "Perleberg"
meteograms.LOC[221] = new L.latLng(meteograms.LAT[221], meteograms.LON[221]);

// 222,Stendal_Borstel,d2,11.8200,52.6289,
meteograms.LAT[222] = 52.6289;
meteograms.LON[222] = 11.8200;
meteograms.NAM[222] = "Stendal_Borstel"
meteograms.LOC[222] = new L.latLng(meteograms.LAT[222], meteograms.LON[222]);

// 223,Goslar_Bollrich,d2,10.4592,51.9047,
meteograms.LAT[223] = 51.9047;
meteograms.LON[223] = 10.4592;
meteograms.NAM[223] = "Goslar_Bollrich"
meteograms.LOC[223] = new L.latLng(meteograms.LAT[223], meteograms.LON[223]);

// 224,Kronach_Kreuzbe,d2,11.3589,50.2436,
meteograms.LAT[224] = 50.2436;
meteograms.LON[224] = 11.3589;
meteograms.NAM[224] = "Kronach_Kreuzbe"
meteograms.LOC[224] = new L.latLng(meteograms.LAT[224], meteograms.LON[224]);

// 225,Witzenhausen,d2,9.8247,51.3500,
meteograms.LAT[225] = 51.3500;
meteograms.LON[225] = 9.8247;
meteograms.NAM[225] = "Witzenhausen"
meteograms.LOC[225] = new L.latLng(meteograms.LAT[225], meteograms.LON[225]);

// 226,Karlstadt_Saupur,d2,9.9714,49.9714,
meteograms.LAT[226] = 49.9714;
meteograms.LON[226] = 9.9714;
meteograms.NAM[226] = "Karlstadt_Saupur"
meteograms.LOC[226] = new L.latLng(meteograms.LAT[226], meteograms.LON[226]);

// 227,Oeventrop,d2,8.1444,51.3961,
meteograms.LAT[227] = 51.3961;
meteograms.LON[227] = 8.1444;
meteograms.NAM[227] = "Oeventrop"
meteograms.LOC[227] = new L.latLng(meteograms.LAT[227], meteograms.LON[227]);


// 228,Wilssche,d2,10.4650,52.5250,
meteograms.LAT[228] = 52.5250;
meteograms.LON[228] = 10.4650;
meteograms.NAM[228] = "Wilssche";
meteograms.LOC[228] = new L.latLng(52.5250, 10.4650);

// 229,Ansbach_Petersdorf,d2,10.6850,49.3608,
meteograms.LAT[229] = 49.3608;
meteograms.LON[229] = 10.6850;
meteograms.NAM[229] = "Ansbach_Petersdorf";
meteograms.LOC[229] = new L.latLng(49.3608, 10.6850);

// 230,Celle_Arloh,d2,10.1128,52.6881,
meteograms.LAT[230] = 52.6881;
meteograms.LON[230] = 10.1128;
meteograms.NAM[230] = "Celle_Arloh";
meteograms.LOC[230] = new L.latLng(52.6881, 10.1128);

// 231,Lueneburg,d2,10.4586,53.2483,
meteograms.LAT[231] = 53.2483;
meteograms.LON[231] = 10.4586;
meteograms.NAM[231] = "Lueneburg";
meteograms.LOC[231] = new L.latLng(53.2483, 10.4586);

// 232,Grosse_Hoehe,d2,8.5719,52.9858,
meteograms.LAT[232] = 52.9858;
meteograms.LON[232] = 8.5719;
meteograms.NAM[232] = "Grosse_Hoehe";
meteograms.LOC[232] = new L.latLng(52.9858, 8.5719);

// 233,Homberg,d2,9.0206,50.7475,
meteograms.LAT[233] = 50.7475;
meteograms.LON[233] = 9.0206;
meteograms.NAM[233] = "Homberg";
meteograms.LOC[233] = new L.latLng(50.7475, 9.0206);

///////////////////////////////////////////////////////////////////////////////
//#301-400 Luxembourg
///////////////////////////////////////////////////////////////////////////////
//301,Useldange,d2,5.9665,49.7682,
meteograms.LAT[301] = 49.7682;
meteograms.LON[301] = 5.9665;
meteograms.NAM[301] = "Useldange"
meteograms.LOC[301] = new L.latLng(meteograms.LAT[301], meteograms.LON[301]);

///////////////////////////////////////////////////////////////////////////////
//#401-500 France
///////////////////////////////////////////////////////////////////////////////

//401,Sedan-Douzy,d2,5.0361,49.6593,
meteograms.LAT[401] = 49.6593;
meteograms.LON[401] = 5.0361;
meteograms.NAM[401] = "Sedan-Douzy"
meteograms.LOC[401] = new L.latLng(meteograms.LAT[401], meteograms.LON[401]);

//402,Maubeuge,d2,4.0330,50.3137,
meteograms.LAT[402] = 50.3137;
meteograms.LON[402] = 4.0330;
meteograms.NAM[402] = "Maubeuge"
meteograms.LOC[402] = new L.latLng(meteograms.LAT[301], meteograms.LON[301]);

//403,Cambrai,d2,3.2624,50.1396,
meteograms.LAT[403] = 50.1396;
meteograms.LON[403] = 3.2624;
meteograms.NAM[403] = "Cambrai"
meteograms.LOC[403] = new L.latLng(meteograms.LAT[403], meteograms.LON[403]);

//404,Saint-Quentin-Roupy,d2,3.2057,49.8162,
meteograms.LAT[404] = 49.8162;
meteograms.LON[404] = 3.2057;
meteograms.NAM[404] = "Saint-Quentin-Roupy"
meteograms.LOC[404] = new L.latLng(meteograms.LAT[404], meteograms.LON[404]);

//405,Arras,d2,2.8032,50.3240,
//meteograms.LAT[405] = 50.3240;
//meteograms.LON[405] = 2.8032;
//meteograms.NAM[405] = "Arras"
//meteograms.LOC[405] = new L.latLng(meteograms.LAT[405], meteograms.LON[405]);

//406,Lille_Bondues,d2,3.0761,50.6873,
meteograms.LAT[406] = 50.6873;
meteograms.LON[406] = 3.0761;
meteograms.NAM[406] = "Lille_Bondues"
meteograms.LOC[406] = new L.latLng(meteograms.LAT[406], meteograms.LON[406]);
