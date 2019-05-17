#! /bin/bash

# Return nearest grid latlon for lat $2, lon $3 in Region $1

./ij2latlon.PL $1 2 `./latlon2ij.PL -n $1 2 $2 $3`
