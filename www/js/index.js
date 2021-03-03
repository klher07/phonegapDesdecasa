document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#contenido").load("content/inicio.html");
//console.log('hola');
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}
var url_glo;
function content_view(type,url_li){
    var sesionC = localStorage.getItem('correo');
    var id = localStorage.getItem('id');
    var nombre = localStorage.getItem('nombre');
    var tipo = localStorage.getItem('tipo');
    alert(url_li);
    if (sesionC!=null && url_li!=undefined) {
        var dominio=url_li.split('/');
        if(dominio[3]=='ticket2'){
            if(tipo=='face'){
                enviarUrl(url_glo+'/autenticaFb1.php?id_face='+id+'&email_face='+sesionC+'&nombre='+nombre,1);
            }else{
                enviarUrl(url_glo+'/autenticaGmail1.php?email='+sesionC+'&nombre='+nombre+'&id='+id,1);
            }
        }else{
          enviarUrl(url_li+"peticiones.php?c=app_app&a=login_app&usuario="+sesionC,1);  
        }    
    }else{
    if (type==0) {$( "#contenido" ).load("content/inicio.html");}
    if (type==1) {$( "#contenido" ).load("Login.html");}
    if (type==2) {$( "#contenido" ).load("Register.html");}
    }
    if (url_li) {
    url_glo=url_li;
    }
}

function verificar_datos(){
    var usuario = $(".usuario").val();
    var clave = $(".clave").val();
    var array_link = [
  {"url": "https://desdecasa.ec/desdecasa/","nombre":"desdecasa"},
  //{"ticketfacil": "https://ticketfacil.ec/ticket2developer/"},
  {"url": "http://www.global-andina.com/globalandina/","nombre":"globalandina"},
  {"url": "https://partes365.com/partes365/","nombre":"partes365"},
  ]
            if (usuario==''||clave=='') {
            $(".login-res").html('<div class="alert  alert-danger text-center">No se puede dejar campos vacios.</div>');
            }else{

                window.FirebasePlugin.getToken(function(token){
                    //alert(usuario);
                    //alert(clave);
                    //alert(token);
                   //alert("TOKEN FIREBASE :"+token);
                        $.post("https://desdecasa.ec/desdecasa/appNotificaciones/sessionMaster.php",{ 
                            usuario:usuario,cant:token,clave:clave
                        }).done(function(data){
                            //alert(data);
                            //$('#email').text(result.email);
                            //$('#name').text(result.displayName);
                            //$('#picture').text(result.imageUrl);
                        });

                },function(error){
                    alert(error);
                });

                var dominio=url_glo.split('/');
                    if(dominio[3]=='ticket2'){
                            //enviarUrl(url_glo+"/autenticaLoginApp.php?email="+usuario+"&clave="+clave+"&parametro=1",1);
                            $.ajax({
                                type: 'post',
                                url: "https://www.ticketfacil.ec/ticket2/autenticaLoginApp.php",
                                data: {usuario:usuario,clave:clave,parametro:1},
                                beforeSend: function(){
                                    $(".login-res").html('<div class="alert  alert-info text-center">Iniciando...<br><img src="https://desdecasa.ec/desdecasaDeveloper/view/img/enviando.gif"  class="img-fluid"></div>');
                                },
                                error: function() {
                                    $(".login-res").html('<div class="alert  alert-danger text-center">Ha ocurrido un error...</div>');
                                },
                                success: function (data){
                                    console.log(data);
                                    if(data==1){
                                        $(".login-res").html('<div class="alert alert-success text-center">Credenciales Validas</div>');
                                        $( "#contenido" ).load("content/inicio.html");
                                        localStorage.setItem("correo",usuario);
                                        enviarUrl(url_glo+"/autenticaLoginApp.php?email="+usuario+"&clave="+clave+"&parametro=2",1);
                                    }else{
                                        $(".login-res").html('<div class="alert  alert-danger text-center">Esta cuenta no existe.</div>');    
                                    }
                                    /*if (data.indexOf('nocuenta')!=-1) {
                                    $(".login-res").html('<div class="alert  alert-danger text-center">Esta cuenta no existe.</div>');
                                    }else{
                                        if(data.indexOf('contrain')!=-1){
                                        $(".login-res").html('<div class="alert alert-danger text-center">Contraseña incorrecta</div>');
                                        }else{
                                        $(".login-res").html('<div class="alert alert-success text-center">Credenciales Validas</div>');
                                        $( "#contenido" ).load("content/inicio.html");
                                        //localStorage.setItem("correo",usuario);
                                        enviarUrl(url_glo+"/autenticaLoginApp.php?email="+usuario+"&clave="+clave,1);
                                        }
                                    }*/
                                }
                            });
                    }else{
                            $.ajax({
                                type: 'post',
                                url: "https://desdecasa.ec/desdecasa/peticiones.php?c=app_app&a=confirm_crede",
                                data: {usuario:usuario,clave:clave,array_link:array_link,typelog:1},
                                beforeSend: function(){
                                    $(".login-res").html('<div class="alert  alert-info text-center">Iniciando...<br><img src="https://desdecasa.ec/desdecasaDeveloper/view/img/enviando.gif"  class="img-fluid"></div>');
                                },
                                error: function() {
                                    $(".login-res").html('<div class="alert  alert-danger text-center">Ha ocurrido un error...</div>');
                                },
                                success: function (data){
                                    console.log(data);
                                    if (data.indexOf('nocuenta')!=-1) {
                                    $(".login-res").html('<div class="alert  alert-danger text-center">Esta cuenta no existe.</div>');
                                    }else{
                                        if(data.indexOf('contrain')!=-1){
                                        $(".login-res").html('<div class="alert alert-danger text-center">Contraseña incorrecta</div>');
                                        }else{
                                        $(".login-res").html('<div class="alert alert-success text-center">Credenciales Validas</div>');
                                        $( "#contenido" ).load("content/inicio.html");
                                        localStorage.setItem("correo",usuario);
                                        enviarUrl(url_glo+"peticiones.php?c=app_app&a=login_app&usuario="+usuario+"&clave="+clave,1);
                                        }
                                    }
                                }
                            }); 
                    }    
            }

}

