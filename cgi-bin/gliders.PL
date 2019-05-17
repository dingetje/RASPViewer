### SET POLAR DATA - COEFFS AND WGTS
sub set_glider_data()
{
  ### SET POLAR COEFFS - W=a*V^2+b*V+c where a,b,c for V in km/hr and _negative_ W in m/s ala Reichmann,Herold,etc
  ###   to use V in m/s, W=a'*V^2+b'*V+c where a`=a/kmphr2mps^2 & b'=b/kmphr2mps & kmphr2mps=0.277778 
  ### SET WEIGHT INFO =  dry weight on which polar data based (kg)
  ### SET BALLAST INFO = liters of ballast can carry (1 liter = 1 kg!)
  ### START OF MY POLAR DATA 
     $polar_data{'dg400-jack'}         = '-1.3419e-4,2.077e-2,-1.37'    ; $weight_data{'dg400-jack'}         = '444.' ; $ballast_data{'dg400-jack'}         = '90.'  ; 
  ### START OF HEROLD DATA at http://www.winpilot.com/polar.asp  - his three (V,W) pairs were converted to corresponding a,b,c
     $polar_data{'1-26A'}              = '-0.000356204,0.040847,-2.002' ; $weight_data{'1-26A'}              = '261.' ; $ballast_data{'1-26A'}              = '0.'   ; 
     $polar_data{'1-26E'}              = '-0.000325155,0.041163,-2.221' ; $weight_data{'1-26E'}              = '315.' ; $ballast_data{'1-26E'}              = '0.'   ; 
     $polar_data{'1-34'}               = '-0.000268213,0.038494,-2.097' ; $weight_data{'1-34'}               = '354.' ; $ballast_data{'1-34'}               = '0.'   ; 
     $polar_data{'1-35A'}              = '-0.000203714,0.031158,-1.831' ; $weight_data{'1-35A'}              = '381.' ; $ballast_data{'1-35A'}              = '179.' ; 
     $polar_data{'1-36_Sprite'}        = '-0.000329902,0.045799,-2.252' ; $weight_data{'1-36_Sprite'}        = '322.' ; $ballast_data{'1-36_Sprite'}        = '0.'   ; 
     $polar_data{'604'}                = '+0.000097318,-.082437,8.794'  ; $weight_data{'604'}                = '570.' ; $ballast_data{'604'}                = '100.' ; 
     $polar_data{'ASW-12'}             = '-0.000179391,0.026422,-1.461' ; $weight_data{'ASW-12'}             = '948.' ; $ballast_data{'ASW-12'}             = '189.' ; 
     $polar_data{'ASW-15'}             = '-0.000193631,0.029738,-1.823' ; $weight_data{'ASW-15'}             = '349.' ; $ballast_data{'ASW-15'}             = '91.'  ; 
     $polar_data{'ASW-17'}             = '-0.000154923,0.025872,-1.626' ; $weight_data{'ASW-17'}             = '522.' ; $ballast_data{'ASW-17'}             = '151.' ; 
     $polar_data{'ASW-19'}             = '-0.000225199,0.041617,-2.655' ; $weight_data{'ASW-19'}             = '363.' ; $ballast_data{'ASW-19'}             = '125.' ; 
     $polar_data{'ASW-20'}             = '-0.000174026,0.031346,-2.063' ; $weight_data{'ASW-20'}             = '377.' ; $ballast_data{'ASW-20'}             = '159.' ; 
     $polar_data{'ASW-24'}             = '-0.000127520,0.017509,-1.123' ; $weight_data{'ASW-24'}             = '350.' ; $ballast_data{'ASW-24'}             = '159.' ; 
     $polar_data{'ASW-27_Wnglts'}      = '-0.000130178,0.023032,-1.600' ; $weight_data{'ASW-27_Wnglts'}      = '357.' ; $ballast_data{'ASW-27_Wnglts'}      = '165.' ; 
     $polar_data{'DG-400_15m'}         = '-0.000131050,0.026027,-2.020' ; $weight_data{'DG-400_15m'}         = '440.' ; $ballast_data{'DG-400_15m'}         = '90.'  ; 
     $polar_data{'DG-400_17m'}         = '-0.000109520,0.020602,-1.588' ; $weight_data{'DG-400_17m'}         = '444.' ; $ballast_data{'DG-400_17m'}         = '90.'  ; 
     $polar_data{'DG-800_15m'}         = '-0.000088161,0.013142,-1.058' ; $weight_data{'DG-800_15m'}         = '468.' ; $ballast_data{'DG-800_15m'}         = '120.' ; 
     $polar_data{'DG-800_18m'}         = '-0.000069468,0.006428,-0.521' ; $weight_data{'DG-800_18m'}         = '472.' ; $ballast_data{'DG-800_18m'}         = '120.' ; 
     $polar_data{'DiscusA'}            = '-0.000342455,0.072918,-4.599' ; $weight_data{'DiscusA'}            = '350.' ; $ballast_data{'DiscusA'}            = '182.' ; 
     $polar_data{'GenesisII'}          = '-0.000163640,0.026349,-1.639' ; $weight_data{'GenesisII'}          = '374.' ; $ballast_data{'GenesisII'}          = '151.' ; 
     $polar_data{'H-201_StdLibelle'}   = '-0.000176419,0.023744,-1.433' ; $weight_data{'H-201_StdLibelle'}   = '304.' ; $ballast_data{'H-201_StdLibelle'}   = '50.'  ; 
     $polar_data{'H-301_Libelle'}      = '-0.000329333,0.054431,-2.887' ; $weight_data{'H-301_Libelle'}      = '300.' ; $ballast_data{'H-301_Libelle'}      = '50.'  ; 
     $polar_data{'IS-29D2_Lark'}       = '-0.000178364,0.021373,-1.169' ; $weight_data{'IS-29D2_Lark'}       = '360.' ; $ballast_data{'IS-29D2_Lark'}       = '0.'   ; 
     $polar_data{'Jantar2_SZD-42A'}    = '-0.000156189,0.024749,-1.497' ; $weight_data{'Jantar2_SZD-42A'}    = '482.' ; $ballast_data{'Jantar2_SZD-42A'}    = '191.' ; 
     $polar_data{'Ka-6CR'}             = '-0.000263061,0.037955,-2.120' ; $weight_data{'Ka-6CR'}             = '310.' ; $ballast_data{'Ka-6CR'}             = '0.'   ; 
     $polar_data{'L-33_Solo'}          = '-0.000275409,0.042173,-2.380' ; $weight_data{'L-33_Solo'}          = '330.' ; $ballast_data{'L-33_Solo'}          = '0.'   ;
     $polar_data{'LS-1C'}              = '-0.000221766,0.038698,-2.524' ; $weight_data{'LS-1C'}              = '350.' ; $ballast_data{'LS-1C'}              = '91.'  ; 
     $polar_data{'LS-3'}               = '-0.000285925,0.067384,-4.828' ; $weight_data{'LS-3'}               = '383.' ; $ballast_data{'LS-3'}               = '121.' ; 
     $polar_data{'LS-4a'}              = '-0.000301194,0.059905,-3.706' ; $weight_data{'LS-4a'}              = '361.' ; $ballast_data{'LS-4a'}              = '121.' ; 
     $polar_data{'Nimbus2_20m'}        = '-0.000175297,0.029284,-1.742' ; $weight_data{'Nimbus2_20m'}        = '493.' ; $ballast_data{'Nimbus2_20m'}        = '159.' ; 
     $polar_data{'Nimbus3_25m'}        = '-0.000129521,0.017982,-1.006' ; $weight_data{'Nimbus3_25m'}        = '527.' ; $ballast_data{'Nimbus3_25m'}        = '159.' ; 
     $polar_data{'Nimbus3T'}           = '-0.000122928,0.017572,-1.007' ; $weight_data{'Nimbus3T'}           = '577.' ; $ballast_data{'Nimbus3T'}           = '310.' ; 
     $polar_data{'Nimbus4_26m'}        = '-0.000136821,0.021365,-1.239' ; $weight_data{'Nimbus4_26m'}        = '597.' ; $ballast_data{'Nimbus4_26m'}        = '303.' ; 
     $polar_data{'PIK-20B'}            = '-0.000154165,0.023746,-1.499' ; $weight_data{'PIK-20B'}            = '354.' ; $ballast_data{'PIK-20B'}            = '144.' ; 
     $polar_data{'PIK-20D'}            = '-0.000188824,0.029145,-1.717' ; $weight_data{'PIK-20D'}            = '348.' ; $ballast_data{'PIK-20D'}            = '144.' ; 
     $polar_data{'PIK-20E'}            = '-0.000120307,0.012809,-0.789' ; $weight_data{'PIK-20E'}            = '437.' ; $ballast_data{'PIK-20E'}            = '80.'  ; 
     $polar_data{'PIK-30M'}            = '-0.000126214,0.022729,-1.657' ; $weight_data{'PIK-30M'}            = '460.' ; $ballast_data{'PIK-30M'}            = '0.'   ; 
     $polar_data{'PW-5_Smyk'}          = '-0.000257089,0.034076,-1.796' ; $weight_data{'PW-5_Smyk'}          = '300.' ; $ballast_data{'PW-5_Smyk'}          = '0.'   ; 
     $polar_data{'RussiaAC-4_13m'}     = '-0.000188581,0.023464,-1.388' ; $weight_data{'RussiaAC-4_13m'}     = '250.' ; $ballast_data{'RussiaAC-4_13m'}     = '0.'   ; 
     $polar_data{'StdCirrus'}          = '-0.000238804,0.040618,-2.453' ; $weight_data{'StdCirrus'}          = '337.' ; $ballast_data{'StdCirrus'}          = '80.'  ; 
     $polar_data{'SZD-30'}             = '-0.001935,0.14859,-4.2319'    ; $weight_data{'SZD-30'}             = '340.' ; $ballast_data{'SZD-30'}             = '0.'   ; 
     $polar_data{'SZD-55-1'}           = '-0.000268330,0.053389,-3.320' ; $weight_data{'SZD-55-1'}           = '336.' ; $ballast_data{'SZD-55-1'}           = '201.' ; 
     $polar_data{'VentusA-B_17m'}      = '-0.000153371,0.025876,-1.691' ; $weight_data{'VentusA-B_17m'}      = '358.' ; $ballast_data{'VentusA-B_17m'}      = '151.' ; 
     $polar_data{'VentusB_15m'}        = '-0.000126558,0.018870,-1.316' ; $weight_data{'VentusB_15m'}        = '341.' ; $ballast_data{'VentusB_15m'}        = '151.' ; 
     $polar_data{'ZuniII'}             = '-0.000164235,0.022160,-1.330' ; $weight_data{'ZuniII'}             = '358.' ; $ballast_data{'ZuniII'}             = '182.' ; 
     $polar_data{'ASH-25_25m_Pil'}     = '-0.000094505,0.009998,-0.587' ; $weight_data{'ASH-25_25m_Pil'}     = '602.' ; $ballast_data{'ASH-25_25m_Pil'}     = '120.' ; 
     $polar_data{'ASH-25_25m_Pas'}     = '-0.000088170,0.010025,-0.632' ; $weight_data{'ASH-25_25m_Pas'}     = '693.' ; $ballast_data{'ASH-25_25m_Pas'}     = '120.' ; 
     $polar_data{'ASH-25M_Pil'}        = '-0.000090103,0.009939,-0.609' ; $weight_data{'ASH-25M_Pil'}        = '660.' ; $ballast_data{'ASH-25M_Pil'}        = '121.' ; 
     $polar_data{'ASH-25M_Pas'}        = '-0.000083285,0.009464,-0.603' ; $weight_data{'ASH-25M_Pas'}        = '750.' ; $ballast_data{'ASH-25M_Pas'}        = '121.' ; 
     $polar_data{'DG-500_Pil'}         = '-0.000159462,0.024101,-1.412' ; $weight_data{'DG-500_Pil'}         = '570.' ; $ballast_data{'DG-500_Pil'}         = '160.' ; 
     $polar_data{'DG-500_Pas'}         = '-0.000149216,0.024473,-1.551' ; $weight_data{'DG-500_Pas'}         = '660.' ; $ballast_data{'DG-500_Pas'}         = '160.' ; 
     $polar_data{'DG-500M_Pil'}        = '-0.000148151,0.024048,-1.513' ; $weight_data{'DG-500M_Pil'}        = '659.' ; $ballast_data{'DG-500M_Pil'}        = '100.' ; 
     $polar_data{'DG-500M_Pas'}        = '-0.000139278,0.024190,-1.627' ; $weight_data{'DG-500M_Pas'}        = '750.' ; $ballast_data{'DG-500M_Pas'}        = '100.' ; 
     $polar_data{'DuoDiscus_Pil'}      = '-0.000297310,0.062668,-3.984' ; $weight_data{'DuoDiscus_Pil'}      = '537.' ; $ballast_data{'DuoDiscus_Pil'}      = '201.' ; 
     $polar_data{'DuoDiscus_Pas'}      = '-0.000315738,0.074531,-5.150' ; $weight_data{'DuoDiscus_Pas'}      = '628.' ; $ballast_data{'DuoDiscus_Pas'}      = '201.' ; 
     $polar_data{'Grob103_TwinII_Pil'} = '-0.000187562,0.032256,-2.118' ; $weight_data{'Grob103_TwinII_Pil'} = '494.' ; $ballast_data{'Grob103_TwinII_Pil'} = '0.'   ; 
     $polar_data{'Grob103_TwinII_Pas'} = '-0.000173275,0.032363,-2.306' ; $weight_data{'Grob103_TwinII_Pas'} = '580.' ; $ballast_data{'Grob103_TwinII_Pas'} = '0.'   ; 
     $polar_data{'JanusB_18m_Pil'}     = '-0.000346616,0.069703,-4.190' ; $weight_data{'JanusB_18m_Pil'}     = '508.' ; $ballast_data{'JanusB_18m_Pil'}     = '170.' ; 
     $polar_data{'JanusB_18m_Pas'}     = '-0.000317857,0.069626,-4.559' ; $weight_data{'JanusB_18m_Pas'}     = '603.' ; $ballast_data{'JanusB_18m_Pas'}     = '170.' ; 
     $polar_data{'Nimbus3D_25m_Pil'}   = '-0.000088882,0.009929,-0.621' ; $weight_data{'Nimbus3D_25m_Pil'}   = '621.' ; $ballast_data{'Nimbus3D_25m_Pil'}   = '168.' ; 
     $polar_data{'Nimbus3D_25m_Pas'}   = '-0.000082691,0.009825,-0.658' ; $weight_data{'Nimbus3D_25m_Pas'}   = '712.' ; $ballast_data{'Nimbus3D_25m_Pas'}   = '168.' ; 
     $polar_data{'Nimbus3DM_25m_Pil'}  = '-0.000110902,0.019118,-1.299' ; $weight_data{'Nimbus3DM_25m_Pil'}  = '748.' ; $ballast_data{'Nimbus3DM_25m_Pil'}  = '168.' ; 
     $polar_data{'Nimbus3DM_25m_Pas'}  = '-0.000102798,0.018201,-1.299' ; $weight_data{'Nimbus3DM_25m_Pas'}  = '820.' ; $ballast_data{'Nimbus3DM_25m_Pas'}  = '168.' ; 
     $polar_data{'Nimbus4DM_26m_Pil'}  = '-0.000123583,0.021293,-1.364' ; $weight_data{'Nimbus4DM_26m_Pil'}  = '729.' ; $ballast_data{'Nimbus4DM_26m_Pil'}  = '168.' ; 
     $polar_data{'Nimbus4DM_26m_Pas'}  = '-0.000115756,0.021041,-1.427' ; $weight_data{'Nimbus4DM_26m_Pas'}  = '820.' ; $ballast_data{'Nimbus4DM_26m_Pas'}  = '168.' ; 
     $polar_data{'Nimbus4D_Pil'}       = '-0.000130179,0.021111,-1.274' ; $weight_data{'Nimbus4D_Pil'}       = '652.' ; $ballast_data{'Nimbus4D_Pil'}       = '303.' ; 
     $polar_data{'Nimbus4D_Pas'}       = '-0.000120390,0.020620,-1.322' ; $weight_data{'Nimbus4D_Pas'}       = '743.' ; $ballast_data{'Nimbus4D_Pas'}       = '303.' ; 
     $polar_data{'StemmeS10_Pil'}      = '-0.000121906,0.019098,-1.293' ; $weight_data{'StemmeS10_Pil'}      = '759.' ; $ballast_data{'StemmeS10_Pil'}      = '0.'   ; 
     $polar_data{'StemmeS10_Pas'}      = '-0.000099050,0.012916,-0.785' ; $weight_data{'StemmeS10_Pas'}      = '850.' ; $ballast_data{'StemmeS10_Pas'}      = '0.'   ; 
  ### END OF HEROLD DATA
  return;
}
# Do not delete the next line!
1.
