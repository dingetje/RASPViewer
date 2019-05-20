# RASPViewer
RASPViewer for Dutch RASP BLIPMAPS soaring weather model predictions. For more information about RASP BLIPMAPS look at http://www.drjack.info/

Demo at the production site https://blipmaps.nl/RASPViewer/

# Airspace
Airspace source:
http://3dairspace.org.uk/

Use Google Earth to split the airspace into seperate classes. The Leaflet KML loader does not support .kmz (compressed KML) so make sure to extract (i.e. use 7-zip) and rename the doc.kml to airspace_class_x.kml (where x is de class type i.e. A,B,C, etc.) and place in the airspace folder.
Modify the icon style in the resulting .kml file as follows:

```
	<Style id="khStyle2">
		<IconStyle id="khIconStyle2">
			<color>000000ff</color>
			<Icon>
				<href>img/transpixel.png</href>
				<x>64</x>
				<y>96</y>
				<w>1</w>
				<h>1</h>
				<color>1f00008f</color>
			</Icon>
		</IconStyle>
	</Style>
```

To merge multiple countries into one airspace class, add another `<Folder>` node in the KML file.

# RASP data files
Not included in this repository are the actual RASP data folders. They are expected in NL+0, NL+1, etc. in the root folder.

# CGI scripts
The CGI scripts require Perl to be available on the hosting web server (Apache prefered). The required perl CGI libraries are placed local in the perllib folder, but if they are already installed on your server you can comment out the inclusion of the local perllib folder.

