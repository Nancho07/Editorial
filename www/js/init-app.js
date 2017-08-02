window.app = window.app || {} ;
var coneccion="Nan";
var conectado = "";
var datos_usuario = {};
var socket;
var descripcion="";
var localStorage = window.localStorage;
var editorial={};
var vlatitud,vlongitud,conneccion;
    datos_usuario.prefix="imix";
$.getJSON("http://freegeoip.net/json/", function (data) {
		 datos_usuario.country = data.country_name;
		 datos_usuario.ip = data.ip;
		 datos_usuario.region = data.region_name;
		 datos_usuario.city = data.city;
		 datos_usuario.latitud = data.latitud;
		 datos_usuario.longitud = data.longitud;
		});
var salon = {};
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Coneccion desconocida';
    states[Connection.ETHERNET] = 'Coneccion Ethernet';
    states[Connection.WIFI]     = 'Coneccion WiFi';
    states[Connection.CELL_2G]  = 'Coneccion Cell 2G';
    states[Connection.CELL_3G]  = 'Coneccion Cell 3G';
    states[Connection.CELL_4G]  = 'Coneccion Cell 4G';
    states[Connection.CELL]     = 'Coneccion Cell generico';
    states[Connection.NONE]     = 'No hay coneccion';

    return  states[networkState];
}
//conneccion=checkConnection();
app.LOG = app.LOG || true ;
app.consoleLog = function() {
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
};
app.initEvents = function() {
    coneccion=checkConnection();
    "use strict" ;
    var fName = "app.initEvents():";
    app.consoleLog(fName, "entry");
    app.initDebug(coneccion); 
    if(coneccion!=='Sin coneccion'){
        //app.geoLocalizacion(); /*coneccion*/
    }
    app.cordovaFile();    
    app.hideSplashScreen();
    app.validarConeccion();
    app.consoleLog(fName, "exit");    
} ;
document.addEventListener("app.Ready", app.initEvents, false);
app.initDebug = function(coneccion) {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;
    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
        /*var datos = "Version cordova: " + device.cordova + "\nModelo del dispositivo: "+ device.model+ "\nPlataforma del dispositivo: "+ device.platform+ "\nVersion del dispositivo: "+ device.version+"\nTipo de conección: "+coneccion;*/
        descripcion='<li class="widget uib_w_88" data-uib="jquery_mobile/listitem" data-ver="0" data-role="list-divider"><span>'+"Ver. desarrollo: " + device.cordova +'</span></li>'+
            '<li class="widget uib_w_88" data-uib="jquery_mobile/listitem" data-ver="0" data-role="list-divider"><span>'+"Modelo : "+ device.model+'</span></li>'+
            '<li class="widget uib_w_88" data-uib="jquery_mobile/listitem" data-ver="0" data-role="list-divider"><span>'+"Plataforma : "+ device.platform+'</span></li>'+
            '<li class="widget uib_w_88" data-uib="jquery_mobile/listitem" data-ver="0" data-role="list-divider"><span>'+"Version : "+ device.version+'</span></li>'+
            '<li class="widget uib_w_88" data-uib="jquery_mobile/listitem" data-ver="0" data-role="list-divider"><span>'+"Tipo de conección: "+coneccion+'</span></li>';
       // $("#descrip").val(datos);
       // $("#description").empty();
        $(descripcion).appendTo($("#description"));
    }
    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    } 
    app.consoleLog(fName, "exit") ;
};

app.geoLocalizacion = function(){/*coneccion*/
    "use strict" ;
    var fName = "app.geoLocalizacion():" ;
    app.consoleLog(fName, "entry") ;
    
        /*var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.386196601958, lng: -121.964346639},
            zoom: 6
          });
          var infoWindow = new google.maps.InfoWindow({map: map});
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              $("#latitud").val(position.coords.latitude);
              $("#longitud").val(position.coords.longitude);
              infoWindow.setPosition(pos);
              infoWindow.setContent('Localizado.');
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: El servicio de geolocalizacion fallo.' :
                                'Error: Su navegador no soporta geolocalizacion.');
        }*/

    app.consoleLog("Tipo de conección: "+coneccion) ; 
    app.consoleLog(fName, "exit") ;
};
app.cordovaFile = function(){
    "use strict" ;
    var fName = "app.cordovaFile():" ;
    app.consoleLog(fName, "entry") ;
    //console.log(cordova.file);
    //console.log(FileTransfer);
    //console.log("navigator.notification: " + navigator.notification);
    app.consoleLog(fName, "exit") ;
};
app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }
    app.consoleLog(fName, "exit") ;
};
app.validarConeccion = function(){
    conectado = checkConnection();    
    if(conectado !== "No hay coneccion" && conectado!==undefined){
        socket = io.connect("https://imix-io-imixhn.c9users.io");
        socket.on('connect', function (id) {
            datos_usuario.socketId=id;
        });
        var downloadSize = 244736;
        var imageAddr = "http://farm6.static.flickr.com/5035/5802797131_a729dac808_b.jpg" + "?n=" + Math.random();
        var startTime, endTime = 0;
        var download = new Image();
        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults(startTime, endTime, imageAddr, downloadSize);
        }
        startTime = (new Date()).getTime();
        download.src = imageAddr;

        function isConnected(){
            var xhr = new XMLHttpRequest();
            var file = "https://imix-io-imixhn.c9users.io/imixdigital.png";
            var r = Math.round(Math.random() * 10000);
            xhr.open('HEAD', file + "?subins=" + r, false);
            try {
                xhr.send();
                if (xhr.status >= 200 && xhr.status < 304) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {                
                return false;
            }   
        }
        function showResults(startTime, endTime, imageAddr, downloadSize) {
            var conected = isConnected();
            if(conected==true){
                var duration = (endTime - startTime) / 1000; //Math.round()
                var bitsLoaded = downloadSize * 8;
                var speedBps = (bitsLoaded / duration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var finalSpeed = (speedKbps/10);               

                if(finalSpeed > 1 && finalSpeed < 20){
                    document.getElementById("enviar").style.backgroundImage = "url('images/senal1.png')";
                } else if(finalSpeed >= 20  && finalSpeed < 40){
                    document.getElementById("enviar").style.backgroundImage = "url('images/senal2.png')";
                } else if(finalSpeed >= 40  && finalSpeed < 60){
                    document.getElementById("enviar").style.backgroundImage = "url('images/senal3.png')";
                } else if(finalSpeed >= 60  && finalSpeed < 80){
                    document.getElementById("enviar").style.backgroundImage = "url('images/senal4.png')";
                } else if(finalSpeed >= 80){
                    document.getElementById("enviar").style.backgroundImage = "url('images/senal5.png')";
                }
            }else{
                document.getElementById("enviar").style.backgroundImage = "url('images/senal0.png')";
            }    
        }
        showResults();
    }
};