function vercontra(){
    $('#clave').attr('type','text');
    $('.vercontra').hide();
    $('.novercontra').show();
}
function novercontra(){
    $('#clave').attr('type','password');
    $('.novercontra').hide();
    $('.vercontra').show();
}
function vercontrare(){
    $('#repeat_clave').attr('type','text');
    $('.vercontrare').hide();
    $('.novercontrare').show();
}
function novercontrare(){
    $('#repeat_clave').attr('type','password');
    $('.novercontrare').hide();
    $('.vercontrare').show();
}
function registrar_datos(){
var nombre = $('#nomape').val();
var documento = $('#docudi').val();
var correo = $('#usuario').val();
var telefono = $('#telefon').val();
var clave = $('#clave').val();
var repetir = $('#repeat_clave').val();
    var array_link = [
  {"url": "https://desdecasa.ec/desdecasa/","nombre":"desdecasa"},
  //{"ticketfacil": "https://ticketfacil.ec/ticket2developer/"},
  {"url": "http://www.global-andina.com/globalandina/","nombre":"globalandina"},
  {"url": "https://partes365.com/partes365/","nombre":"partes365"},
  ]
if (nombre==""||documento==""||correo==""||telefono==""||clave==""||repetir=="") {

$('.validate_form').each(function(val,inde){
    if ($(this).val()=="") {
$(this).css("border-color"," red");
    }else{
        $(this).css("border-color"," green");
    }
});
    $(".login-res").html('<div class="alert alert-danger text-center">No se puede dejar campos vacios</div>');
}else{


    if (clave==repetir) {
        $.ajax({
                type: 'post',
                url: "https://desdecasa.ec/desdecasa/peticiones.php?c=app_app&a=confirm_crede_registro",
                data: {usuario:correo,clave:clave,nombre:nombre,documento:documento,telefono:telefono,array_link:array_link,typelog:2},
                beforeSend: function(){
                    $(".login-res").html('<div class="alert  alert-info text-center">Iniciando...<br><img src="https://desdecasa.ec/desdecasaDeveloper/view/img/enviando.gif"  class="img-fluid"></div>');
                },
                error: function() {
                    $(".login-res").html('<div class="alert  alert-danger text-center">Ha ocurrido un error...</div>');
                },
                success: function (data){
                    console.log(data);
                    if (data.indexOf('existe')!=-1) {
                    $(".login-res").html('<div class="alert  alert-success text-center">Esta cuenta ya existe.</div>');
                    }else{
                          if (data.indexOf('entrar')!=-1) {
                        $(".login-res").html('<div class="alert alert-success text-center">Registro exitoso</div>');
                            enviarUrl(url_glo+"peticiones.php?c=app_app&a=login_app&usuario="+correo+"&clave="+clave,1);
                          }
                          }
                }
            });

    }else{$(".login-res").html('<div class="alert alert-danger text-center">Las contraseñas no coinciden</div>');}
}
}
function onSuccess(position) {

        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);
        //alert(longitude);
        //alert(latitude);
        var mapOptions = {
            center:latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'my location'
        });
    }

    function onError(error) {
        alert("cod erro" + error.code + ". \n" + "mensagem: " + error.message);
    }
   var inAppBrowserRef;
