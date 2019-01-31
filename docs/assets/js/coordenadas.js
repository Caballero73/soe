function initMap() { 

	//Creo un nuevo mapa situado en La Serena, Chile, con 13 de Zoom y del tipo ROADMAP
	var mapa = new google.maps.Map(document.getElementById('mapa'), {
		center: {lat: -29.9086742, lng: -71.2248358}, //-29.9086742,-71.2248358
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP

	});

	//Creo un evento asociado a "mapa" cuando se hace "click" sobre el 
	google.maps.event.addListener(mapa, "click", function(evento) { 
		//Obtengo las coordenadas separadas 
		var latitud = evento.latLng.lat();
		var latitud = latitud.toFixed(5); 
		var longitud = evento.latLng.lng(); 
		var longitud = longitud.toFixed(5); 
		//Puedo unirlas en una unica variable si asi lo prefiero 
		var coordenadasTexto = " Lat " + latitud + " , " + " Lng " + longitud; 
		//Las muestro con un popup 
		swal({
		  type: 'success',
		  title:'La coordenadas son',
		  text: coordenadasTexto,
		  showConfirmButton: false,
		  timer: 3000
		})
		// alert(coordenadasTexto);

		//Creo un marcador utilizando las coordenadas obtenidas y almacenadas por separado en "latitud" y "longitud" 
		var coordenadas = new google.maps.LatLng(latitud, longitud); 
		/* Debo crear un punto geografico utilizando google.maps.LatLng */ 
		var marcador = new google.maps.Marker({position: coordenadas,map: mapa, animation: google.maps.Animation.DROP, title:"Lugar de la emergencia"});
		$('#mostrar-coordenadas').html(coordenadasTexto) 
		// document.getElementById('mostrar-coordenadas').innerHTML(coordenadas);
	}); 
	//Fin del evento 
} 
// Fin inicializacion
initMap();