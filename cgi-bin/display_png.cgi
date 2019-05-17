#! /usr/bin/perl -w

#### convert ncgm file to png and send to browser  
### query string args: file= 
### e.g. www.drjack.info/cgi-bin/display_png.cgi&file=/tmp/plot.png

###############################################################################
### FOR VISUAL DEBUGGER:  perl -d:ptkdb example.pl
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
### for cgi use taint checking option -T
### for non-buffered ouput:
     $|=1; #(autoflush HANDLE EXPR)
###############################################################################
use lib "../perllib/usr/share/perl5/vendor_perl/";

use CGI::Carp qw(fatalsToBrowser);

$ENV{'PATH'} = '/bin:/usr/bin:/usr/local:/var/www/cgi-bin';

### PARSE CGI INPUT
use CGI qw(:standard);
$query = new CGI;
$file = $query->param('file');

if ( $file  =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) {  # filename chars only
  $file = $1;
}
# test for file existence
if( ! $file || ! -r $file )
{
 print "Content-Type: text/plain\n\n File not found";
 print join("\n", `ls /tmp`);
 exit;
}

my $pngout=`cat $file` ;

if( defined $pngout && $pngout ne "" )
{
    print "Content-Type: image/png\n\n";
    print $pngout ;
}
else
  { print "Content-Type: text/plain\n\n No, or zero-length, file to display"; }

#PAULS
{ `/bin/rm -f $file` }
