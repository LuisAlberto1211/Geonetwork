<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="css/foundation.css" />
        <link rel="stylesheet" type="text/css" href="css/estilogralshapeup.css" />
        <script type="text/javascript" src="js/general.js"></script>
        <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
        <script type="text/javascript" src="js/modernizr.js"></script>
        <script type="text/javascript" src="js/foundation.min.js"></script>
        <script type="text/javascript" src="js/foundation/foundation.orbit.js"></script>
        <script type="text/javascript" src="js/modalbox/js/jquery.modalbox-1.4.1.js"></script>
        <link rel="stylesheet" type="text/css" href="js/modalbox/css/jquery.modalbox.css" />
        <style type="text/css">
        .style1 {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
        }
        .style2 {
                color: #FFFFFF;
        }
        .style5 {
                color: #FFCC00;
                text-align: left;
        }
        .style6 {
                color: #FFFFFF;
                font-size: 10px;
        }
        .style7 {color: #003366}
        
        .style8 {color: #006699}
        
        .style9 {color: #FFCC00}

        .labelcaja{
                font-size:16px;
                color: #C00;
                font-weight: bold;
                padding-bottom: 10px;
        }
        body {
                background-attachment:fixed;
        }
		
		.txtrelevante {
			color: #FFCC00;
			font-size:larger;
		}

        </style>
		<script language="JavaScript">
			var versionNavigator = navigator.appVersion;
			if( (versionNavigator.indexOf('MSIE')!=(-1)) ){
				//window.document.onkeydown = hookKeyboardEvents;
			}

			function showKeyCode(e){
				var keycode = (window.event) ? event.keyCode : e.keyCode;
				
				if( (versionNavigator.indexOf('MSIE')!=(-1)) ){
					var objectActive = document.activeElement;
					if (
						keycode==116 // F5
						|| (keycode==8 
							&& (
								(objectActive.type!='text' && objectActive.type!='textarea' && objectActive.type!='password') 
								
								)
							)           // Backspace
						|| keycode==93  // Windows Context menu Key
						|| keycode==112 // F1
					){
						event.keyCode = 0;
						event.returnValue = false;
						return false;
					}
				}else{
					var objectActive = e.target ? e.target : e.srcElement;
					var keyAlt = e.altKey;
					if( 
						keycode==116 
						|| (keycode==8 
							&& (
								(objectActive.type!='text' && objectActive.type!='textarea' && objectActive.type!='password') 
								|| ((objectActive.type=='text' || objectActive.type=='textarea' || objectActive.type=='password') 
									&& (objectActive.disabled===true || objectActive.readOnly===true)
									) 
								) 
							) 
						|| keycode==93 
						|| keycode==112 
						|| (keyAlt && keycode==37)
					){
						return false;
					}
				}
			}
		</script>
    </head>
    <body onLoad="JavaScript: document.body.focus();" onKeyDown="return showKeyCode(event)" onContextMenu="return false;">
		
        <form id="formulario" name="formulario"> <!--onsubmit="return validar(formulario106)" action="sendmail_S.php" method="post">-->
        <div class="row contenedor" style="height:800px;">
            
			<div >
				<div class="large-12 columns">
					<div  id="contenedor">
						<div class="large-12 columns">
							<h4 align="left">Ingresa datos</h4>
							<hr />
							<div class="large-3 columns"> 
								<h6> &iquest;Qu&eacute desea buscar&quest;
									<input  type="text" name="nombre" id="nombre" size="60" OnChange="jsLimpiaFormulario();" />
									<label id="errNombre" style="display:none; font-style: italic; color:#FF0000; position:relative; top:-15px">ingrese un dato</label>
									<br />
								</h6>
							</div>
							<div align="center" id="enviar">
								<input name="enviar" type="button" class="button radius" id="enviar" value="Buscar" onClick="jsBuscar();" /><!--style="display:none"-->
							</div>

							<div class="large-12 columns" id="contenedor2" style="background-color:#F2F2F2; width:970px; display:none">
							<br />
							<h4 align="left" style="color:#000000">Datos encontrados:</h4>
							<hr />
							<table>
								<tr>
									<td>
										<div id="lista"></div> 
									</td>
								</tr>
							</table>
					</div>
						</div>
						
				</div>
			</div>	
			<div >
				<div class="large-12 columns">
					
				</div>
			</div>
            
        </div>
        <!--</div>-->
    </form>
        <div id="detalle" style="display:none"/>
        <!-- Reveal Modals begin -->
        <div id="firstModal" class="reveal-modal" data-reveal></div>
		<div id="firstModal2" class="reveal-modal" data-reveal></div>
    </body>
</html>
<script type="text/javascript">
    
    $(document).foundation();
    
    
   jsBuscar = function(){
        
        //VALIDACION DE DATOS DE PERSONALES
        if($('#nombre').val()=='')
        {
            $('#enviar').html('<input name="enviar" type="button" class="button radius" id="enviar" value="enviar" onClick="jsBuscar()"/>');
            $('#errNombre').show();
            $('#nombre').focus();
            return false;
        }
        $('#enviar').html('<img src="imagenes/rotation.gif" border="0" height="20" width="20" />');
        
        $('#errNombre').hide();
        var nombreMayus  = document.getElementById('nombre').value.toUpperCase();
        
        $.ajax({
                type: "POST",
                url: 'buscador/controller/buscar.php',
                data: {
                        nombre          : nombreMayus
                      }
              }).done(function( msg ) {
                  	document.getElementById('contenedor2').style.display='';
                    $("#lista").html(msg);
                    $('#enviar').html('<input name="enviar" type="button" class="button radius" id="enviar" value="enviar" onClick="jsBuscar()"/>');
                    $("#detalle").html('Seleccione una opci&oacute;n');
                  });
    }
    
    
	
	jsLimpiaFormulario = function(){
	
		//$('#formulario')[0].reset();
		$("#lista").html('');
		$("#detalle").html('');
		document.getElementById('contenedor2').style.display='none';
	}

	jsDetalle = function(uuid)
	{
		$.ajax({
                type: "POST",
                url: 'buscador/controller/buscarDetalle.php',
                data: {
                        uuid : uuid
                      }
              }).done(function( msg ) {
                  	
                  	$('#detalle').html(msg);
                  	jQuery.fn.modalBox({
                            directCall: { 
                                data : $('#detalle').html()
                            },
                            setWidthOfModalLayer : 900,
                            killModalboxWithCloseButtonOnly : true//, // options: true, false (close the modal box with close button only),
                        });
                  });
	}
    
	//jsLimpiaFormulario();
    
    
</script>