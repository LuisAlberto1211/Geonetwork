function jsSoloNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true;
    patron = /\d/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function jsSoloFlotantes(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8 || tecla==46 || tecla==0) return true;
    patron = /\d+\.?\d*$/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function jsSoloNum(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8 || tecla==46 || tecla==0 || tecla==45) return true;
    patron = /^-?[0-9]+(\.[0-9]{1,2})?$/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function jsSoloLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true;
    patron =/^[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}


function IsNumeric(input){
    return /^-?(0|[1-9]\d*|(?=\.))(\.\d+)?$/.test(input);
}


function jsJsonSelect(objeto, json) {

    eval("var opciones = "+json);
    objeto.options.length = 0;

    for(var i=0;i<opciones.length;i++) {
        var text	= unescape(opciones[i].text);
        var value	= unescape(opciones[i].value);
        var option	= new Option(value, text);
        try {
            objeto.add(option,null);
        } catch (e) {
            objeto.add(option,-1);
        }
    }

}





function trim(cadena){
    for(i=0; i<cadena.length; ) {
        if(cadena.charAt(i)==" ")
            cadena=cadena.substring(i+1, cadena.length);
        else
            break;
    }

    for(i=cadena.length-1; i>=0; i=cadena.length-1) {
        if(cadena.charAt(i)==" ")
            cadena=cadena.substring(0,i);
        else
            break;
    }
    return cadena;
}



function jsVerificaDatosFiscales(strElemento, strDato){

	var bolValido=true;

	var strExpReg_RFC1=/^([A-Z]|[&]){3,4}[0-9]{6}/;
	//var strExpReg_RFC2=/^([A-Z]|[&]){3,4}[0-9]{6}([A-Z]|[0-9]){0,3}/;
	var strExpReg_RFC2=/^([A-Za-z]|[&]){3,4}((([0-9]{2})(0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|(([0-9]{2})(0[469]|11)(0[1-9]|[12][0-9]|30))|(([02468][048]|[13579][26])(02)(0[1-9]|[12][0-9]))|(([0-9]{2})(02)(0[1-9]|1[0-9]|2[0-8])))(([A-Za-z]|[0-9]){2}([Aa]|[0-9]))$/;
	//var strExpReg_RFC2=/^([A-Z]|[&]){3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(([A-Z]|[0-9]){2}(A|[0-9]))?$/;
	var strExpReg_RazonSocial=/^([A-Za-z]|[0-9]|[&]|[.]|[,]|[\s]|[Ñ]){3,}/;
        var strExpReg_Calle=/([A-Za-z]|[0-9]|[\s]){3,}/;
	var strExpReg_Colonia=/([A-Za-z]|[0-9]|[\s]){3,}/;
	var strExpReg_Ciudad=/([A-Za-z]|[0-9]|[\s]){3,}/;
	var strExpReg_DelMun=/([A-Za-z]|[0-9]|[\s]){3,}/;
	var strExpReg_CP=/[0-9]{1,5}/;
	var strExpReg_Correo=/^([A-Za-z]|[0-9])([A-Za-z]|[0-9]|[.]|[_]|[-])*([A-Za-z]|[0-9]|[_]|[-])+@([A-Za-z]|[0-9])+([A-Za-z]|[0-9]|[-])+([.]([A-Za-z]){2,})+$/;
	//var strExpReg_Correo=/^[A-Za-z][A-Za-z0-9_.\-]*@[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-.]+[A-za-z]$/;

	switch( strElemento ){
		case 'rfc':
                    if( strDato=='' || strDato.length<3 || strDato.search(strExpReg_RFC2)==(-1) || strDato.indexOf('|')!=-1 ){
                        //alert('Escribe el RFC correctamente ['+strDato+'].\n\nFormato:\n\t- 3 o 4 letras\n\t- 6 numeros (fecha YYMMDD)\n\t- 2 letras o numeros\n\t- 1 numero o la letra A.');
                        bolValido=false;
                    }
                    break;
		case 'razonsocial':
                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_RazonSocial)==(-1) ||
                                    jsVerificaCaracteresRepetidos(strDato, 4)==false || strDato.indexOf('|')!=-1 ){
                            //alert('Escribe el nombre o razon social correctamente.\nReglas:\n\t- No debe contener caracteres especiales, excepto & . , Ñ'+
                            //			'\n\t- No debe contener mas de tres letras o numeros iguales \n\t  o espacios en blanco concecutivos.');
                            bolValido=false;
                    }
                    break;
		case 'calle':

                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_Calle, 4)==(-1) ||
                                    jsVerificaCaracteresRepetidos(strDato)==false || strDato.indexOf('|')!=-1 ){
                            bolValido=false;
                    }
                    break;
		case 'colonia':
                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_Colonia)==(-1) ||
                                    jsVerificaCaracteresRepetidos(strDato, 4)==false || strDato.indexOf('|')!=-1 ){
                            bolValido=false;
                    }
                    break;
		case 'ciudad':
                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_Ciudad)==(-1) ||
                                    jsVerificaCaracteresRepetidos(strDato)==false ){
                            bolValido=false;
                    }
                    break;
		case 'delegmuni':
                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_DelMun)==(-1) ||
                                    jsVerificaCaracteresRepetidos(strDato)==false ){
                            bolValido=false;
                    }
                    break;
		case 'cp':
                    if( strDato=='' || strDato.length<3 ||
                                    strDato.search(strExpReg_CP)==(-1) ){
                            bolValido=false;
                    }
                    break;
		case 'correo':
                    var correos=strDato.split(',');
                    var correo='';
                    var validaciones=0;
                    for( var i=0; i<correos.length; i++ ){
                        correo=correos[i];
                        if( correo=='' || correo.length<6 ||
                                        correo.search(strExpReg_Correo)==(-1) ||
                                        jsVerificaCaracteresRepetidos(correo,5)==false ){
                                validaciones++;
                        }
                    }
                    if( validaciones>0 ){
                            bolValido=false;
                    }
                    break;
                case 'numero':
                    if( strDato.indexOf('|')!=-1 ){
                            //alert('Escribe el nombre o razon social correctamente.\nReglas:\n\t- No debe contener caracteres especiales, excepto & . , Ñ'+
                            //			'\n\t- No debe contener mas de tres letras o numeros iguales \n\t  o espacios en blanco concecutivos.');
                            bolValido=false;
                    }
                    break;
		default:
            break;
	}

	return bolValido;
}

