import React, { useState, useEffect } from "react"
import {  SafeAreaView, StyleSheet, Dimensions, Alert } from "react-native"
import {  Text, Layout } from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, {Marker, Polyline} from "react-native-maps"
import { TopBasic } from "../../components/navigations/TopBasic";
import { LinearGradient } from "expo-linear-gradient";



const WalkHistoryMapScreen = ({ route, navigation }) => {
  const raw = "34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87731098471585,128.53162992622995|34.87729352594083,128.5316769890143|34.87727654929104,128.53172275215672|34.877263634180544,128.53175756680207|34.87725353877179,128.53178478051234|34.8772415294722,128.5318171534065|34.87723089349885,128.53184582429094|34.87722082730978,128.5318729592351|34.87720636355478,128.5319119484873|34.877208333333336,128.53191388888888|34.87718935813699,128.53195445044855|34.877178094252294,128.53198494958204|34.87715984429703,128.53203436484478|34.87714710831085,128.5320688499761|34.87713651123171,128.53209754360535|34.87711502470483,128.53215572250804|34.87709026057216,128.5322227761586|34.87706559389571,128.5322895659277|34.8770466771349,128.5323407866947|34.877031232892264,128.53238260495104|34.877027777777776,128.53239722222222|34.87701353264413,128.53243848374777|34.87699355499674,128.5324876594952|34.87697630157399,128.53253012945888|34.87696485983049,128.53255829375058|34.876955555555554,128.5325777777778|34.876955555555554,128.5325777777778|34.87694615099169,128.53256658203625|34.87694583393973,128.5325663763809|34.87694218783904,128.53256401134257|34.87694218783904,128.53256401134257|34.87694218783904,128.53256401134257|34.87694060257793,128.53256298306508|34.87691862028738,128.53254872428164|34.87687486707411,128.53252034381828|34.87685277777778,128.5325138888889|34.876818951038665,128.53248416541513|34.8767705091833,128.5324490736766|34.876733127046876,128.53242199370314|34.876713274062695,128.5324076120135|34.876711136710995,128.53240606369567|34.876700076992066,128.5323980519306|34.87665942427711,128.53236860271912|34.87660269121894,128.5323275047548|34.87655488052798,128.53229287023774|34.87653766695791,128.53228040056464|34.87651253514549,128.53226219484185|34.8765,128.53225833333335|34.87649000876181,128.53224648979372|34.87646107006326,128.53222496346334|34.876435707916734,128.53220609758574|34.876408557494194,128.53218590148177|34.876367144785924,128.5321550962388|34.87632972275687,128.53212725950112|34.87629940990938,128.5321047109968|34.876274417967494,128.5320861204995|34.87624809579922,128.53206654050044|34.87624809579922,128.53206654050044|34.87623474961275,128.53205661281075|34.87621241812362,128.53204000131691|34.876182563325784,128.53201779353725|34.87614023451828,128.53198630684506|34.876106803168355,128.53196143861257|34.87607869272408,128.53194052838714|34.87605104032935,128.5319199588863|34.87602563426033,128.5319010603365|34.87599752381603,128.53188015011108|34.8759680831453,128.53185825038386|34.875931075243344,128.5318307216986|34.8758967717167,128.53180520468908|34.87586824714525,128.53178398641114|34.87584105280019,128.53176375763496|34.87581340040552,128.53174318813416|34.87578620606046,128.531722959358|34.87576079999144,128.5317040608082|34.875733147596755,128.5316834913074|34.875708333333336,128.53166666666667|34.87570210809588,128.53165595242837|34.87567376822631,128.5316329262852|34.875648147310976,128.53161210929227|34.87562524534987,128.53159350144955|34.87560443489189,128.5315765929531|34.87558059175414,128.53155722040438|34.87555664404148,128.53153776288858|34.87553531070811,128.53152042955585|34.87553055555556,128.53152222222224|34.87553055555556,128.53152222222224|34.87554979781898,128.53147895701431|34.87555,128.53146388888888|34.87555158119658,128.53145401709403|34.87555431623932,128.53143213675216|34.87555833333333,128.53140555555555|34.87555718070047,128.53139253147836|34.87556039930977,128.53135133327945|34.87556348647847,128.53131181752002|34.875565478308935,128.53128632209012|34.875572222222225,128.531225|34.875572038334205,128.53121665959415|34.87557429912536,128.53115787902627|34.87557579674564,128.53111894090057|34.87557697432651,128.53108832379894|34.875577848280265,128.53106560100227|34.87557915715935,128.53103157014718|34.875581417950514,128.5309727895793|34.875584634756805,128.53088915261884|34.87558730995795,128.53081959739154|34.87558888888889,128.5307861111111|34.87558895164533,128.53076405413333|34.87558977273436,128.53073613710657|34.87559034173464,128.53071679109675|34.875591061988175,128.53069230247675|34.87559195270171,128.5306620182167|34.87559300667271,128.53062618320277|34.875594576825414,128.53057279801118|34.87559596691473,128.5305255349746|34.87559760909278,128.530469700921|34.8756,128.5304138888889|34.875603158330755,128.53039826032926|34.8756173112768,128.53033356114733|34.875619444444446,128.530325|34.875619444444446,128.530325|34.875654102492646,128.5302889700215|34.87566944444445,128.5302722222222|34.875668637272604,128.53026500402848|34.87568495187676,128.53023142075068|34.875693593034065,128.53021363310575"
  const gps_split = raw.split('|')
  const arr = [];

  for (const i in gps_split) {
      const new_arr = new Array();
      const dat = gps_split[i].split(',')
      for (const e in dat) {
          new_arr.push(parseFloat(dat[e]));
      }
      arr.push(new_arr)
  }   
  const { start } = route.params
  const { height, width } = Dimensions.get( 'window' );
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  
  const datas = [[36.348310901195, 127.29743274887], [36.348310901195, 127.29743274887], [36.3482977192412, 127.297476235729], [36.3482844216139, 127.297520104191], [36.3482717312722, 127.297561969237], [36.348262547282, 127.297592266937], [36.3482545320757, 127.297618708855], [36.3482545320757, 127.297618708855], [36.3482545320757, 127.297618708855], [36.3482545320757, 127.297618708855], [36.3482106460495, 127.297763487501], [36.3481928853548, 127.297822079485], [36.3481789105558, 127.297868181915], [36.3481668756969, 127.297907884543], [36.3481532985254, 127.297952675213], [36.3481532985254, 127.297952675213], [36.3481532985254, 127.297952675213], [36.3481532985254, 127.297952675213], [36.3482085470085, 127.298201709402], [36.3482423504273, 127.298221025641], [36.3482764529914, 127.298240512821], [36.3483048717949, 
    127.298256752137], [36.3483296153846, 127.298283589744], [36.3483296153846, 127.298283589744], [36.3483296153846, 127.298283589744], [36.3483296153846, 127.298283589744], [36.3484061971867, 127.298443494021], [36.3484061971867, 127.298443494021], [36.3484061971867, 127.298443494021], [36.3484061971867, 127.298443494021], [36.3483600350699, 127.29857462119], [36.3483451951856, 127.298616775062], [36.3483294852393, 127.298661400416], [36.3483117288717, 127.298711838792], [36.34829658269, 127.298754862727], [36.34829658269, 127.298754862727], [36.34829658269, 127.298754862727], [36.34829658269, 127.298754862727], [36.34825, 127.298891666667], [36.3482388214281, 127.298925800445], [36.3482219033198, 127.298960504256], [36.3482060793495, 127.298992963682], [36.3481864669264, 127.299033194292], [36.3481652269732, 127.299076763426], [36.3481483362183, 127.299111411128], [36.3481298452867, 127.299149341243], [36.3481080719411, 127.299194004515], [36.3480890202638, 127.299233084878], [36.3480721568623, 127.299267676469], [36.3480552661075, 127.299302324171], [36.3480378966672, 127.299337953791], [36.3480378966672, 127.299337953791], [36.3480378966672, 127.299337953791], [36.3480378966672, 127.299337953791], [36.347952305459, 127.299462830747], [36.347952305459, 127.299462830747], [36.347952305459, 127.299462830747], [36.3478722266905, 127.299586201966], [36.3478722266905, 127.299586201966], [36.3478722266905, 127.299586201966], [36.3477638114388, 127.299705832589], [36.3477638114388, 127.299705832589], [36.3477638114388, 127.299705832589], [36.3477638114388, 127.299705832589], [36.3477233824844, 127.299750443849], [36.3477267515639, 127.299746726244], [36.3477267515639, 127.299746726244], [36.3477327554364, 127.299740101281], [36.347733489723, 127.299739291034], [36.347735735776, 127.29973681263], [36.347735735776, 127.29973681263], [36.347735735776, 127.29973681263], [36.3477400983021, 127.299731998808], [36.3477400983021, 127.299731998808], [36.3477518900804, 127.299718987191], [36.3477518900804, 127.299718987191], [36.3477611766458, 127.299708739946], [36.3477611766458, 127.299708739946], [36.3477611766458, 127.299708739946], [36.3477611766458, 127.299708739946], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477665758117, 127.299702782246], [36.3477632067322, 127.299706499851], [36.3477632067322, 127.299706499851], [36.3477632067322, 127.299706499851], [36.3477632067322, 127.299706499851], [36.3477595784927, 127.299710503426], [36.3477595784927, 127.299710503426], [36.3477632067322, 127.299706499851], [36.3477732275842, 127.299695442359], [36.3480500603661, 127.299914115321], [36.3480500603661, 127.299914115321], [36.3480500603661, 127.299914115321], [36.3480500603661, 127.299914115321], [36.3480066076916, 127.29996750815], [36.3480066076916, 127.29996750815], [36.3480066076916, 127.29996750815], [36.3480066076916, 127.29996750815], [36.347744979148, 127.299726613047], [36.347748132261, 127.29972313375], [36.3477574188263, 127.299712886506], [36.3477803976765, 127.299687530533], [36.3478047587131, 127.299660649389], [36.3478277375633, 127.299635293417], [36.347849075067, 127.299611748585], [36.3478721834972, 127.299586249628], [36.3478912270283, 127.29955881114], [36.3479133021915, 127.299524121597], [36.3479340048056, 127.299491588917], [36.3479556224524, 127.299457618329], [36.3479698054588, 127.299435330747], [36.3479815865045, 127.299416817675], [36.3480020603606, 127.299384644472], [36.3480282531708, 127.299343484341], [36.3480623506503, 127.299287791776], [36.3480623506503, 127.299287791776], [36.3480623506503, 127.299287791776], [36.3481469685451, 127.299114216611], [36.3481469685451, 127.299114216611], [36.3481469685451, 127.299114216611], [36.3482190722369, 127.298966311606], [36.3482190722369, 127.298966311606], [36.3482190722369, 127.298966311606], [36.3483055807288, 127.298729303081], [36.3483317181022, 127.298655057791], [36.3483498295972, 127.298603610647], [36.3483594491094, 127.298576285657], [36.3483699386836, 127.298546489186], [36.3483807345552, 127.298515822653], [36.3483909178321, 127.298486896245], [36.3484031475303, 127.298452156813], [36.3483562393162, 127.298298803419], [36.3483562393162, 127.298298803419], [36.3483562393162, 127.298298803419], [36.348355940171, 127.298298632479], [36.3483548290598, 127.298285299145], [36.3483638034188, 127.29829042735], [36.3483826495726, 127.298301196581], [36.3484023931624, 127.298312478632], [36.3484155555556, 127.29832], [36.3484254273504, 127.298325641026], [36.3484254273504, 127.298325641026], [36.3484254273504, 127.298325641026], [36.3484505282035, 127.298324988175], [36.3484505282035, 127.298324988175], [36.3484505282035, 127.298324988175], [36.3484505282035, 127.298324988175], [36.3484118803419, 127.298330598291], [36.3483924358974, 127.29831948718], [36.3483750854701, 127.29830957265], [36.3483565384615, 127.298298974359], [36.3483323076923, 127.298285128205], [36.3483056837607, 127.29826991453], [36.3482808547008, 127.298255726496], [36.3482593162393, 127.298243418803], [36.3482288034188, 127.298225982906], [36.3482015811966, 127.29821042735], [36.3481767521367, 127.298196239316], [36.3481694444445, 127.298188888889], [36.3481694444445, 127.298188888889], [36.3481390417609, 127.298165002797], [36.3481107088907, 127.29813780324], [36.348102382496, 127.298129809901], [36.3481, 127.298119444444], [36.3481, 127.298119444444], [36.3480924437485, 127.298114470585], [36.3481112078479, 127.298091531059], [36.348123943977, 127.298049514962], [36.3481379886621, 127.29800318198], [36.3481502572777, 127.297962708195], [36.3481634609204, 127.297919149786], [36.3481769682059, 127.297874589668], [36.3481935601168, 127.297819853466], [36.348208679601, 127.297769974754], [36.3482198734175, 127.297733046699], [36.3482353206431, 127.297682086778], [36.3482506039981, 127.297631667462], [36.3482623352141, 127.297592966542], [36.3482736688027, 127.297555577383], [36.3482860771904, 127.297514642495], [36.3483052862132, 127.297451272522], [36.3483254302631, 127.297384817923], [36.3483118376318, 127.297201332079], [36.3483114680246, 127.297201156858], [36.3483110984175, 127.297200981637], [36.348310493606, 127.297200694911], [36.3483918964398, 127.297161018672], [36.3484116019348, 127.297097210401], [36.3484266085158, 127.297048617662], [36.3484277777778, 127.297038888889], [36.3484410130719, 127.296991503268], [36.3484498366013, 127.29695620915], [36.3484498366013, 127.29695620915], [36.3484498366013, 127.29695620915], [36.3484498366013, 127.29695620915]]

  const nData = arr.map(data => {return { latitude: data[0], longitude: data[1]}});
  const dummy=  {
    "startId": 21,
    "startTime": "2020-06-08T10:42:30",
    "small": 2,
    "big": 1,
    "distance": 404.0,
    "gps": "34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87806388888889,128.53103055555556|34.87731098471585,128.53162992622995|34.87729352594083,128.5316769890143|34.87727654929104,128.53172275215672|34.877263634180544,128.53175756680207|34.87725353877179,128.53178478051234|34.8772415294722,128.5318171534065|34.87723089349885,128.53184582429094|34.87722082730978,128.5318729592351|34.87720636355478,128.5319119484873|34.877208333333336,128.53191388888888|34.87718935813699,128.53195445044855|34.877178094252294,128.53198494958204|34.87715984429703,128.53203436484478|34.87714710831085,128.5320688499761|34.87713651123171,128.53209754360535|34.87711502470483,128.53215572250804|34.87709026057216,128.5322227761586|34.87706559389571,128.5322895659277|34.8770466771349,128.5323407866947|34.877031232892264,128.53238260495104|34.877027777777776,128.53239722222222|34.87701353264413,128.53243848374777|34.87699355499674,128.5324876594952|34.87697630157399,128.53253012945888|34.87696485983049,128.53255829375058|34.876955555555554,128.5325777777778|34.876955555555554,128.5325777777778|34.87694615099169,128.53256658203625|34.87694583393973,128.5325663763809|34.87694218783904,128.53256401134257|34.87694218783904,128.53256401134257|34.87694218783904,128.53256401134257|34.87694060257793,128.53256298306508|34.87691862028738,128.53254872428164|34.87687486707411,128.53252034381828|34.87685277777778,128.5325138888889|34.876818951038665,128.53248416541513|34.8767705091833,128.5324490736766|34.876733127046876,128.53242199370314|34.876713274062695,128.5324076120135|34.876711136710995,128.53240606369567|34.876700076992066,128.5323980519306|34.87665942427711,128.53236860271912|34.87660269121894,128.5323275047548|34.87655488052798,128.53229287023774|34.87653766695791,128.53228040056464|34.87651253514549,128.53226219484185|34.8765,128.53225833333335|34.87649000876181,128.53224648979372|34.87646107006326,128.53222496346334|34.876435707916734,128.53220609758574|34.876408557494194,128.53218590148177|34.876367144785924,128.5321550962388|34.87632972275687,128.53212725950112|34.87629940990938,128.5321047109968|34.876274417967494,128.5320861204995|34.87624809579922,128.53206654050044|34.87624809579922,128.53206654050044|34.87623474961275,128.53205661281075|34.87621241812362,128.53204000131691|34.876182563325784,128.53201779353725|34.87614023451828,128.53198630684506|34.876106803168355,128.53196143861257|34.87607869272408,128.53194052838714|34.87605104032935,128.5319199588863|34.87602563426033,128.5319010603365|34.87599752381603,128.53188015011108|34.8759680831453,128.53185825038386|34.875931075243344,128.5318307216986|34.8758967717167,128.53180520468908|34.87586824714525,128.53178398641114|34.87584105280019,128.53176375763496|34.87581340040552,128.53174318813416|34.87578620606046,128.531722959358|34.87576079999144,128.5317040608082|34.875733147596755,128.5316834913074|34.875708333333336,128.53166666666667|34.87570210809588,128.53165595242837|34.87567376822631,128.5316329262852|34.875648147310976,128.53161210929227|34.87562524534987,128.53159350144955|34.87560443489189,128.5315765929531|34.87558059175414,128.53155722040438|34.87555664404148,128.53153776288858|34.87553531070811,128.53152042955585|34.87553055555556,128.53152222222224|34.87553055555556,128.53152222222224|34.87554979781898,128.53147895701431|34.87555,128.53146388888888|34.87555158119658,128.53145401709403|34.87555431623932,128.53143213675216|34.87555833333333,128.53140555555555|34.87555718070047,128.53139253147836|34.87556039930977,128.53135133327945|34.87556348647847,128.53131181752002|34.875565478308935,128.53128632209012|34.875572222222225,128.531225|34.875572038334205,128.53121665959415|34.87557429912536,128.53115787902627|34.87557579674564,128.53111894090057|34.87557697432651,128.53108832379894|34.875577848280265,128.53106560100227|34.87557915715935,128.53103157014718|34.875581417950514,128.5309727895793|34.875584634756805,128.53088915261884|34.87558730995795,128.53081959739154|34.87558888888889,128.5307861111111|34.87558895164533,128.53076405413333|34.87558977273436,128.53073613710657|34.87559034173464,128.53071679109675|34.875591061988175,128.53069230247675|34.87559195270171,128.5306620182167|34.87559300667271,128.53062618320277|34.875594576825414,128.53057279801118|34.87559596691473,128.5305255349746|34.87559760909278,128.530469700921|34.8756,128.5304138888889|34.875603158330755,128.53039826032926|34.8756173112768,128.53033356114733|34.875619444444446,128.530325|34.875619444444446,128.530325|34.875654102492646,128.5302889700215|34.87566944444445,128.5302722222222|34.875668637272604,128.53026500402848|34.87568495187676,128.53023142075068|34.875693593034065,128.53021363310575|",
    "endTime": "2020-06-08T10:55:53",
    "timeDelta": 803.0
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <TopBasic screenName="산책 기록 보기" />

      <Layout style={styles.map}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: arr[0][0],
          longitude: arr[0][1],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={nData[1]}
          title={'시작'}
          pinColor={'525252'}
          description={'산책 시작 위치입니다.'}
          onPress={() => console.log('haha')}
        />
        <Marker
          coordinate={nData[nData.length-1]}
          title={'종료'}
          pinColor={'black'}
          description={'산책 종료 위치입니다.'}
          onPress={() => console.log('haha')}
        />
        <Polyline
         coordinates={nData}
        strokeColor="black" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#13A0F2',
        ]}
        strokeWidth={3}
      />
      </MapView>
      </Layout>


      <Layout style={styles.info}>
      
        <Layout style={styles.infoHeader}>
        <LinearGradient
        colors={["#83a4d4", "#b6fbff"]}
        style={styles.linear}
      />
            <Text style={{
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold'
              }} >
                {dummy.startTime.split('T')[0]} 1번째 산책!
            </Text>
        </Layout>
        <Layout style={styles.infoData}>
          <Text style={styles.txt}>
              
            산책 시간                {parseInt(dummy.timeDelta / 60)} 분
          </Text>
          
          <Text style={{ fontSize: 18, marginTop: -20 }}>
            ({dummy.startTime.split('T')[1]} ~ {dummy.endTime.split('T')[1]})
          </Text>
          
          <Text style={styles.txt}>
            산책한 거리          {dummy.distance} m
          </Text>
          {/* {'\n'} */}
          <Text style={styles.txt}>
                   산책 동안 배변 활동 {'\n'}{'\n'}
          대변: {dummy.big}회             소변: {dummy.small}회
          </Text>
        </Layout>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 3,
    borderTopColor: '#83a4d4',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  linear: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "160%",
  },
  infoHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    borderTopWidth: 3,
    borderTopColor: '#83a4d4',
    borderBottomColor: '#83a4d4',
    borderBottomWidth: 3,
    shadowOpacity: 0.24,
    shadowRadius: 6.27,
    shadowOffset: {width: 5, height: 8},
    elevation: 4
  
  },
  infoData: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",

  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  txt: {
    fontSize: 22,
    marginBottom: 10
  }
})

export default WalkHistoryMapScreen
