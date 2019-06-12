#! /usr/bin/perl -w
if ( $#ARGV == -1 || $ARGV[0] eq '-?' ) {
#-----------------adescription1---------------------------------------------------------
print "Output mass gridpt(s) i,j for arguments (comma OR space can be delimiter): REGION grid# lat1 lon1 lat2 lon2 ... \n";
print "  option: preceeding arguments with -v gives verbose printout\n";
print "  option: preceeding arguments with -n gives nearest integer printout\n";
print "  uses RASP grid parameters in namelist.wps _OR_ wrfsi.nl \$1 (\$1=REGIONXYZ uses deduced regional namelist.wps file) \n";
print "  input grid# can be 1,2,3 or d1,d2,w2 \n";
print "  input W longitude can be negative or > 180 \n";
print "  output grid I,J is non-integer decimal - note: (1,1)=SWcorner \n";
print "  input/output points are _not_ confined to actual grid limits \n";
print "eg: ' latlon2ij.pl PANOCHE 2 36.361 -121.264 37.417 -120.867' OUTPUTS '17.66 30.66 40.34 51.34' \n";
exit 0; }
########################################################################################
### Coded by:  Jack Glendening  drjack@drjack.info  July 2006
### Modified to also use namelist.wps paul.scorer01@gmail.com   Oct 2017
########################################################################################
### FOR DEBUG MODE: run with -d flag  (but not for neptune)
### In debug mode, set package name + local variables so X,V don't show "main" variables, ie:
# package Main; local ($a,$b,...);
### To enable verbose diagnostics (but not for CRAY):
#   use diagnostics;
### To restrict unsafe constructs (vars,refs,subs)
###    vars requires variables to be declared with "my" or fully qualified or imported
###    refs generates error if symbolic references uses instead of hard refs
###    subs requires subroutines to be predeclared
#    use strict;
### To provide aliases for buit-in punctuation variables (p403)
    use English;
### To eliminate old SGI files from library path  (done at _compile_ time)
    no lib '/usr/lib/perl';
###############################################################################

local $WEB_ROOT_FOLDER="/home/davidrasp/public_html/RASPViewer";

### FOR INPUT LAT,LONG PRINT (FLOAT) I,J OF LAMBERT GRID
### FIRST CALC FROM MOAD CENTRAL POINT, THEN SHIFT TO ACTUAL GRID
### converted from RUC latlon2gridpt.pl
### *NB* some odd-looking offset choices due to need for *mass* point lat/longs
###      results agree with wrfout lat/lon => arrays of size (xdim-1)x(ydim-1)
### TRY TO KEEP PARALLELISM WITH ij2latlon.pl

### PARSE ARGUMENTS
  ### allow for -v option for verbose printout
  if( $ARGV[0] ne '-v' )  { $LPRINT = 0 ; }
  else                    { $LPRINT = 1 ; shift; }
  ### -n option: nearest integer printout
  if ( $ARGV[0] ne '-n' ) { $LNINT = 0 ; }
  else                    { $LNINT = 1 ; shift; }

  ### set argument parameters
  ### convert comma-separated-variables into array
  if ( $ARGV[0] =~ m/,/ ) {
    @alatlon = split ',', $ARGV[0] ;
    $LCOMMA = 1;
  }
  else {
    @alatlon = @ARGV ;
    $LCOMMA = 0;
  }
  ### now parse args
  local $wpsfilename ;
  local $wrfsifilename ;
  my $region = shift @alatlon;
  my $kgrid = shift @alatlon;
  ### allow for grid specification ala d1,d2,w1,w2
  if(    $kgrid eq 'd1' ) { $kgrid = 1; }
  elsif( $kgrid eq 'd2' ) { $kgrid = 2; }
  elsif( $kgrid eq 'w1' ) { $kgrid = 2; }
  elsif( $kgrid eq 'w2' ) { $kgrid = 3; }
  #4test: print "alatlon[0] alatlon[1]= $alatlon[0] $alatlon[1]  \n";

