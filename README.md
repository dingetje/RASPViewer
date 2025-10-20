# RASPViewer
RASPViewer for Dutch RASP BLIPMAPS soaring weather model predictions. For more information about RASP BLIPMAPS look at http://www.drjack.info/

Demo at the production site https://blipmaps.nl/NETHERLANDS/

# Airspace
The airspace layer is courtesey of openaip.net. Looks much better and is much, much faster.
> [!IMPORTANT]
> Make sure to request your own API key as explained here: [https://docs.openaip.net/](https://docs.openaip.net/)

Airspace source:
https://maps.openaip.net/

# RASP data files
Not included in this repository are the actual RASP data folders. They are expected in NL+0, NL+1, etc. in the root folder.

# CGI scripts
The CGI scripts require Perl to be available on the hosting web server (Apache prefered). The required perl CGI libraries are placed local in the perllib folder, but if they are already installed on your server you can comment out the inclusion of the local perllib folder.

