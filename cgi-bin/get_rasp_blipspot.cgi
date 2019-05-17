#!/usr/bin/perl -w -T

### GET RASP BLIPSPOT FOR SPECIFIED IMAGE LOCATION
### eg call ala http://www.drjack.info/cgi-bin/get_rasp_blipspot.cgi?&region=PANOCHE&grid=d2&day=0&i=559&k=70&width=585&height=585

################################################################################

### MODIFIED FROM BLIP's get_image_minispot.cgi

use lib "../perllib/usr/share/perl5/vendor_perl/";  

use CGI::Carp qw(fatalsToBrowser);

  my $PROGRAMNAME = 'get_rasp_blipspot.cgi';
  local $WEB_ROOT_FOLDER="/home/davidrasp/public_html/RASPViewer";

  #untaint - UNTAINT PATH
  $ENV{'PATH'} = '/bin:/usr/bin';

  ### DETERMINE SCRIPT DIRECTORY - this should be automatic but can over-ride here if necessary
  ### require latlon<->ij conversion scripts to be in current directory
  if( $0 =~ m|^/| ) { ( $SCRIPTDIR = "${0}" ) =~ s|/[^/]*$|| ; }
  else              { ( $SCRIPTDIR = "$ENV{'PWD'}/${0}" ) =~ s|[\./]*/[^/]*$|| ; }
  #untaint
  if ( defined $SCRIPTDIR && $SCRIPTDIR =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) { $SCRIPTDIR = $1 ; }  # filename chars only

  ### IMPORT SITE LOCAL PARAMETERS
  #untaint - untainting put into routines in this file
  require "$SCRIPTDIR/sub.rasp_site_parameters.PL" ;

  ### SET SITE DEPENDENT DIRECTORIES
  #untaint - untainting put into this routine
  &site_directories ;

  ### SET EXTERNAL SCRIPT WHICH EXTRACTS BLIPSPOT DATA INTO PRINTABLE FORMAT
  #PAULS $EXTRACTSCRIPT = "$BASEDIR/RASP/UTIL/extract.blipspot.PL";
  $EXTRACTSCRIPT = "$WEB_ROOT_FOLDER/cgi-bin/extract.blipspot.PL";
  if ( $EXTRACTSCRIPT =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) { $EXTRACTSCRIPT = $1 ; }  # filename chars only

  ### SET PARAMETER FOR XI TESTS
  $LTEST = 0;
  #4XItest: $LTEST = 1;

   if ( $LTEST == 1 )
   {
    ###### INITIALIZATION FOR XI TESTS
    #4test: $EXTRACTSCRIPT = "$ENV{HOME}/DRJACK/RASP/UTIL/test.extract.blipspot.PL";
    ###### PANOCHE CASE
      $REGION = 'PANOCHE';
      ### ARTIFICIAL INPUT
      $GRID = 'd2' ;
      ### SET DAY=-1 TO GET SOUNDINGS FROM 24HR BEFORE
      $DAY = 0;
      $DAY = 20070901;
      ### TEST IMAGE
      $iimage = 501. ;
      $kimage =  301. ;
      $imagewidth = $imageheight = 1001;
  }
  else
  {
    ### PARSE CGI INPUT
    use CGI qw(:standard);
    $query = new CGI;
    $REGION = $query->param('region');
    $GRID = $query->param('grid');
    $DAY = $query->param('day');
    $iimage = $query->param('i');
    $ilat = $query->param('lat');
    $kimage = $query->param('k');
    $klon = $query->param('lon');
    $imagewidth = $query->param('width');
    $imageheight = $query->param('height');
    $plottime = $query->param('time');
    $parameter = $query->param('param');
    $linfo = $query->param('linfo');
    #untaint - untaint input arguments
    if ( defined $REGION && $REGION =~ m|^([A-Za-z0-9][A-Za-z0-9_.+-]*)$| ) { $REGION = $1 ; } # alphanumeric+
    else { die "$PROGRAMNAME ERROR EXIT: bad REGION argument"; }
    if ( defined $GRID && $GRID =~ m|^([dw][0-9]*)$| ) { $GRID = $1 ; } # filename chars only
    else { die "$PROGRAMNAME ERROR EXIT: bad GRID argument"; }
    if ( defined $DAY && $DAY =~ m|^([0-9]+)$| ) { $DAY = $1 ; } # integer only
    else { die "$PROGRAMNAME ERROR EXIT: bad DAY argument"; }
    if ( defined $plottime && $plottime =~ m|^([0-9][0-9][0-9][0-9][lL][sS][tT])$| ) { $plottime = $1 ; } # alphanumeric+
    else {
         if(defined ($plottime)){
             die "$PROGRAMNAME ERROR EXIT: bad TIME argument";
         }
    }
    if ( defined $iimage && $iimage =~ m|^([0-9+-][0-9]*)$| ) { $iimage = $1 ; } # integer only
    if ( defined $ilat && $ilat =~ m|^([0-9+-][0-9.]*)$| ) { $ilat = $1 ; } # decimal only
    if ( defined $kimage && $kimage =~ m|^([0-9+-][0-9]*)$| ) { $kimage = $1 ; } # integer only
    if ( defined $klon && $klon =~ m|^([0-9+-][0-9.]*)$| ) { $klon = $1 ; } # decimal only
    if ( defined $imagewidth && $imagewidth =~ m|^([0-9+-][0-9]*)$| ) { $imagewidth = $1 ; } # integer only
    if ( defined $imageheight && $imageheight =~ m|^([0-9+-][0-9]*)$| ) { $imageheight = $1 ; } # integer only
    # PAULS Need to allow " " in parameter names
    if ( defined $parameter && $parameter =~ m|^([a-z][a-z0-9_ ]*)$| ) {
       $parameter = $1 ;  # alphanumeric+
    }
    else {
       $parameter = '';
    }
    if ( defined $linfo && $linfo =~ m|^([0-9]*)$| ) { $linfo = $1 ; } # alphanumeric+
    else { die "$PROGRAMNAME ERROR EXIT: bad LINFO argument"; }
  }

  #4testprint: `echo "ARGS: REGION=$REGION & GRID=$GRID & DAY=$DAY & iimage=$iimage & ilat=$ilat & kimage=$kimage & klon=$klon & imagewidth=$imagewidth & imageheight=$imageheight " >> LOG/get_rasp_blipspot.test_prints`;

  ### TEST FOR MISSING ARGUMENTS
  if ( ! defined $GRID || $GRID eq '' )                                               { die "$PROGRAMNAME ERROR EXIT: missing GRID argument"; }
  if ( ( ! defined $ilat || $ilat eq '' ) && ( ! defined $iimage || $iimage eq '' ) ) { die "$PROGRAMNAME ERROR EXIT: missing iimage/lat argument"; }
  if ( ( ! defined $klon || $klon eq '' ) && ( ! defined $kimage || $kimage eq '' ) ) { die "$PROGRAMNAME ERROR EXIT: missing kimage/lon argument"; }
  if ( ! defined $ilat && ( ! defined $imagewidth  || $imagewidth  eq '' ) )          { die "$PROGRAMNAME ERROR EXIT: missing imagewidth argument"; }
  if ( ! defined $klon && ( ! defined $imageheight || $imageheight eq '' ) )          { die "$PROGRAMNAME ERROR EXIT: missing imageheight argument"; }
  # PAULS if ( ! defined $iimage || $iimage eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing iimage argument"; }
  # PAULS if ( ! defined $kimage || $kimage eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing kimage argument"; }
  # PAULS if ( ! defined $imagewidth || $imagewidth eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing imagewidth argument"; }
  # PAULS if ( ! defined $imageheight || $imageheight eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing imageheight argument"; }