### allow full filename or look for namelist.wps or wrfsi.nl in $region dir
if( $region !~ m|/| ) { 
#  $wpsfilename = "$WEB_ROOT_FOLDER/${region}/namelist.wps";
  $wpsfilename = "$WEB_ROOT_FOLDER/cgi-bin/data/namelist.wps";
  if(! -r $wpsfilename){
    undef $wpsfilename; 
#    $wrfsifilename = "$WEB_ROOT_FOLDER/${region}/wrfsi.nl";
    $wrfsifilename = "$WEB_ROOT_FOLDER/cgi-bin/data/wrfsi.nl";
    if(! -r $wrfsifilename){
      die("latlon2ij.PL: no grid data for " . $region);
    }
  }
}
else { # Full filename
  if( $region =~m|namelist.wps|) {
      $wpsfilename = $region;
      # print "wpsfilename = " . $wpsfilename   . "\n";
  }
  if( $region =~m|wrfsi.nl|)     {
    $wrfsifilename = $region;
    # print "wrfsifilename = " . $wrfsifilename . "\n";
  }
}

local @datalines;
my $NXmassMOAD;
my $NYmassMOAD;

### READ RASP GRID DATA FROM namelist.wps
if( defined $wpsfilename){
  open ( DATAFILE, "<$wpsfilename" ) or die("Can't open " . $wpsfilename) ;
  @datalines = <DATAFILE>;
  for ( $iiline=0 ; $iiline<=$#datalines ; $iiline++ ) {
    ### do not allow blank in simulation name (so number of blank-delimited fields in output line always known)
    if ( $datalines[$iiline] =~ m|^ *dwiz_desc * = *(.+)$|i )                 { $SIMULATION_NAME = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *parent_grid_ratio * = * (.*) *$|i )      { @RATIO_TO_PARENT = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *i_parent_start * = * (.*) *$|i )         { @DOMAIN_ORIGIN_LLI = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *j_parent_start * = * (.*) *$|i )         { @DOMAIN_ORIGIN_LLJ = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *e_we * = * (.*) *$|i )                   { @e_we = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *e_sn * = * (.*) *$|i )                   { @e_sn = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *ref_lat *= *(-*[0-9]+.*[0-9]*),.*$|i   ) { $MOAD_KNOWN_LAT = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *ref_lon *= *(-*[0-9]+.*[0-9]*),.*$|i   ) { $MOAD_KNOWN_LON = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *truelat1 *= *(-*[0-9]+.*[0-9]*),.*$|i  ) { $MOAD_STAND_LATS_0 = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *truelat2 *= *(-*[0-9]+.*[0-9]*),.*$|i  ) { $MOAD_STAND_LATS_1 = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *stand_lon *= *(-*[0-9]+.*[0-9]*),.*$|i ) { $MOAD_STAND_LONS = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *dx * = * ([^, ]*).*$|i )                 { $MOAD_DELTA_X = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *map_proj * = * ([^, ]*).*$|i )           { $MAP_PROJ_NAME = $1 ; }
  }

  ### do sanity checks
  if( ! defined $MOAD_KNOWN_LAT    || ! defined $MOAD_KNOWN_LON    ||
      ! defined $MOAD_STAND_LATS_0 || ! defined $MOAD_STAND_LATS_1 ||
      ! defined $MOAD_STAND_LONS   || ! defined $MAP_PROJ_NAME     )
    { die("ERROR: Missing data in datafile $wpsfilename");}
  $iigrid = $kgrid - 1 ;
  if( ! defined $RATIO_TO_PARENT[$iigrid]  ||
      ! defined  $DOMAIN_ORIGIN_LLI[$iigrid] || ! defined  $DOMAIN_ORIGIN_LLJ[$iigrid] ||
      ! defined  $e_we[$iigrid] || ! defined  $e_sn[$iigrid] )
    { die "ERROR: Missing data for grid $kgrid in datafile $wpsfilename "; }
  ### this program only valid for tangent lambert projection
  if( $MOAD_STAND_LATS_0 == $MOAD_STAND_LATS_1 && $MAP_PROJ_NAME =~ m|lambert|i )
    { $MOAD_STAND_LAT = $MOAD_STAND_LATS_0 ; }
  else
    { die "ERROR: PROGRAM ONLY VALID FOR TANGENT LAMBERT PROJECTION "; }
  $NXmassMOAD       = $e_we[0] -1 ;
  $NYmassMOAD       = $e_sn[0] -1 ;
}

