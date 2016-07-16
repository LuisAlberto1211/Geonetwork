<?php
  $paises = Array();
  $paises[]  = [  "nombre"  =>  "El Salvador",
                  "clave"   =>  "ESA"];
  $paises[]  = [  "nombre"  =>  "Honduras",
                  "clave"   =>  "HON"];
  $paises[]  = [  "nombre"  =>  "México",
                  "clave"   =>  "MEX"];

  $url_geonetwork = Array();
  $url_geonetwork["ESA"] = ["url" => "http://190.86.209.130:8080/geonetwork/srv/eng/"];
  $url_geonetwork["HON"] = ["url" => "http://190.5.105.59:8080/geonetwork/srv/eng/"];
  $url_geonetwork["MEX"] = ["url" => "http://smit.cenapred.gob.mx:8080/geonetwork/srv/eng/"];
?>
