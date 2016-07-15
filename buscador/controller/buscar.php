<?php
  require "paises.php";
  $resultsPerPage = 10;
  $search_elements_url  = "xml.search?any=";
  $search_element_url   = "csw?request=GetRecordById&service=CSW&version=2.0.2&elementSetName=full&id=";
  $search_metadata_url  = "xml.metadata.get?uuid=";

  if(isset($_GET["search"]) && isset($_GET["text"]) && isset($_GET["country"])){
    $page = isset($_GET["page"]) ? $_GET["page"]: 1;
    $text = $_GET["text"];
    $country = $_GET["country"];
    $base_url = $paises[$country]["url"];
    $xmlStr = file_get_contents($base_url.$search_elements_url.$text);
    $p = xml_parser_create();
    xml_parse_into_struct($p, $xmlStr, $xml_arr, $xml_index);
    xml_parser_free($p);
    $response = Array();
    $uuids = Array();

    $response["length"] = (int)$xml_arr[$xml_index["RESPONSE"][0]]['attributes']['TO'];
    $maxPages = ceil($response["length"]/$resultsPerPage);
    $page = ($page > $maxPages) ? $maxPages : $page;
    $page = ($page < 1) ? 1 : $page;
    $page = ($response["length"] == 0) ? 0 : $page;
    $response["pages"] = $maxPages;
    $response["page"] = (int)$page;

    if($response["length"] != 0){
      $inicio = $resultsPerPage*($page-1);
      $fin = $inicio;
      if(($response["length"]-($resultsPerPage*($page-1))) >= $resultsPerPage){
        $fin += $resultsPerPage;
      } else if($response["length"] < $resultsPerPage){
        $fin += $response["length"];
      } else {
        $fin += $response["length"]%($resultsPerPage*($page-1));
      }

      for($i = $inicio; $i < $fin; $i++){
        $uuids[] = $xml_arr[$xml_index["GEONET:INFO"][$i*2]+2]['value'];
      }

      $response["metadata"] = getDataFromUUID($uuids, $base_url, $search_element_url, $search_metadata_url);
    }
    else{
      $response["metadata"] = [];
    }

    echo json_encode($response);

  } else if(isset($_GET["uuid"])){
    if(isset($_GET["element_info"])){

    } else if(isset($_GET["metadata"])){

    }
  } else if(isset($_GET["countries"])){
    echo json_encode($paises);
  }

  function getDataFromUUID($uuids_array, $base_url, $search_element_url, $search_metadata_url){
    $data_arr = Array();
    $data = Array();
    $contact = Array();
    foreach ($uuids_array as $uuid) {
      $xmlStr = file_get_contents($base_url.$search_element_url.$uuid);
      $p = xml_parser_create();
      xml_parse_into_struct($p, $xmlStr, $xml_arr, $xml_index);
      xml_parser_free($p);
      $data_arr["uuid"] = $xml_arr[$xml_index["DC:IDENTIFIER"][0]]['value'];
      $data_arr["title"] = $xml_arr[$xml_index["DC:TITLE"][0]]['value'];
      $data_arr["abstract"] = $xml_arr[$xml_index["DCT:ABSTRACT"][0]]['value'];
      $data_arr["image_url"] = $base_url.$xml_arr[end($xml_index["DC:URI"])]['value'];

      $xmlStr = file_get_contents($base_url.$search_metadata_url.$uuid);
      $p = xml_parser_create();
      xml_parse_into_struct($p, $xmlStr, $xml_arr, $xml_index);
      xml_parser_free($p);
      $contact["name"] = $xml_arr[$xml_index["GMD:POINTOFCONTACT"][0] + 3]['value'];
      $contact["organisation"] = $xml_arr[$xml_index["GMD:ORGANISATIONNAME"][3] + 1]['value'];
      $contact["phone"] = $xml_arr[$xml_index["GMD:VOICE"][3] + 1]['value'];
      if (isset($xml_arr[$xml_index["GMD:ELECTRONICMAILADDRESS"][3]])) {
        $contact["mail"] = $xml_arr[$xml_index["GMD:ELECTRONICMAILADDRESS"][3] + 1]['value'];
      }
      else {
        unset($contact["mail"]);
      }
      $data_arr["contact"] = $contact;

      $data[] = $data_arr;
    }
    return $data;
  }

?>
