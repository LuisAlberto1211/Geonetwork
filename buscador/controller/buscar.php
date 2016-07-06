<meta charset="utf-8">
<?php if (isset($_GET['bootstrap']) && $_GET['bootstrap'] == 1):?>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<?php else:?>

<?php endif?>
<link rel="stylesheet" href="style.css" type="text/css">
<?php
    //include 'PaginationPrototype.php';    
    $xml=simplexml_load_file("http://smit.cenapred.gob.mx:8080/geonetwork/srv/eng/rss.search?any=".$_POST["nombre"]) or die("Error: Cannot create object");
    //var_dump($xml);
    //var_dump($xml->item[0]);
    //echo $xml->item->title.'//<br>';
    for($i= 0; $i< count($xml);$i++){
        //echo $xml->attributes->title.'//<br>';
    }

    foreach( $xml->children() AS $child )
    {
        //run any query you want on the children.. they are also nodes.
        $name = $child->getName();
        //echo $name.'//';
    }

    //$simple = simplexml_load_string($xml);

    $arr = json_decode( json_encode($xml) , 1);
    // var_dump($arr);
    //print_r($arr);
    $array = array();
    $array2 = array();
    $i =0;
    $j =0;
    $uudid =array();
    foreach( $arr AS $child ){
        foreach( $child AS $child2 => $valor  ){
            if($child2 == 'item'){
                //$array= $child['item'];
                //var_dump($child['item']);
                //break;
                foreach( $child['item'] AS $child3 => $valor3  ){
                    if($child3 >= 1){
                        foreach( $child['item'][$child3] AS $child4 => $valor4  ){
                            if($child4 == 'guid'){
                                $array2 = explode("=",$valor4);
                                if (isset($array2[1])) {
                                    $uudid[$j] = $array2[1];
                                    $j++;
                                }
                            }
                            if($child4 == 'title'){

                                $array[$i]['title'] = $valor4;
                                //$array[$i]['uudid'] = $uudid;
                                $i++;
                            }
                            
                        }
                        
                    }
                    
                }
            }
        }
    }

    for ($i=0; $i <count($uudid) ; $i++) { 
        $array[$i]['uudid'] = $uudid[$i];
    }
    //var_dump($array);

    $table = '<table>';
    for ($i=0; $i < count($array); $i++) { 
        $table .= '<tr>';
            $table .= '<td>';
                $table .= '<span onclick="jsDetalle(\''.$array[$i]['uudid'].'\')" style="cursor:pointer">'.($i+1).'.- '.$array[$i]['title'].'</span>';
            $table .= '</td>';
        $table .= '</tr>';    
    }
    $table .= '</table>';
    echo $table;


