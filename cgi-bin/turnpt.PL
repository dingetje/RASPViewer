#! /usr/bin/perl -wT

# Untaint PATH
$ENV{'PATH'} = '/bin:/usr/bin';

############################################
#### Get Lat, Lon & Place from Trigraph ####
####                                    ####
#### I/P:     Trigraph, eg "LAS"        ####
#### Reads:   TurnPts.js                ####
#### Returns: lat, lon, descr           ####
############################################
sub turnPoint
{
	my $ID = $_[0];  ## NB Must be Upper Case
	my $inputfile = "../TurnPts.js";
	my @FILE;
	my $line;

	if( -f $inputfile){ @FILE = `cat $inputfile`; }
	else{ return(0, 0, "NotPresent"); }

	for($i = 0; $i < $#FILE; $i++){
		chomp($line = $FILE[$i]);
		print "$line\n";
		if( $line =~ m/turnPts\["[A-Z0-9]*"\] = { code: "([A-Z0-9]*)", latlon: "([-0-9,.+]*)", desc: "([-\/,A-Za-z0-9' ]*)"/ ){
			print "$1\n";
			if( $1 eq $ID){
				($lat, $lon) = split /,/, $2;
				return($lat, $lon, $3);
			}
		}
		if ($i == 2){ last };
		# else{ print "ERROR LINE $i == $line \n"; } # Silently ignore Errors(?)
	}
	return(0, 0, "NotPresent");
}


# Standalone test:
 my $id = "Ameland";
 ($Lat, $Lon, $desc) = turnPoint($id);
 print "$id : $desc $Lat,$Lon\n";

# File must finish with this line
1.