else { ### READ RASP GRID DATA FROM wrfsi.nl FILE
  open ( DATAFILE, "<$wrfsifilename" ) or die("Can't open " . $wrfsifilename) ;
  @datalines = <DATAFILE>;
  for ( $iiline=0 ; $iiline<=$#datalines ; $iiline++ ) {
    if ( $datalines[$iiline] =~ m|^ *SIMULATION_NAME * = * [\"\'] *([^\"\']*)[\"\' ]|i )   { $SIMULATION_NAME = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *RATIO_TO_PARENT * = * (.*) *$|i )   { @RATIO_TO_PARENT = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *DOMAIN_ORIGIN_LLI * = * (.*) *$|i ) { @DOMAIN_ORIGIN_LLI = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *DOMAIN_ORIGIN_LLJ * = * (.*) *$|i ) { @DOMAIN_ORIGIN_LLJ = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *DOMAIN_ORIGIN_URI * = * (.*) *$|i ) { @DOMAIN_ORIGIN_URI = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *DOMAIN_ORIGIN_URJ * = * (.*) *$|i ) { @DOMAIN_ORIGIN_URJ = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *MOAD_KNOWN_LAT * = * ([^, ]*).*$|i )   { $MOAD_KNOWN_LAT = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *MOAD_KNOWN_LON * = * ([^, ]*).*$|i )   { $MOAD_KNOWN_LON = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *MOAD_STAND_LATS * = * (.*) *$|i )   { @MOAD_STAND_LATS = split ( / *,/, $1 ) ; }
    if ( $datalines[$iiline] =~ m|^ *MOAD_STAND_LONS * = * ([^, ]*).*$|i )   { $MOAD_STAND_LONS = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *MOAD_DELTA_X * = * ([^, ]*).*$|i )   { $MOAD_DELTA_X = $1 ; }
    if ( $datalines[$iiline] =~ m|^ *MAP_PROJ_NAME * = * ([^, ]*).*$|i )   { $MAP_PROJ_NAME = $1 ; }
  }
  ### do sanity checks
  if( ! defined $MOAD_KNOWN_LAT || ! defined $MOAD_KNOWN_LON ||
      ! @MOAD_STAND_LATS || ! defined $MOAD_STAND_LONS ||
      ! defined  $MAP_PROJ_NAME )
  { die "ERROR: MISSING DATA in DATAFILE $wrfsifilename "; }
  $iigrid = $kgrid - 1 ;
  if( ! defined $RATIO_TO_PARENT[$iigrid] ||
      ! defined  $DOMAIN_ORIGIN_LLI[$iigrid] || ! defined  $DOMAIN_ORIGIN_LLJ[$iigrid] ||
      ! defined  $DOMAIN_ORIGIN_URI[$iigrid] || ! defined  $DOMAIN_ORIGIN_URJ[$iigrid] )
    { die "ERROR: MISSING DATA FOR GRID $kgrid in DATAFILE $wrfsifilename "; }
  ### this program only valid for tangent lambert projection
  if( $MOAD_STAND_LATS[0] == $MOAD_STAND_LATS[1] && $MAP_PROJ_NAME =~ m|lambert|i )
    { $MOAD_STAND_LAT = $MOAD_STAND_LATS[0] ; }
  else
    { die "ERROR: PROGRAM ONLY VALID FOR CASE OF TANGENT LAMBERT PROJECTION "; }

  ### PUT GRID DATA INTO LOCAL VARIABLES
  $NXmassMOAD       = $DOMAIN_ORIGIN_URI[0] -1 ;
  $NYmassMOAD       = $DOMAIN_ORIGIN_URJ[0] -1 ;
}
  

  ### set simulation name
  if( ! defined $SIMULATION_NAME )
    { $SIMULATION_NAME = '???'; }

### PUT GRID DATA INTO LOCAL VARIABLES
my  $DX_P      = $MOAD_DELTA_X ;
my  $LAT_MOAD_CENTER  = $MOAD_KNOWN_LAT ;
my  $LON_MOAD_CENTER  = $MOAD_KNOWN_LON ;
my  $LON_XX_P  = $MOAD_STAND_LONS ;
my  $LAT_TAN_P = $MOAD_STAND_LAT ;

### LOOP OVER ALL INPUT alat,alon
for ( my $iindex=0; $iindex<$#alatlon; $iindex=$iindex+2 ) {
  my $alat = $alatlon[$iindex] ;
  my $alon = $alatlon[$iindex+1] ;
  ### convert negative W longitude
  if( $alon < 0 ) { $alon = $alon + 360.; }

### CALC MOAD LAMBERT I,J (non-integer) RELATIVE TO CENTER OF MOAD GRID
  ( $airelative, $ajrelative ) = &W3FB11( $alat,$alon, $LAT_MOAD_CENTER,$LON_MOAD_CENTER,$DX_P,$LON_XX_P,$LAT_TAN_P );
  #4test:  printf "CENTER aI,aJ=%8.2f%8.2f \n", $airelative,$ajrelative ;

### CALC MOAD LAMBERT I,J (non-integer) SHIFTED TO MOAD *MASS* GRID
  my $aimoad = $airelative + 0.5*( $NXmassMOAD -1 ) ;
  my $ajmoad = $ajrelative + 0.5*( $NYmassMOAD -1 ) ;

  ### COMPUTE LAMBERT I,J FOR SELECTED GRID
  my $ai = $aimoad ;
  my $aj = $ajmoad ;
  ### CONVERT MOAD *MASS* INDEX TO NON-MOAD SUBGRID *MASS* INDEX
  ### note iigrid is one less than kgrid (i.e. param arrays use perl indexing)
  for ( my $iigrid=1 ; $iigrid<=($kgrid-1); $iigrid++ ) {
    if( ! defined $RATIO_TO_PARENT[$iigrid]    ||
        ! defined  $DOMAIN_ORIGIN_LLI[$iigrid] ||
        ! defined  $DOMAIN_ORIGIN_LLJ[$iigrid] ) {
      die "ERROR: BAD GRID NUMBER = $kgrid ";
    }
    $ai = 0.5 + $RATIO_TO_PARENT[$iigrid] * ( $ai - ( $DOMAIN_ORIGIN_LLI[$iigrid] -0.5 ) ) ;
    $aj = 0.5 + $RATIO_TO_PARENT[$iigrid] * ( $aj - ( $DOMAIN_ORIGIN_LLJ[$iigrid] -0.5 ) ) ;
    $ninti = nint( $ai );
    $nintj = nint( $aj );
  }
                
  ### VERBOSE PRINT
  if( $LPRINT != 0 ){
    if( $LCOMMA == 0 ){
      printf "%s GRID %i Lat,Lon= %7.3f %8.3f => aI,aJ= %5.3f %5.3f (%d,%d)\n", $SIMULATION_NAME, $kgrid, $alat,$alon, $ai,$aj, $ninti,$nintj ;
    }
    else{
      printf "%s GRID %i Lat,Lon= %7.3f,%8.3f => aI,aJ= %5.3f,%5.3f (%d,%d)\n", $SIMULATION_NAME, $kgrid, $alat,$alon, $ai,$aj, $ninti,$nintj ;
    }
  }

  ### write to array
  if ( $LNINT == 0 )
  { push @aij, ($ai,$aj); }
  else
  { push @aij, ($ninti,$nintj); }

### END OF LOOP OVER ALL INPUT lat,lon
}

### NON-VERBOSE PRINT
if( $LPRINT == 0 ){
  if( $LNINT == 0 ) { $fmt = '%.2f' ; }
  else              { $fmt = '%d' ; }

  if ( $LCOMMA == 0 )  { $format = "${fmt} " x $#aij ; }
  else                 { $format = "${fmt}," x $#aij ; }
  # ensure no blank at end
  printf "${format}${fmt}\n", @aij ;
}

   exit;

##########################################################################
sub W3FB11()
### CALC LAMBERT I,J (decimal) FROM LONG,LAT FOR GIVEN LAMBERT PARAMETERS
###  Args: $ALAT,$ELON, $ALAT1,$ELON1,$DX,$ELONV,$ALATAN
{
#
# SUBPROGRAM:  W3FB11        LAT/LON TO LAMBERT(I,J) FOR GRIB
#   PRGMMR: STACKPOLE        ORG: NMC42       DATE:88-11-28
#
# ABSTRACT: CONVERTS THE COORDINATES OF A LOCATION ON EARTH GIVEN IN
#   THE NATURAL COORDINATE SYSTEM OF LATITUDE/LONGITUDE TO A GRID
#   COORDINATE SYSTEM OVERLAID ON A LAMBERT CONFORMAL TANGENT CONE
#   PROJECTION TRUE AT A GIVEN N OR S LATITUDE. W3FB11 IS THE REVERSE
#   OF W3FB12. USES GRIB SPECIFICATION OF THE LOCATION OF THE GRID
#
# PROGRAM HISTORY LOG:
#   88-11-25  ORIGINAL AUTHOR:  STACKPOLE, W/NMC42
#
# USAGE:  CALL W3FB11 (ALAT,ELON,ALAT1,ELON1,DX,ELONV,ALATAN,XI,XJ)
#   INPUT ARGUMENT LIST:
#     ALAT     - LATITUDE IN DEGREES (NEGATIVE IN SOUTHERN HEMIS)
#     ELON     - EAST LONGITUDE IN DEGREES, REAL*4
#     ALAT1    - LATITUDE  OF LOWER LEFT POINT OF GRID (POINT (1,1))
#     ELON1    - LONGITUDE OF LOWER LEFT POINT OF GRID (POINT (1,1))
#                ALL REAL*4
#     DX       - MESH LENGTH OF GRID IN METERS AT TANGENT LATITUDE
#     ELONV    - THE ORIENTATION OF THE GRID.  I.E.,
#                THE EAST LONGITUDE VALUE OF THE VERTICAL MERIDIAN
#                WHICH IS PARALLEL TO THE Y-AXIS (OR COLUMNS OF
#                OF THE GRID) ALONG WHICH LATITUDE INCREASES AS
#                THE Y-COORDINATE INCREASES.  REAL*4
#                THIS IS ALSO THE MERIDIAN (ON THE BACK SIDE OF THE
#                TANGENT CONE) ALONG WHICH THE CUT IS MADE TO LAY
#                THE CONE FLAT.
#     ALATAN   - THE LATITUDE AT WHICH THE LAMBERT CONE IS TANGENT TO
#                (TOUCHING) THE SPHERICAL EARTH.
#                 SET NEGATIVE TO INDICATE A
#                 SOUTHERN HEMISPHERE PROJECTION.
#
#   OUTPUT ARGUMENT LIST:
#     XI       - I COORDINATE OF THE POINT SPECIFIED BY ALAT, ELON
#     XJ       - J COORDINATE OF THE POINT; BOTH REAL*4
#
#   REMARKS: FORMULAE AND NOTATION LOOSELY BASED ON HOKE, HAYES,
#     AND RENNINGER'S "MAP PROJECTIONS AND GRID SYSTEMS...", MARCH 1981
#     AFGWC/TN-79/003
#
# ATTRIBUTES:
#   LANGUAGE: IBM VS FORTRAN
#   MACHINE:  NAS
#

  my ( $ALAT, $ELON, $ALAT1, $ELON1, $DX, $ELONV, $ALATAN ) = @_;

  my ( $H );
  my     $RERTH = 6.3712E+6;
  my     $PI = 3.14159 ;
#
#        PRELIMINARY VARIABLES AND REDIFINITIONS
#
#        H = 1 FOR NORTHERN HEMISPHERE; = -1 FOR SOUTHERN
#
         if( $ALATAN>0)
           { $H = 1.; }
         else
           { $H = -1.; }
#
  my     $RADPD = $PI/180.0;
  my     $REBYDX = $RERTH/$DX;
  my     $ALATN1 = $ALATAN * $RADPD;
  my     $AN = $H * sin($ALATN1);
  my     $COSLTN = cos($ALATN1);
#
#        MAKE SURE THAT INPUT LONGITUDES DO NOT PASS THROUGH
#        THE CUT ZONE (FORBIDDEN TERRITORY) OF THE FLAT MAP
#        AS MEASURED FROM THE VERTICAL (REFERENCE) LONGITUDE.
#
  my     $ELON1L = $ELON1;
         if( ($ELON1 - $ELONV) > 180.)
         { $ELON1L = $ELON1 - 360. ;}
         if( ($ELON1 - $ELONV) < -180. )
         { $ELON1L = $ELON1 + 360.; }
#
  my     $ELONL = $ELON;
         if( ($ELON - $ELONV) > 180. )
         { $ELONL = $ELON - 360.; }
         if( ($ELON - $ELONV) < -180. )
         { $ELONL = $ELON + 360.; }
#
  my     $ELONVR = $ELONV *$RADPD;
#
#        RADIUS TO LOWER LEFT HAND (LL) CORNER
#
  my     $ALA1 =  $ALAT1 * $RADPD;
  my     $RMLL = $REBYDX * ((($COSLTN)**(1.-$AN))*(1.+$AN)**$AN) * (((cos($ALA1))/(1.+$H*sin($ALA1)))**$AN)/$AN;
#
#        USE LL POINT INFO TO LOCATE POLE POINT
#
  my     $ELO1 = $ELON1L * $RADPD;
  my     $ARG = $AN * ($ELO1-$ELONVR);
  my     $POLEI = 1. - $H * $RMLL * sin($ARG);
  my     $POLEJ = 1. + $RMLL * cos($ARG);
#
#        RADIUS TO DESIRED POINT AND THE I J TOO
#
  my     $ALA = $ALAT * $RADPD;
  my     $RM = $REBYDX * (($COSLTN**(1.-$AN))*(1.+$AN)**$AN) * (((cos($ALA))/(1.+$H*sin($ALA)))**$AN)/$AN;
#
  my     $ELO = $ELONL * $RADPD;
         $ARG = $AN*($ELO-$ELONVR);
  my     $XI = $POLEI + $H * $RM * sin($ARG);
  my     $XJ = $POLEJ - $RM * cos($ARG);
#
#        IF COORDINATE LESS THAN 1
#        COMPENSATE FOR ORIGIN AT (1,1)
#
#jack - following gives round-off error problems so eliminate
#jack-        IF(XI.LT.1.)  XI = XI - 1.;
#jack         IF(XJ.LT.1.)  XJ = XJ - 1.;
#
      return ($XI,$XJ);
}
##################################################################################################
#unused 
#unused sub W3FB12()
#unused ### CALC LONG,LAT FOR GIVEN LAMBERT I,J (decimal)
#unused ###  Args: $XI,$XJ, $ALAT1,$ELON1,$DX,$ELONV,$ALATAN
#unused {
#unused # SUBPROGRAM:  W3FB12        LAMBERT(I,J) TO LAT/LON FOR GRIB
#unused #   PRGMMR: STACKPOLE        ORG: NMC42       DATE:88-11-28
#unused #
#unused # ABSTRACT: CONVERTS THE COORDINATES OF A LOCATION ON EARTH GIVEN IN 
#unused #   GRID COORDINATE SYSTEM OVERLAID ON A LAMBERT CONFORMAL TANGENT
#unused #   CONE PROJECTION TRUE AT A GIVEN N OR S LATITUDE TO THE
#unused #   NATURAL COORDINATE SYSTEM OF LATITUDE/LONGITUDE
#unused #   W3FB12 IS THE REVERSE OF W3FB11.
#unused #   USES GRIB SPECIFICATION OF THE LOCATION OF THE GRID
#unused #
#unused # PROGRAM HISTORY LOG
#unused #   88-11-25  ORIGINAL AUTHOR:  STACKPOLE, W/NMC42
#unused #
#unused # USAGE:  CALL W3FB12(XI,XJ,ALAT1,ELON1,DX,ELONV,ALATAN,ALAT,ELON,IERR,
#unused #                                   IERR)
#unused #   INPUT ARGUMENT LIST:
#unused #     XI       - I COORDINATE OF THE POINT  REAL*4
#unused #     XJ       - J COORDINATE OF THE POINT  REAL*4
#unused #     ALAT1    - LATITUDE  OF LOWER LEFT POINT OF GRID (POINT 1,1)
#unused #                LATITUDE <0 FOR SOUTHERN HEMISPHERE; REAL*4
#unused #     ELON1    - LONGITUDE OF LOWER LEFT POINT OF GRID (POINT 1,1)
#unused #                  EAST LONGITUDE USED THROUGHOUT; REAL*4
#unused #     DX       - MESH LENGTH OF GRID IN METERS AT TANGENT LATITUDE
#unused #     ELONV    - THE ORIENTATION OF THE GRID.  I.E.,
#unused #                THE EAST LONGITUDE VALUE OF THE VERTICAL MERIDIAN
#unused #                WHICH IS PARALLEL TO THE Y-AXIS (OR COLUMNS OF
#unused #                THE GRID) ALONG WHICH LATITUDE INCREASES AS
#unused #                THE Y-COORDINATE INCREASES.  REAL*4
#unused #                THIS IS ALSO THE MERIDIAN (ON THE OTHER SIDE OF THE
#unused #                TANGENT CONE) ALONG WHICH THE CUT IS MADE TO LAY
#unused #                THE CONE FLAT.
#unused #     ALATAN   - THE LATITUDE AT WHICH THE LAMBERT CONE IS TANGENT TO
#unused #                (TOUCHES OR OSCULATES) THE SPHERICAL EARTH.
#unused #                 SET NEGATIVE TO INDICATE A
#unused #                 SOUTHERN HEMISPHERE PROJECTION; REAL*4
#unused #
#unused #   OUTPUT ARGUMENT LIST
#unused #     ALAT     - LATITUDE IN DEGREES (NEGATIVE IN SOUTHERN HEMI.)
#unused #     ELON     - EAST LONGITUDE IN DEGREES, REAL*4
#unused #     IERR     - .EQ. 0   IF NO PROBLEM
#unused #                .GE. 1   IF THE REQUESTED XI,XJ POINT IS IN THE
#unused #                         FORBIDDEN ZONE, I.E. OFF THE LAMBERT MAP
#unused #                         IN THE OPEN SPACE WHERE THE CONE IS CUT.
#unused #                  IF IERR.GE.1 THEN ALAT=999. AND ELON=999.
#unused #
#unused #   REMARKS: FORMULAE AND NOTATION LOOSELY BASED ON HOKE, HAYES,
#unused #     AND RENNINGER'S "MAP PROJECTIONS AND GRID SYSTEMS...", MARCH 1981
#unused #     AFGWC/TN-79/003
#unused #
#unused # ATTRIBUTES:
#unused #   LANGUAGE: IBM VS FORTRAN
#unused #   MACHINE:  NAS
#unused #
#unused #$$$
#unused 
#unused   ( $XI, $XJ, $ALAT1, $ELON1, $DX, $ELONV, $ALATAN ) = @_;
#unused 
#unused #alaWRF
#unused          $RERTH = 6.370E+6;
#unused #ORIGINAL-NCEP         $RERTH = 6.3712E+6;
#unused          $PI = 3.1415926 ;
#unused #ORIGINAL-NCEP         $PI = 3.14159 ;
#unused 
#unused #        DATA  OLDRML/99999./
#unused #
#unused #        PRELIMINARY VARIABLES AND REDIFINITIONS
#unused #
#unused #        H = 1 FOR NORTHERN HEMISPHERE; = -1 FOR SOUTHERN
#unused #
#unused #        SAVE
#unused 
#unused          $BETA  = 1.;
#unused          $IERR = 0;
#unused 
#unused          if( $ALATAN>0 )
#unused            { $H = 1.; }
#unused          else
#unused            { $H = -1.; }
#unused #
#unused          $PIBY2 = $PI / 2. ;
#unused          $RADPD = $PI / 180.0 ;
#unused          $DEGPRD = 1. / $RADPD ;
#unused          $REBYDX = $RERTH / $DX ;
#unused          $ALATN1 = $ALATAN * $RADPD ;
#unused          $AN = $H * sin($ALATN1) ;
#unused          $COSLTN = cos($ALATN1) ;
#unused #
#unused #        MAKE SURE THAT INPUT LONGITUDE DOES NOT PASS THROUGH
#unused #        THE CUT ZONE (FORBIDDEN TERRITORY) OF THE FLAT MAP
#unused #        AS MEASURED FROM THE VERTICAL (REFERENCE) LONGITUDE
#unused #
#unused          $ELON1L = $ELON1 ;
#unused          if( ($ELON1-$ELONV) > +180. )
#unused           { $ELON1L = $ELON1 - 360.; }
#unused          if( ($ELON1-$ELONV) < (-180.) )
#unused           {  $ELON1L = ELON1 + 360.; }
#unused #
#unused          $ELONVR = $ELONV * $RADPD;
#unused #
#unused #        RADIUS TO LOWER LEFT HAND (LL) CORNER
#unused #
#unused          $ALA1 =  $ALAT1 * $RADPD;
#unused          $RMLL = $REBYDX * (($COSLTN**(1.-$AN))*(1.+$AN)**$AN)*(((cos($ALA1))/(1.+$H*sin($ALA1)))**$AN)/$AN;
#unused #
#unused #        USE RMLL TO TEST IF MAP AND GRID UNCHANGED FROM PREVIOUS
#unused #        CALL TO THIS CODE.  THUS AVOID UNNEEDED RECOMPUTATIONS.
#unused #
#unused #         IF(RMLL.EQ.OLDRML) THEN
#unused #           NEWMAP = .FALSE.
#unused #         ELSE
#unused #           NEWMAP = .TRUE.
#unused #           OLDRML = RMLL
#unused #
#unused #          USE LL POINT INFO TO LOCATE POLE POINT
#unused #
#unused            $ELO1 = $ELON1L * $RADPD;
#unused            $ARG = $AN * ($ELO1-$ELONVR);
#unused            $POLEI = 1. - $H * $RMLL * sin($ARG);
#unused            $POLEJ = 1. + $RMLL * cos($ARG);
#unused #         ENDIF
#unused #
#unused #        RADIUS TO THE I,J POINT (IN GRID UNITS)
#unused #              YY REVERSED SO POSITIVE IS DOWN
#unused #
#unused          $XX = $XI - $POLEI;
#unused          $YY = $POLEJ - $XJ;
#unused          $R2 = $XX**2 + $YY**2;
#unused #
#unused #        CHECK THAT THE REQUESTED I,J IS NOT IN THE FORBIDDEN ZONE
#unused #           YY MUST BE POSITIVE UP FOR THIS TEST
#unused #
#unused          $THETA = $PI*(1.-$AN);
#unused          $BETA = abs( atan2( $XX, -($YY) ) );
#unused          $IERR = 0;
#unused          if( $BETA <= $THETA ) 
#unused            {
#unused            $IERR = 1;
#unused            $ALAT = 999.;
#unused            $ELON = 999.;
#unused #           IF(.NOT.NEWMAP)  RETURN
#unused            }
#unused #
#unused #        NOW THE MAGIC FORMULAE
#unused #
#unused          if( $R2==0 ) 
#unused          {
#unused            $ALAT = $H * 90.;
#unused            $ELON = $ELONV;
#unused          }
#unused          else
#unused          {
#unused #
#unused #          FIRST THE LONGITUDE
#unused #
#unused            $ELON = $ELONV + $DEGPRD * atan2( $H*$XX, $YY )/$AN;
#unused ### needed to replace amod
#unused            $ELON = $ELON+360. -360.*int(($ELON+360.)/360.);
#unused #original           ELON = AMOD(ELON+360., 360.)
#unused #
#unused #          NOW THE LATITUDE
#unused #          RECALCULATE THE THING ONLY IF MAP IS NEW SINCE LAST TIME
#unused #
#unused #           IF(NEWMAP) THEN
#unused              $ANINV = 1./$AN;
#unused              $ANINV2 = $ANINV/2.;
#unused              $THING = (($AN/$REBYDX) ** $ANINV)/(($COSLTN**((1.-$AN)*$ANINV))*(1.+ $AN));
#unused #           ENDIF
#unused ### needed to replace atan
#unused            $ALAT = $H*( $PIBY2 - 2.*atan2( $THING*($R2**$ANINV2), 1. ) )*$DEGPRD;
#unused #glendeni-systax_error!           $ALAT = -$H*($PIBY2 - 2.*atan2(($THING*($R2**$ANINV2))),1.)*$DEGPRD;
#unused #old-error??           $ALAT = -$H*($PIBY2 - 2.*atan2(1.,($THING*($R2**$ANINV2))))*$DEGPRD;
#unused #original           ALAT = H*( PIBY2 - 2.*ATAN( THING*(R2**ANINV2) ) )*DEGPRD
#unused          }
#unused #
#unused #        FOLLOWING TO ASSURE ERROR VALUES IF FIRST TIME THRU
#unused #         IS OFF THE MAP
#unused #
#unused          if( $IERR!=0 )
#unused          {
#unused            $ALAT = 999.;
#unused            $ELON = 999.;
#unused            $IERR = 2;
#unused          }
#unused       return ($ALAT,$ELON);
#unused }
#########################################################################
### FIND NEAREST INTEGER
sub nint { int($_[0] + ($_[0] >=0 ? 0.5 : -0.5)); }
#########################################################################
