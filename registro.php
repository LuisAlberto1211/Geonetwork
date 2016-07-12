<!DOCTYPE html>
<html>
  <head>
    <title>Geonetwork</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" />
    <script type="text/javascript" src="js/general.js"></script>
    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/handlebars-v4.0.5.js"></script>
    <link rel="stylesheet" href="./css/style.css">

    <script>
      Handlebars.registerHelper("compara", function(v1, comp ,v2, options){
        switch (comp) {
          case '>':
            if( v1 > v2){
              return options.fn(this);
            }
            break;
          case '>=':
            if( v1 >= v2){
              return options.fn(this);
            }
            break;
          case '<':
            if( v1 < v2){
              return options.fn(this);
            }
            break;
          case '<=':
            if( v1 <= v2){
              return options.fn(this);
            }
            break;
          case '==':
            if( v1 == v2){
              return options.fn(this);
            }
            break;
          case '===':
            if( v1 === v2){
              return options.fn(this);
            }
            break;
        }
        return options.inverse(this);
      });
    </script>
  </head>
  <body>
    <h1 class="title-main">Búsqueda de metadatos</h1>
    <section class="formulario">
      <h2 class="title-sub">¿Qué desea buscar?</h2>
      <form id="keywords-form" action="">
        <input type="text" class="input-text" name="keywords" title="Palabras clave de búsqueda" placeholder="Ej: Volcanes" autofocus required>
        <select class="country-list" name="pais" required>
          <option value="">Selecciona un país</option>
          <option value="MEX">México</option>
          <option value="HON">Honduras</option>
        </select>
        <button type="submit" class="button-submit" id="keywords-button">Buscar<span class="loading"></span></button>
      </form>
    </section>
    <section id="pagination">
    </section>
    <section id="results">
    </section>
    <script id="pagination-template" type="text/x-handlebars-template">
      <p>Total de resultados: {{this.length}}</p>
      <p>Página {{this.page}} de {{this.pages}}</p>
      {{#compara this.page '>' 1}}
        <span class="navigation" onclick="cambiarPagina({{this.page}}, 'p')"> < </span>
      {{/compara}}
      <span class="navigation">{{this.page}}</span>
      {{#compara this.pages '>' this.page}}
        <span class="navigation" onclick="cambiarPagina({{this.page}}, 'f')"> > </span>
      {{/compara}}
    </script>
    <script id="results-template" type="text/x-handlebars-template">
      <ul>
        {{#metadata}}
          <li class="result-item">
            <input type="checkbox" checked>
            <i></i>
            <h2>{{title}}</h2>
            <div class="content">
              <h3>Resumen:</h3>
              <p>{{abstract}}</p>
              <figure><img src="{{image_url}}"/></figure>
              <div class="contact">
                <h3>Contacto</h3>
                {{#if contact.name}}
                  <p><strong>Nombre:</strong> {{contact.name}}</p>
                {{/if}}
                {{#if contact.organisation}}
                  <p><strong>Organización:</strong> {{contact.organisation}}</p>
                {{/if}}
                {{#if contact.mail}}
                  <p><strong>Correo:</strong> {{contact.mail}}</p>
                {{/if}}
                {{#if contact.phone}}
                  <p><strong>Teléfono:</strong> {{contact.phone}}</p>
                {{/if}}
              </div>
            </div>
          </li>
        {{/metadata}}
      </ul>
    </script>
    <script>
      var text;
      var previousSearch;

      $("input").on('change',function(){
        text = this.value;
      });

      function buscar(dataObj, text){
        $("#keywords-button")[0].innerHTML = "Cargando...<img src='imagenes/rotation.gif' width='10px'/>";
        $("#keywords-button")[0].disabled = true;
        previousSearch = text;
        $.ajax({
          url: "buscador/controller/buscar.php",
          data: dataObj,
          type: "GET",
          dataType: "json",
          success: function(data){
            console.log(data);
            $("#keywords-button")[0].innerHTML = "Buscar";
            $("#keywords-button")[0].disabled = false;
            var results   = $("#results-template").html();
            var pagination = $("#pagination-template").html();
            var resultsTemplate = Handlebars.compile(results);
            var paginationTemplate = Handlebars.compile(pagination);
            $("#results").html(resultsTemplate(data));
            $("#pagination").html(paginationTemplate(data));
          },
          error: function(error){
            console.log(error);
          }
        });
      }

      function cambiarPagina(pag, type){
        var newPage = (type == 'p') ? pag - 1: pag + 1;
        var dataObj = {
          text: encodeURIComponent(text),
          search: 1,
          page: newPage
        };
        buscar(dataObj, previousSearch);
      }

      $("#keywords-form").on("submit", function(e){
        e.preventDefault();
        var dataObj = {
          text: encodeURIComponent(text),
          search: 1,
          page: 1
        };
        buscar(dataObj, text);
      });
    </script>
  </body>
</html>
