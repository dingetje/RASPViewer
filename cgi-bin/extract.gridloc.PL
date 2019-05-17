#! /usr/bin/perl -w

if ( $#ARGV != 3 || $ARGV[0] eq '-?' ) {
#-----------------adescription1------------------------------------
print "Extract+print Nearest Grid Lat+Lon for \$1=region \$2=grid# \$4,5=lat,lon(decimal)\n";
print "  eg for latest previous day data:   extract.gridloc.PL UK4 d2 53.50 -1.234\n";
print "  input grid# can be 1,2,3 or d1,d2,w2\n";
exit 0; }
#########################################################################
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
#########################################################################

### NOTE: SCRIPTS ij2latlon.PL & latlon2ij.PL MUST BE IN SAME DIRECTORY

### MODIFIED FROM BLIP extract.minispot.PL
### change model->region region->grid

my $programname = 'extract.gridloc';

### DETERMINE SCRIPT DIRECTORY - this should be automatic but can over-ride here if necessary
### require latlon<->ij conversion scripts to be in current directory
if( $0 =~ m|^/| ) {
	( $SCRIPTDIR = "${0}" ) =~ s|/[^/]*$|| ;
}
else {
	( $SCRIPTDIR = "$ENV{'PWD'}/${0}" ) =~ s|[\./]*/[^/]*$|| ;
}

### PARSE INPUT ARGUMENT
$REGION = $ARGV[0];
shift;
$GRID = $ARGV[0];
shift;

### PARSE GRID LOCATION - must be lat,lon (decimal)

my $tail;

if( $ARGV[0] !~ m|\.| && $ARGV[0] !~ m|\.| ) {
	# ERROR!!!
}
else {
	$alat = $ARGV[0] ; 
	$alon = $ARGV[1] ;
	### assume latlon2ij utility to be in same directory as this script
	$result = `$SCRIPTDIR/latlon2ij.PL $REGION $GRID $alat $alon` ;
	( $aigrid,$ajgrid, $tail ) = split /\s+/, $result ;
	$IGRID = nint( $aigrid );
	$JGRID = nint( $ajgrid );
}

$result = `$SCRIPTDIR/ij2latlon.PL $REGION $GRID $IGRID $JGRID` ;
( $aigrid,$ajgrid, $tail ) = split /\s+/, $result ;

print "$aigrid $ajgrid \n";

#########################################################################
### FIND NEAREST INTEGER
sub nint { int($_[0] + ($_[0] >=0 ? 0.5 : -0.5)); }
#########################################################################
