############################################################
### SITE DEPENDENT VARIABLES USED BY extract.blipspot.PL ###
###   (use separate file to avoid tar update overwrite)  ###
############################################################

### SET SITE DEPENDENT DEFAULT PARAMETERS
if( $#paramdolist == -1 ) { 
  @paramdolist = ( 'wstar','experimental1','hwcrit','hbl','dbl','dwcrit','hglider','sfcsunpct','sfctemp','sfcdewpt','sfcwind0dir','sfcwind0spd','sfcwinddir','sfcwindspd','blwindspd','blwinddir','mslpress','wblmaxmin','zsfclcldif','rain1') ;
}

### SET SITE DEPENDENT REGION DEFAULT TIMES
if( $#timedolist == -1 ) { 
 if ( $REGION eq "NL+0" || $REGION eq 'NL4' || $REGION eq 'NL+1' || $REGION eq 'NL+2' || $REGION eq 'NL+3' || $REGION eq 'NL+4' || $REGION eq 'NL+5' || $REGION eq 'NL+6' ) {
    if( $LARCHIVE == 0 ) {
      # GMT
      @timedolistSTD = ('0930lst','1000lst','1030lst','1100lst','1130lst','1200lst','1230lst','1300lst','1330lst','1400lst','1430lst','1500lst','1530lst','1600lst','1630lst','1700lst','1730lst','1800lst','1830lst','1900lst','1930lst','2000lst');
      # BST
      @timedolistDST = ('0930lst','1000lst','1030lst','1100lst','1130lst','1200lst','1230lst','1300lst','1330lst','1400lst','1430lst','1500lst','1530lst','1600lst','1630lst','1700lst','1730lst','1800lst','1830lst','1900lst','1930lst','2000lst');
    }
    else {
      # GMT
      @timedolistSTD = ('0930lst','1000lst','1030lst','1100lst','1130lst','1200lst','1230lst','1300lst','1330lst','1400lst','1430lst','1500lst','1530lst','1600lst','1630lst','1700lst','1730lst','1800lst','1830lst','1900lst','1930lst','2000lst');
      # BST
      @timedolistDST = ('0930lst','1000lst','1030lst','1100lst','1130lst','1200lst','1230lst','1300lst','1330lst','1400lst','1430lst','1500lst','1530lst','1600lst','1630lst','1700lst','1730lst','1800lst','1830lst','1900lst','1930lst','2000lst');
    }
  }
  else { die "$programname EXIT ERROR: no default times for REGION = $REGION"; }
}

###### SET DATA DIRECTORIES

local $WEB_ROOT_FOLDER="/home/davidrasp/public_html/RASPViewer";

if ( $LARCHIVE==0) {
  $DATADIR = "$WEB_ROOT_FOLDER/${REGION}";
}
elsif ( $LARCHIVE==1) {
  $DATADIR = "$WEB_ROOT_FOLDER/ARCHIVE/${REGION}/";
}
else { die "$programname EXIT ERROR: unknown LARCHIVE value = $LARCHIVE"; }

###### SET SITE DEPENDENT DATA DIRECTORIES
# In olden times, Data Directory might vary with hostname
# $hostname = `hostname`; chomp( $hostname );
# if ( $hostname eq 'rasp' && $LARCHIVE==0) {
#   $DATADIR = "/var/www/html/${REGION}/FCST";
# }
# elsif ( $hostname eq 'rasp' && $LARCHIVE==1) {
#   $DATADIR = "/var/www/html/ARCHIVE/${REGION}/";
# }
# elsif ( $hostname eq 'rasp.inn.leedsmet.ac.uk' && $LARCHIVE==0) {
#   $DATADIR = "/var/www/html/${REGION}/FCST";
# }
# elsif ( $hostname eq 'rasp.inn.leedsmet.ac.uk' && $LARCHIVE==1) {
#   $DATADIR = "/var/www/html/ARCHIVE/${REGION}/";
# }
# else { die "$programname EXIT ERROR: unknown hostname = $hostname"; }