function enviarUrl(url,numb){
    var target="_blank";
    //var option="location=yes";
    var option="location=no"; 
    //var option="hideurlbar=yes";
    //var option="closebuttoncaption=My Button Name";

    if (numb==0) {
    inAppBrowserRef = cordova.InAppBrowser.open(url,target, option);
    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
    }else{
    inAppBrowserRef = cordova.InAppBrowser.open(url,target, option);
    inAppBrowserRef.addEventListener('loadstart', loadStartCallBackTwo);


    }

}
function loadStartCallBack(event) {
    //alert(event);
           if (event.url.indexOf('google_app')!=-1) {
            //probar_send();
            gplusLogin();
           }

    /*fetch('https://desdecasa.ec/desdecasaDeveloper/appNotificaciones/sessionMaster.php', 
      {method: 'GET',
      headers: {
                'Content-Type'    : 'application/json',
                'Accept'          : 'application/json'
            }
          })
        .then((response) => response.json())
        .then((responseJson) => {
         
       alert(JSON.stringify(responseJson));
        })
        .catch((error) => {
            console.error(error);
        });*/


}
function loadStartCallBackTwo(event) {
        //alert(event.url);

           if (event.url.indexOf('logout')!=-1 || event.url.indexOf('configura.php')!=-1) {
                localStorage.clear();
                inAppBrowserRef.close();
                content_view(0)
                        //gplusLogout();

            }
}

function gplusLogout(){
    window.plugins.googleplus.logout(
        function (msg) {
          enviarUrl('https://www.desdecasa.ec/desdecasa/peticiones.php?c=app_app&a=enter_andro',0);
        }
    );
}

function gplusDisconnect(){
    window.plugins.googleplus.disconnect(
        function (msg) {
          alert(msg); // do something useful instead of alerting
        }
    );
}
function gplusLogin_one(){
enviarUrl('https://www.desdecasa.ec/desdecasa/google_app.php',0);
}
function gplusLogin(){
    window.plugins.googleplus.login({

    },function(result){
        var valor=result.email;
            
                window.FirebasePlugin.getToken(function(token){
                    //alert(valor);
                    //alert(token);
                    //alert(result.displayName);
                   //alert("TOKEN FIREBASE :"+token);
                    $.post("https://desdecasa.ec/desdecasa/appNotificaciones/usuarios.php",{ 
                        id:valor,cant:token,nombre:result.displayName
                    }).done(function(data){
                            //alert(data);
                            $('#email').text(result.email);
                            $('#name').text(result.displayName);
                            $('#picture').text(result.imageUrl);
                        });

                },function(error){
                    alert(error);
                });


        if (result.email) {
        var tipo_u = 'goo';
ajax_create(valor,result.displayName,result.imageUrl,tipo_u);
        }
    },function(error){
        alert(JSON.stringify(error));
    });
}

