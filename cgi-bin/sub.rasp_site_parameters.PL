############################################
##########  SET SITE DIRECTORIES  ##########
############################################
sub site_directories ()
{
### SET SITE-DEPENDENT BASEDIR FOR APACHE SERVER RUN
###  (USED AS GLOBAL VARIABLES)
  if ( ! defined $ENV{'HOME'} )
  { $ENV{'HOME'} = '/home/davidrasp' ;  }
  else
  {
    ### UNTAINT ENVIRON VARIABLE
    if ( $ENV{'HOME'} =~ m|^([A-Za-z0-9/][A-Za-z0-9_.:/-]*)$| ) { $ENV{'HOME'} = $1 ; }  # filename chars only
  }
  $HOME = $ENV{'HOME'}; 
  $BASEDIR = "/home/davidrasp/rasp";
}

#############################################
##########  SET REGION PARAMETERS  ##########
#############################################
sub region_params ()
{
  my ($REGION) = @_;
  my $routinename = 'region_params' ;
  my ( $localtime_id, $localtime_adj ); 

  if( $REGION eq 'NETHERLANDS' )  
  {
    $localtime_id = 'GMT' ;
    $localtime_adj = substr(`TZ=MET-1MET-2,M3.5.0,M10.5.0 date +%z`, 0, 3) ;
  }
  elsif( $REGION eq 'BLOIS' )  
  {
    $localtime_id = 'GMT' ;
    $localtime_adj = substr(`TZ=MET-1MET-2,M3.5.0,M10.5.0 date +%z`, 0, 3) ;
  }
  elsif( $REGION eq 'HONGARIJE' )  
  {
    $localtime_id = 'GMT' ;
    $localtime_adj = substr(`TZ=MET-1MET-2,M3.5.0,M10.5.0 date +%z`, 0, 3) ;
  }
  elsif( $REGION eq 'LONGMYND' )  
  {
    $localtime_id = 'GMT' ;
    $localtime_adj = substr(`TZ=MET0MET-1,M3.5.0,M10.5.0 date +%z`, 0, 3) ;
  }

  else
  { die "*** $routinename ERROR EXIT:  unknown region = $REGION"; }

  return ( $localtime_id, $localtime_adj ); 
}

###########################################
##########  SET GRID PARAMETERS  ##########
###########################################
sub grid_params ()
{

  my ($REGION,$GRID) = @_;
  my $routinename = 'grid_params' ;
  my ( $grid_imin,$grid_imax, $grid_jmin,$grid_jmax ) ;

  $grid_imin = 1 ;
  $grid_jmin = 1 ; 

  ### "$grid_imax" VALUES OBTAINED BY SUBTRACTING 1 FROM "e_we" VALUES IN $BASEDIR/WRF/WRFV2/RASP/REGIONXYZ/namelist.template
  ### "$grid_jmax" VALUES OBTAINED BY SUBTRACTING 1 FROM "e_sn" VALUES IN $BASEDIR/WRF/WRFV2/RASP/REGIONXYZ/namelist.template
   
  ### *** N*B *** DATAFILE GRID INDEX MAX IS ONE LESS THAN THAT OF WRF INIT FILE !!!
  if (substr($REGION,0,3) eq 'NL+')  { $REGION='NETHERLANDS'; }

  if( $REGION eq 'NETHERLANDS' )  
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      ### SET GRID SIZE
      $grid_imax = 120 ;
      $grid_jmax = 105 ;
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET GRID SIZE
      $grid_imax = 162 ;
      $grid_jmax = 135 ;
    }
    elsif( $GRID eq 'd3' || $GRID eq 'w2' || $GRID eq '3' )
    {
      ### SET GRID SIZE
      $grid_imax = 177 ;
      $grid_jmax = 237 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  elsif( $REGION eq 'BLOIS' )  
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      ### SET GRID SIZE
      $grid_imax = 120 ;
      $grid_jmax = 105 ;
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET GRID SIZE
      $grid_imax = 162 ;
      $grid_jmax = 117 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  elsif( $REGION eq 'HONGARIJE' )  
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      ### SET GRID SIZE
      $grid_imax = 99 ;
      $grid_jmax = 69 ;
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET GRID SIZE
      $grid_imax = 126 ;
      $grid_jmax = 144 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  elsif( $REGION eq 'LONGMYND' )  
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      ### SET GRID SIZE
      $grid_imax = 19 ;
      $grid_jmax = 19 ;
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET GRID SIZE
      $grid_imax = 27 ;
      $grid_jmax = 45 ;
    }
    elsif( $GRID eq 'd3' || $GRID eq 'w2' || $GRID eq '3' )
    {
      ### SET GRID SIZE
      $grid_imax = 57 ;
      $grid_jmax = 111 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  else
  { die "*** $routinename ERROR EXIT:  unknown region = $REGION"; }

  return ( $grid_imin,$grid_imax, $grid_jmin,$grid_jmax ) ;

}

