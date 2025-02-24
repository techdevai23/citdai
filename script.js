$(document).ready(function() {
  // Cuenta atrás para la salida de los robots
  function iniciarCuentaAtras() {
      let fechaObjetivo = new Date();
      fechaObjetivo.setMonth(fechaObjetivo.getMonth() + 1);

      function actualizarCuentaAtras() {
          let ahora = new Date().getTime();
          let distancia = fechaObjetivo - ahora;

          let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
          let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
          let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

          $("#countdown").text(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
      }
      
      setInterval(actualizarCuentaAtras, 1000);
  }

  iniciarCuentaAtras();

  // Mostrar modal al hacer clic en un robot
  $(".robot").on("click", function() {
      let robotName = $(this).data("name");
      $("body").append(`
          <div class='modal'>
              <div class='modal-content'>
                  <h2>${robotName}</h2>
                  <p>Características del robot...</p>
                  <button class='add-to-cart'>Añadir al carrito</button>
                  <button class='close-modal'>Cerrar</button>
              </div>
          </div>
      `);
      $(".modal").fadeIn();
  });

  // Cerrar modal
  $(document).on("click", ".close-modal", function() {
      $(".modal").fadeOut(function() { $(this).remove(); });
  });

  // Animación de añadir al carrito
  $(document).on("click", ".add-to-cart", function() {
      let imgClone = $(".robot img").first().clone().offset({
          top: $(".robot").first().offset().top,
          left: $(".robot").first().offset().left
      }).css({
          'opacity': '0.8',
          'position': 'absolute',
          'z-index': '1000',
          'width': '100px'
      }).appendTo("body").animate({
          top: $("#countdown").offset().top + 10,
          left: $("#countdown").offset().left + 10,
          width: 50,
          opacity: 0
      }, 1000, function() {
          $(this).remove();
      });
  });
});
