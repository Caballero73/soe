$(document).foundation()

// IR ARRIBA
// ======================
$('.ir-arriba').click(function(){
	$('body, html').animate({
		scrollTop: '0px'
	}, 1200);
})

$(window).scroll(function(){
	if( $(this).scrollTop() > 0 ){
		$('.ir-arriba').slideDown(200);
	} else {
		$('.ir-arriba').slideUp(200);
	}
});


/*
  VER PASWORD
*/
$('.unmask').on('click', function(){

  if($(this).prev('input').attr('type') == 'password')
    changeType($(this).prev('input'), 'text');

  else
    changeType($(this).prev('input'), 'password');

  return false;
});

function changeType(x, type) {
  if(x.prop('type') == type)
  return x; //That was easy.
  try {
    return x.prop('type', type); //Stupid IE security will not allow this
  } catch(e) {
    //Try re-creating the element (yep... this sucks)
    //jQuery has no html() method for the element, so we have to put into a div first
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
    //If no match, we add the type attribute to the end; otherwise, we replace
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
    //Copy data from old element
    tmp.data('type', x.data('type') );
    var events = x.data('events');
    var cb = function(events) {
      return function() {
            //Bind all prior events
            for(i in events)
            {
              var y = events[i];
              for(j in y)
                tmp.bind(i, y[j].handler);
            }
          }
        }(events);
        x.replaceWith(tmp);
    setTimeout(cb, 10); //Wait a bit to call function
    return tmp;
  }
}

// Login
$('#submit-login').click(function(){
   var name = $('#username').val();

  if (name == 'Alexander' || name == 'alexander') {
    window.location.replace('operador01.html');
  }
  else if (name == 'Enmanuel' || name == 'enmanuel') {
    window.location.replace('cliente01.html');
  }
  else if (name == 'Josefina' || name == 'josefina') {
    window.location.replace('bombero01.html');
  }
  else if (name == 'Angel' || name == 'angel') {
    window.location.replace('admon01.html');
  }
  else {
    swal({
      type: 'error',
      title: '¡Oops!',
      text: 'Por favor ingrese un usuario válido'
    })
  }
});

// Cerrar Emergencia
$('#cerrar-emergencia').click(function(){
  swal({
    title: '¿Está Usted seguro?',
    text: 'Esta emergencia quedará archivada y ya no se podrá modificar ninguno de sus valores.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#339999',
    cancelButtonColor: '#FF301D',
    confirmButtonText: 'Si, Archivar'
  }).then(function(result) {
    if (result.value) {
      swal({
        type: 'success',
        showConfirmButton: false,
        html:
          '<p>La emergencia ha sido cerrada</p>' +
          '<a class="button success" style="color:white;border:none;font-weight: bold;" href="operador01.html">Aceptar</a>',        
      })
    }
  })
});

// Cerrar Emergencia Cia
$('#cerrar-emergencia-cia').click(function(){
  swal({
    title: '¿Está Usted seguro?',
    text: 'Esta emergencia quedará archivada y ya no se podrá modificar ninguno de sus valores.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#339999',
    cancelButtonColor: '#FF301D',
    confirmButtonText: 'Si, Archivar'
  }).then(function(result) {
    if (result.value) {
      swal({
        type: 'success',
        showConfirmButton: false,
        html:
          '<p>La emergencia ha sido cerrada</p>' +
          '<a class="button success" style="color:white;border:none;font-weight: bold;" href="cliente01.html">Aceptar</a>',        
      })
    }
  })
});

// Cerrar Emergencia Cia
$('#asignar-emergencia').click(function(){
  swal({
    title: '¿Está Usted seguro?',
    text: 'Esta emergencia será asignada a un investigador y ya no se podrá modificar ninguno de sus valores.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#339999',
    cancelButtonColor: '#FF301D',
    confirmButtonText: 'Si, Asignar'
  }).then(function(result) {
    if (result.value) {
      swal({
        type: 'success',
        showConfirmButton: false,
        html:
          '<p>La emergencia ha sido asignada a un investigador</p>' +
          '<a class="button success" style="color:white;border:none;font-weight: bold;" href="cliente01.html">Aceptar</a>',        
      })
    }
  })
});

// Inicialización para select2
$(document).ready(function() {
    // Inicializaciones para Selecc2
    $('#tipo-emergencia').select2({
      data: emergencias
    });
    $('#comuna').select2({
    });
    $('#tipo-via').select2({
    });
    $('#tipo-apoyo').select2({
    });

    // Simulación de guardado para AFECTADOS
    $('input[type="radio"]').click(function(evento){
      $('input[type="radio"]').removeAttr('checked');
      $(this).attr('checked', 'checked');
    })

    $('#guardar-afectado').click(function(evento){
      evento.preventDefault()
      var nombre = $('#nombre-afectado').val()

      if(nombre != '') {
        var apellido1 = $('#apellido1-afectado').val()
        var apellido2 = $('#apellido2-afectado').val()
        var afectado = '<li>' + nombre + ' ' + apellido1 + ' ' + apellido2 + '</li>'
        $('#lista-afectados').append(afectado)
        $('input[type="text"]').val('')

        var adultos = parseInt($('#adultos').html());
        var menores = parseInt($('#menores').html());
        if ($('#adulto').attr('checked')) {
          $('#adultos').html(adultos+1)
        }
        else {
          $('#menores').html(menores+1)
        }
      }
      else {
        swal({
          type: 'error',
          title: 'Fantan datos',
          text: 'Por favor ingrese el nombre y\n apellidos\ndel afectado\n ',
          showConfirmButton: false,
          timer: 3000
        })
      }      
    })

    // Simulación de Guardado para APOYO
    $('#guardar-apoyo').click(function(evento){
      evento.preventDefault()     

      if(nombreApoyo != '') {
        var nombreApoyo = $('#tipo-apoyo').val()
        var apoyo = '<li>' + nombreApoyo + '</li>'
        $('#lista-apoyo').append(apoyo)
        $('input[type="text"]').val('')       
      }
    })

    // Simulación de Guardado para BOMBEROS LESIONADOS
    $('#guardar-lesionado').click(function(evento){
      evento.preventDefault()
      var nombreBombero = $('#nombre-lesionado').val()
      var cargoBombero = $('#cargo-lesionado').val()

      if(nombreBombero != '') {
        var lesionado = '<li>' + nombreBombero + ' - ' + cargoBombero + '</li>'
        $('#lista-lesionados').append(lesionado)
        $('input[type="text"]').val('')        
      }
      else {
        swal({
          type: 'error',
          title: 'Faltan datos',
          text: 'Por favor ingrese el nombre y\n apellidos\ndel lesionado\n ',
          showConfirmButton: false,
          timer: 3000
        })
      }
    })

    $('#cargar-foto-carro').change(function() {
      alert(1)
    })
});