<?php
    //echo $_POST["uuid"].'<br>';
    $url = "http://smit.cenapred.gob.mx:8080/geonetwork/srv/eng/csw?request=GetRecordById&service=CSW&version=2.0.2&elementSetName=full&id=".$_POST["uuid"];
    $xml = file_get_contents($url);
    
    $p =xml_parser_create();
    xml_parse_into_struct($p, $xml, $vals, $index);
    xml_parser_free($p);
    
    $detalle = '';
    $title = '';
    
    for ($i=0; $i < count($vals); $i++) { 
        if ($vals[$i]['tag'] == 'DCT:ABSTRACT') {
            $detalle = $vals[$i]['value'];
        }
        if ($vals[$i]['tag'] == 'DC:TITLE') {
            $title = $vals[$i]['value'];
        }
    }

    $table = '<table>';
        $table .= '<tr>';
            $table .= '<td>';
                $table .= '<strong>Titulo:</strong>';
            $table .= '</td>';
            $table .= '<td>';
                $table .= $title;
            $table .= '</td>';
        $table .= '</tr>';
        $table .= '<tr>';
            $table .= '<td colspan="2" >';
                $table .= '<hr />';
            $table .= '</td>';
        $table .= '</tr>';
        $table .= '<tr>';
            $table .= '<td>';
                $table .= '<strong>Res&uacute;men:</strong>';
            $table .= '</td>';
            $table .= '<td>';
                $table .= $detalle;
            $table .= '</td>';
        $table .= '</tr>';
    $table .= '</table>';

    echo $table;