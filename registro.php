<!DOCTYPE html>
<html>
  <head>
    <title>Geonetwork</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="text/javascript" src="js/general.js"></script>
    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
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
    <section class="results">
    </section>
  </body>
</html>
