#!/usr/bin/perl -wT

### GET NEAREST RASP GRID LAT & LON FOR SPECIFIED LAT & LON
### eg call ala http://www.drjack.info/cgi-bin/get_rasp_gridlocn.cgi?&region=UK4&grid=d2&lat=55.0&lon=1.5370

################################################################################

### MODIFIED FROM BLIP's get_image_minispot.cgi


use CGI::Carp qw(fatalsToBrowser);

my $PROGRAMNAME = 'get_rasp_gridlocn.cgi';

#untaint - UNTAINT PATH
$ENV{'PATH'} = '/bin:/usr/bin';

### DETERMINE SCRIPT DIRECTORY - this should be automatic but can over-ride here if necessary
### require latlon<->ij conversion scripts to be in current directory
if( $0 =~ m|^/| ) { ( $SCRIPTDIR = "${0}" ) =~ s|/[^/]*$|| ; }
else              { ( $SCRIPTDIR = "$ENV{'PWD'}/${0}" ) =~ s|[\./]*/[^/]*$|| ; }
#untaint
if ( defined $SCRIPTDIR && $SCRIPTDIR =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) { $SCRIPTDIR = $1 ; }  # filename chars only

### SET EXTERNAL SCRIPT WHICH EXTRACTS NEAREST GRID LOCATION
local $WEB_ROOT_FOLDER="/home/davidrasp/public_html/RASPViewer";
$EXTRACTSCRIPT = "$WEB_ROOT_FOLDER/cgi-bin/extract.gridloc.PL";
if ( $EXTRACTSCRIPT =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) { $EXTRACTSCRIPT = $1 ; }  # filename chars only

### PARSE CGI INPUT
use CGI qw(:standard);
$query = new CGI;
$REGION = $query->param('region');
$GRID = $query->param('grid');
$ilat = $query->param('lat');
$jlon = $query->param('lon');
#untaint - untaint input arguments
if ( defined $REGION && $REGION =~ m|^([A-Za-z0-9][A-Za-z0-9_.-]*)$| ) { $REGION = $1 ; } # alphanumeric+
if ( defined $GRID && $GRID =~ m|^([A-Za-z0-9][A-Za-z0-9_.-]*)$| ) { $GRID = $1 ; } # filename chars only
if ( defined $ilat && $ilat =~ m|^([0-9+-][0-9.]*)$| ) { $ilat = $1 ; } # decimal only
if ( defined $jlon && $jlon =~ m|^([0-9+-][0-9.]*)$| ) { $jlon = $1 ; } # decimal only

#PAULS `echo "ARGS: $REGION & $GRID & $ilat $jlon " >> LOG/get_rasp_blipspot.test_prints`;

### TEST FOR MISSING ARGUMENTS
if ( ! defined $GRID || $GRID eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing GRID argument"; }
if ( ! defined $ilat || $ilat eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing lat argument";  }
if ( ! defined $jlon || $jlon eq '' ) { die "$PROGRAMNAME ERROR EXIT: missing lon argument";  }

########################################

### GET INFO FROM EXTERNAL SCRIPT
## @spotlines = `${EXTRACTSCRIPT} $REGION $GRID $DAY $igrid $jgrid $plottime $parameter`;
###TEST `echo "${EXTRACTSCRIPT} ARGS: $REGION & $GRID & $ilat & $jlon " > /var/www/cgi-bin/LOG/get_rasp_blipspot.test_prints`;

# NEEDED??
# if ( $REGION =~ m|^(.*)$| ) { $REGION = $1 ; }  # filename chars only
# if ( $GRID =~ m|^(.*)$| ) { $GRID = $1 ; }  # filename chars only
# if ( $ilat =~ m|^(.*)$|i ) { $ilat = $1 ; } # integer only
# if ( $jlon =~ m|^(.*)$|i ) { $jlon = $1 ; } # integer only

# `echo "${EXTRACTSCRIPT} ARGS-IN: $REGION & $GRID & $ilat & $jlon " >> LOG/get_rasp_blipspot.test_prints`;

@result = `${EXTRACTSCRIPT} $REGION $GRID $ilat $jlon` ;

### PRINT RESULT
print "Content-type: text/plain\n\n@{result}\n";