function jsVerificaCaracteresRepetidos(strCadenaAVerificar, intNumeroRepValidas){
    if( typeof intNumeroRepValidas=='undefined' ){
        intNumeroRepValidas=3;
    }

    var intLongitud=strCadenaAVerificar.length;
    var intContador=0;
    var intContadorRep=0;
    var intContadorCadInvalidas=0;
    var strCadenaValida=true;
    var strExpReg_Num=/\D/;
    var strCaracter="";

    for( intContador=0;intContador<intLongitud;intContador++ ){
        strCaracter=strCadenaAVerificar.charAt(intContador);
        if( strCadenaAVerificar.charAt(intContador)==strCadenaAVerificar.charAt(intContador+1) &&
            strCaracter.search(strExpReg_Num)!=(-1) ){
            intContadorRep++;
        }else{
            intContadorRep=0;
        }
        if( intContadorRep==(intNumeroRepValidas-1) ){
            intContadorCadInvalidas++;
        }
        strCaracter="";
    }
    if( intContadorCadInvalidas>0 ){
        strCadenaValida=false;
    }

    return strCadenaValida;
}

function jsAyudaDatosFiscales(strElemento, strDato)
{
	switch( strElemento ){
		case 'rfc':
			alert('Escribe el RFC correctamente ['+strDato+'].\n\nFormato:\n\t- 3 o 4 letras\n\t- 6 numeros (fecha YYMMDD)\n\t- 2 letras o numeros\n\t- 1 numero o la letra A.');
			break;
		case 'razonsocial':
			alert('Escribe el nombre o razon social correctamente.\nReglas:\n\t- No debe contener caracteres especiales, excepto & . , Ñ'+
							'\n\t- No debe contener mas de tres letras o numeros iguales \n\t  o espacios en blanco concecutivos.');
			break;
		case 'calle':
			break;
		case 'colonia':
			break;
		case 'ciudad':
			break;
		case 'delegmuni':
			break;
		case 'cp':
			break;
		case 'correo':
			break;
		default:
            break;
	}

}

function utf8_encode( argString )
{
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var string = (argString+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}

function base64_encode (data)
{
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = this.utf8_encode(data + '');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
    case 1:
        enc = enc.slice(0, -2) + '==';
        break;
    case 2:
        enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}

function html_entity_decode( string, quote_style ) {
    // Convert all HTML entities to their applicable characters
    //
    // version: 901.714
    // discuss at: http://phpjs.org/functions/html_entity_decode
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: get_html_translation_table
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var histogram = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();

    if (false === (histogram = get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // &amp; must be the last character when decoding!
    delete(histogram['&']);
    histogram['&'] = '&amp;';

    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }

    return tmp_str;
}

function get_html_translation_table(table, quote_style) {
    // Returns the internal translation table used by htmlspecialchars and htmlentities
    //
    // version: 902.2516
    // discuss at: http://phpjs.org/functions/get_html_translation_table
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js. Meaning the constants are not
    // %          note: real constants, but strings instead. integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // %          note: Table from http://www.the-art-of-web.com/html/character-codes/
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

    var entities = {}, histogram = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};

    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');

    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }

    if (useQuoteStyle != 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }

    if (useQuoteStyle == 'ENT_QUOTES') {
        entities['39'] = '&#039;';
    }

    if (useTable == 'HTML_SPECIALCHARS') {
        // ascii decimals for better compatibility
        entities['38'] = '&amp;';
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';
    } else if (useTable == 'HTML_ENTITIES') {
        // ascii decimals for better compatibility
        entities['38']  = '&amp;';
        entities['60']  = '&lt;';
        entities['62']  = '&gt;';
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    } else {
        throw Error("Table: "+useTable+' not supported');
        return false;
    }

    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        histogram[symbol] = entities[decimal];
    }

    return histogram;
}