########################################

	# PAULS === Can now also take lat ($ilat) & lon ($klon) directly

	if ( defined $ilat && defined $klon )	{
		$igrid = $ilat;
		$jgrid = $klon;
	}
	else {
		### GET REGION AND GRID DEPENDENT GRID AND IMAGE PARAMETERS
		( $grid_imin,$grid_imax, $grid_jmin,$grid_jmax ) = &grid_params( $REGION,$GRID ) ;
		( $image_mapwidth,$image_mapheight, $image_maporiginx,$image_maporiginy ) = &image_params( $REGION,$GRID ) ;

		### INITIALIZATION
		### ensure REGION is capitalized
		$REGION =~ tr/a-z/A-Z/;

		### CONVERT IMAGE i,k INTO LAT,LON
		### find regional image values and grid corner values

		### ADJUST FOR RE-SIZED MAP - convert re-sized image coord to original size coord
		$ximage = $iimage / $imagewidth ;
		$yimage = 1. - ( $kimage / $imageheight ) ;
 
		### convert into i,j (nonstaggered)
		$aigrid = $grid_imin + ($grid_imax-$grid_imin)*(($ximage-$image_maporiginx)/$image_mapwidth) ;
		### note that viewport y origin is on _top_edge of viewport
		$ajgrid = $grid_jmin + ($grid_jmax-$grid_jmin)*(($yimage-$image_maporiginy+$image_mapheight)/$image_mapheight) ;

		### get nearest integer values
		$igrid = nint( $aigrid );
		$jgrid = nint( $ajgrid );
	}
	#4testprint: if ( defined $ENV{HOME} && $ENV{HOME} eq '/home/glendeni' )  {  print "x,yIMAGE= $iimage $kimage x,ySIZE= $image_xsize $image_ysize x,yORIGIN= $image_maporiginx $image_maporiginy i,jGRID= $aigrid $ajgrid \n";  }

	### GET BLIPSPOT INFO FROM EXTERNAL SCRIPT
	## @spotlines = `${EXTRACTSCRIPT} $REGION $GRID $DAY $igrid $jgrid $plottime $parameter`;
	#4testprint: 
	`echo "${EXTRACTSCRIPT} ARGS: $REGION & $GRID & $DAY & $igrid & $jgrid & $plottime & $parameter " >> LOG/get_rasp_blipspot.test_prints`;
	###TEST `echo "${EXTRACTSCRIPT} ARGS: $REGION & $GRID & $DAY & $igrid & $jgrid & $linfo & $plottime & $parameter " > /var/www/cgi-bin/LOG/get_rasp_blipspot.test_prints`;
	if ( $REGION    =~ m|^(.*)$|  ) { $REGION = $1 ; }  # filename chars only
	if ( $GRID      =~ m|^(.*)$|  ) { $GRID = $1 ; }  # filename chars only
	if ( $DAY       =~ m|^(.*)$|  ) { $DAY = $1 ; }  # filename chars only
	if ( $igrid     =~ m|^(.*)$|i ) { $igrid = $1 ; } # integer only
	if ( $jgrid     =~ m|^(.*)$|i ) { $jgrid = $1 ; } # integer only
	if ( $linfo     =~ m|^(.*)$|  ) { $linfo = $1 ; }  # filename chars only
	if ( defined($plottime) ){
	    if($plottime  =~ m|^(.*)$|) { $plottime = $1 ; }  # filename chars only
        }
        else                            { $plottime = '' ; }
	if ( $parameter =~ m|^(.*)$|  ) { $parameter = $1 ; }  # filename chars only

	# PAULS `echo "${EXTRACTSCRIPT} ARGS: $REGION & $GRID & $DAY & $igrid & $jgrid & $linfo & $plottime & $parameter " >> /var/www/cgi-bin/LOG/get_rasp_blipspot.test_prints`;
	#       `echo "${EXTRACTSCRIPT} ARGS: $REGION & $GRID & $DAY & $igrid & $jgrid & $linfo & $plottime & $parameter " >> /var/www/cgi-bin/LOG/get_rasp_blipspot.test_prints`;
	# `echo "${EXTRACTSCRIPT} ARGS-IN: $REGION & $GRID & $DAY & $igrid & $jgrid & $linfo & $plottime & $parameter " >> LOG/get_rasp_blipspot.test_prints`;

	if ($parameter ne 'pfd_tot'){
 	 @spotlines = `${EXTRACTSCRIPT} $REGION $GRID $DAY $igrid $jgrid $linfo $plottime $parameter`;
	}
	else {
	 @spotlines = 'Parameter not supported';
	}

	### PRINT HTML TEXT HEADER+array
	# print "<html><body> <style=text/plain><pre>@{spotlines}</pre>\n</body></html>";
	print "Content-type: text/plain\n\n@{spotlines}\n";

	#4test:  print "\nCOOKIE== $cookieinfo \n";

###########################################################################################
### FIND NEAREST INTEGER
sub nint { int($_[0] + ($_[0] >=0 ? 0.5 : -0.5)); }
###########################################################################################
### TAINT TEST
#unused sub is_tainted { not eval { join("",@_), kill 0; 1; }; }
###########################################################################################
