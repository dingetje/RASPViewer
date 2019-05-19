# RASPViewer
RASPViewer for Dutch RASP BLIPMAPS soaring weather model predictions.

Demo at the production site https://blipmaps.nl/RASPViewer/

Airspace source:
http://3dairspace.org.uk/

Use Google Earth to split the airspace into seperate classes. The Leaflet KML loader does not support .kmz (compressed KML) so make sure to extract (i.e. use 7-zip) and rename the doc.kml to airspace_class_xxx.kml and place in the airspace folder.

#RASP data files
Not included in this repository are the actual RASP data folders. They are expected in NL+0, NL+1, etc. in the root folder.

#CGI scripts
The CGI scripts require Perl to be available on the hosting web server (Apache prefered). The required perl CGI libraries are placed local in the perllib folder, but if they are already installed on your server you can comment out the inclusion of the local perllib folder.

