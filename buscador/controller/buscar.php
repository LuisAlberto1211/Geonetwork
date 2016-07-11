<?php
  $base_url = "http://smit.cenapred.gob.mx:8080/geonetwork/srv/eng/";
  $search_elements_url  = $base_url."rss.search?any=";
  $search_element_url   = $base_url."csw?request=GetRecordById&service=CSW&version=2.0.2&elementSetName=full&id=";
  $search_metadata_url  = $base_url."xml.metadata.get?uuid=";

  if(isset($_GET["rss"])){
    $xml = simplexml_load_file($search_elements_url."VOLCAN");
    $response = Array();

    foreach ($xml->channel->item as $item) {
      $uuidArray = explode("=", $item->guid);
      $data["uuid"] = $uuidArray[1];
      $data["title"] = (string)$item->title;
      $response[] = $data;
    }
    echo json_encode($response);

  } else if(isset($_GET["uuid"])){
    if(isset($_GET["element_info"])){

    } else if(isset($_GET["metadata"])){

    }
  } else{

  }

?>