############################################
##########  SET IMAGE PARAMETERS  ##########
############################################
sub image_params ()
{

  my ($REGION,$GRID) = @_;
  my $routinename = 'image_params' ;
  my ( $image_mapwidth,$image_mapheight, $image_maporiginx, $image_maporiginy );

  ### GRID 2 VALUES OBTAINED BY FINDING LINES ala "VIEWPORT: 0.602933x0.82@0.198534,0.89" in $BASEDIR/WRF/NCL/rasp.ncl.out.REGIONXYZ.02
  ### GRID 3 VALUES OBTAINED BY FINDING LINES ala "VIEWPORT: 0.602933x0.82@0.198534,0.89" in $BASEDIR/WRF/NCL/rasp.ncl.out.REGIONXYZ-WINDOW.02
  ###    where the VIEWPORT values represent:  $image_mapwidth x $image_mapheight @ $image_maporiginx , $image_maporiginy

  if (substr($REGION,0,3) eq 'NL+')  { $REGION='NETHERLANDS'; }
  if( $REGION eq 'NETHERLANDS' )
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      die "$routinename - no data for $REGION  $GRID ";
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
#VIEWPORT: 0.82x0.682482@0.09,0.821241
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.82 ;
      $image_mapheight = 0.682482 ;
      $image_maporiginx = 0.09 ;
      $image_maporiginy = 0.821241 ;
    }
    elsif( $GRID eq 'd3' || $GRID eq 'w2' || $GRID eq '3' )
    {
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.611446 ;
      $image_mapheight = 0.82 ;
      $image_maporiginx = 0.194277 ;
      $image_maporiginy = 0.89 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }
    
  elsif( $REGION eq 'BLOIS' )
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      die "$routinename - no data for $REGION  $GRID ";
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.82 ;
      $image_mapheight = 0.590806 ;
      $image_maporiginx = 0.09 ;
      $image_maporiginy = 0.775403 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }
    
  elsif( $REGION eq 'HONGARIJE' )
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      die "$routinename - no data for $REGION  $GRID ";
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.716788 ;
      $image_mapheight = 0.82 ;
      $image_maporiginx = 0.141606 ;
      $image_maporiginy = 0.89 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  elsif( $REGION eq 'LONGMYND' )
  {
    if( $GRID eq 'd1' || $GRID eq '1' )
    {
      die "$routinename - no data for $REGION  $GRID ";
    }
    elsif( $GRID eq 'd2' || $GRID eq 'w1' || $GRID eq '2' )
    {
#VIEWPORT: 0.484552x0.82@0.257724,0.89
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.484552 ;
      $image_mapheight = 0.82 ;
      $image_maporiginx = 0.257724 ;
      $image_maporiginy = 0.89 ;
    }
    elsif( $GRID eq 'd3' || $GRID eq 'w2' || $GRID eq '3' )
    {
#VIEWPORT: 0.417383x0.82@0.291309,0.89
      ### SET IMAGE VIEWPORT SIZE, ORIGIN
      ### here "map" is same as "viewport", with values between 0.0 and 1.0
      $image_mapwidth = 0.417383 ;
      $image_mapheight = 0.82 ;
      $image_maporiginx = 0.291309 ;
      $image_maporiginy = 0.89 ;
    }
    else
    { die "*** $routinename ERROR EXIT:  $REGION unknown grid = $GRID"; }
  }

  else
  { die "*** $routinename ERROR EXIT:  unknown region = $REGION"; }

  return ( $image_mapwidth,$image_mapheight, $image_maporiginx, $image_maporiginy );

}

### FILE MUST END WITH FOLLOWING LINE:
1;