function logInOutTest(){
    alert('start login status check');
    facebookConnectPlugin.getLoginStatus(function (response) {
        alert(JSON.stringify(response));
        if (response.status === 'connected') {
            alert('start log OUT');
            facebookConnectPlugin.logout(function () {
                alert('log out called');
            }, function(error) {
                alert(JSON.stringify(error));
            });
        }
        else {
            alert('start log IN');
            facebookConnectPlugin.login(["public_profile"],
                function (userData) {
                    alert("UserInfo: " + JSON.stringify(userData));
                },
                function (error) {
                    alert(JSON.stringify(error));
                }
            );
        }
    }, function (error) {
         alert('error: ' + JSON.stringify(error));
    });
}
function loginWithFB(){
    facebookConnectPlugin.login(["public_profile","email"], function(result){
            //auth success
                //console.log(JSON.stringify(result));
        facebookConnectPlugin.api("/me?fields=id,email,name,picture.width(320).height(280)", ["public_profile","email"], function(userData){
            //success Callback
            //alert(JSON.stringify(userData));
                var id_face = userData.id;
                var email_face = userData.email;
                var nombre = userData.name;
                var picture = userData.picture.data.url;
                var tipo_u = 'face';
                            window.FirebasePlugin.getToken(function(token){
                                //alert("TOKEN FIREBASE :"+token);
                                    $.post("https://desdecasa.ec/desdecasa/appNotificaciones/usuarios.php",{ 
                                        id:email_face,cant:token,nombre:nombre
                                    }).done(function(data){
                                            //alert(data);
                                            //$('#email').text(result.email);
                                            //$('#name').text(result.displayName);
                                            //$('#picture').text(result.imageUrl);
                                    });

                            },function(error){
                                alert(error);
                            });
                ajax_create(email_face,nombre,picture,id_face,tipo_u);

        }, function(error){
            //error
            alert(JSON.stringify(error));
        });
    }, function(error){
        //error
        alert(JSON.stringify(error));
    });
}
function ajax_create(correo_u,nombre_u,foto_u,id_u,type_p){
        var array_link = [
  {"url": "https://desdecasa.ec/desdecasa/","nombre":"desdecasa"},
  //{"ticketfacil": "https://ticketfacil.ec/ticket2developer/ticket/"},
  {"url": "http://www.global-andina.com/globalandina/","nombre":"globalandina"},
  {"url": "https://partes365.com/partes365/","nombre":"partes365"},
  ]
                    $.ajax({
                type: 'post',
                url: "https://desdecasa.ec/desdecasa/peticiones.php?c=app_app&a=confirm_crede_FG",
                data: {usuario:correo_u,nombre_u:nombre_u,foto_u:foto_u,array_link:array_link,typelog:1},
                beforeSend: function(){
                    $(".login-res").html('<div class="alert  alert-info text-center">Iniciando...<br><img src="https://desdecasa.ec/desdecasaDeveloper/view/img/enviando.gif"  class="img-fluid"></div>');
                },
                error: function() {
                    $(".login-res").html('<div class="alert  alert-danger text-center">Ha ocurrido un error...</div>');
                },
                success: function (data){
                    alert(data);
                    if (data.indexOf('todos_registros')!=-1) {
                        $(".login-res").html('<div class="alert alert-success text-center">Credenciales Validas</div>');
                        localStorage.setItem("correo",correo_u);
                        localStorage.setItem("id",id_u);
                        localStorage.setItem("nombre",nombre_u);
                        localStorage.setItem("tipo",type_p);
                        $( "#contenido" ).load("content/inicio.html");
                        var dominio=url_glo.split('/');
                                        if(dominio[3]=='ticket2'){
                                            if (type_p=='face') {
                    enviarUrl(url_glo+'/autenticaFb1.php?id_face='+id_u+'&email_face='+correo_u+'&nombre='+nombre_u,1);  
                                            }else{
                    enviarUrl(url_glo+'/autenticaGmail1.php?email='+correo_u+'&nombre='+nombre_u+'&id='+id_u,1);  
                                            }
                }else{
                        enviarUrl(url_glo+"peticiones.php?c=app_app&a=login_app&usuario="+correo_u,1);
                   //enviarUrl(url_glo+'peticiones.php?c=app_app&a=googlelogin_app&email='+result.email+'&name='+result.displayName+'&picture='+result.imageUrl,1);  
                }
                    }else{
                    $(".login-res").html('<div class="alert alert-danger text-center">Algo salio mal</div>');
                    }
                }
            });
}