function jsValidaCaracteres(tipo, b, val){
//N = solo numeros            , si b = 1 permite negativos
//D = numeros decimales       , si b = 1 permite negativos
//A = Alfanumericos Mayusculas, si b = 1 permite espacio en blanco
//a = Alfanumericos Minuaculas, si b = 1 permite espacio en blanco
//C = Solo letras Mayusculas  , si b = 1 permite espacio en blanco
//c = Solo letras Minusculas  , si b = 1 permite espacio en blanco
//P = Alfanumericos           , si b = 1 permite espacio en blanco. Permite punto, coma, comillas y guiones
//m = mail					  				, Permite punto, guiones y arroba !"#$%

    var band=false;
    var c=event.keyCode;
    var str= new String(val);

    switch (tipo) {
        case 'N':
              if(c>=48 && c<=57){band=true;}
              if(c==45 && str=='' && b==1){band=true;}
              break;
        case 'D':
              if(c>=48 && c<=57){band=true;}
              if(c==46 && str.indexOf('.',0)==-1){band=true;}
              if(c==45 && str=='' && b==1){band=true;}
              break;
        case 'A':
              if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
              if(c>=48 && c<=57){band=true;}
							if(c==35 || c==37 || c==38 || (c==46)||(c==44)){band=true;}
              if((c>=97 && c<=122)||(c==241)){event.keyCode = c - 32;}
              if(c==32 && b==1){band=true;}
              break;
        case 'a':
							if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
							if((c==225)||(c==233)||(c==237)||(c==243)||(c==250)){band=true;}
							if((c==193)||(c==201)||(c==205)||(c==211)||(c==218)){band=true;}
							if(c==38 || (c==46)||(c==44)){band=true;}
              if(c>=48 && c<=57){band=true;}
              if(c==32 && b==1){band=true;}
              break;
        case 'C':
              if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
              if((c>=97 && c<=122)||(c==241)){event.keyCode = c - 32;}
              if(c==32 && b==1){band=true;}
              break;
        case 'c':
              if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
              if(c==32 && b==1){band=true;}
              break;
	    case 'P':
              if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
              if(c>=48 && c<=57){band=true;}
              if(c==32 && b==1){band=true;}
							if(c==38 || (c==46)||(c==44)||(c==34)||(c==45)||(c==95)){band=true;}
              break;
	    case 'm':
              if((c>=65 && c<=90)||(c>=97 && c<=122)||(c==241)||(c==209)){band=true;}
              if(c>=48 && c<=57){band=true;}
							if((c==46)||(c==64)||(c==45)||(c==95)){band=true;}
              break;

    }
    event.returnValue=band;
}

function jsValidarEmail(valor) {

    var resultado;

    //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
    if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(valor)==false){
        resultado=0;

    } else {

        resultado=1;

    }
    return resultado;
}

function html_entity_decode( string, quote_style ) {
    // Convert all HTML entities to their applicable characters
    //
    // version: 901.714
    // discuss at: http://phpjs.org/functions/html_entity_decode
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: get_html_translation_table
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var histogram = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();

    if (false === (histogram = get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // &amp; must be the last character when decoding!
    delete(histogram['&']);
    histogram['&'] = '&amp;';

    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }

    return tmp_str;
}

function convertirNumeroEnLetra(numero){
    var respuesta='';
    switch( numero ){
        case '0':
        case 0:
            respuesta='Cero';
            break;
        case '1':
        case 1:
            respuesta='Uno';
            break;
        case '2':
        case 2:
            respuesta='Dos';
            break;
        case '3':
        case 3:
            respuesta='Tres';
            break;
        case '4':
        case 4:
            respuesta='Cuatro';
            break;
        case '5':
        case 5:
            respuesta='Cinco';
            break;
        case '6':
        case 6:
            respuesta='Seis';
            break;
        case '7':
        case 7:
            respuesta='Siete';
            break;
        case '8':
        case 8:
            respuesta='Ocho';
            break;
        case '9':
        case 9:
            respuesta='Nueve';
            break;
        default:
            respuesta='ND';
            break;
    }
    return respuesta;
}

function convertirCantidadEnLetra(cantidad){
    var numeroAConvertir=cantidad.split('');
    var numeroDigitos=numeroAConvertir.length;
    var cont=0;
    var respuesta='';

    //alert('-'+numeroAConvertir+' #'+numeroDigitos);
    for( cont=0; cont<numeroDigitos; cont++ ){
        //alert('-'+numeroAConvertir[cont]+' -'+convertirNumeroEnLetra(numeroAConvertir[cont]));
        respuesta+=convertirNumeroEnLetra(numeroAConvertir[cont]);
    }

    return respuesta;
}
