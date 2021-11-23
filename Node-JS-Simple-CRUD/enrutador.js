const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const path = require('path');
const upload = require('./editarperfil/middleware');
const Resize = require('./editarperfil/resize');

var html = fs.readFileSync('./ABMClientes/index.ejs');
var modalCargarclien = fs.readFileSync('./ABMClientes/modalCargarClientes.ejs');
var modalBorrarclien = fs.readFileSync('./ABMClientes/modalBorrarClientes.ejs');
var modalModificclien = fs.readFileSync('./ABMClientes/modalModificarClientes.ejs');
var mostrarmodal = fs.readFileSync('./ABMClientes/mostrarmodalModif.ejs');
var mostrarmodalborr = fs.readFileSync('./ABMClientes/mostrarModalBorrar.ejs');
var usuario
var contrahash;
var bootswatch = fs.readFileSync("../Node-JS-Simple-CRUD/bootstrap.min.css");
const app = express();

const port = process.env.PORT || 1002;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.writeHead(302, {
        'Location': '/Inicio'
      });
      res.end();
})

app.get('/ABMClientes', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function verificar (err2, result2, campos2){
    if (err2) throw err2;
    try {
    let usu = result2[0]["id_usuario"];
    let con = result2[0]["contrasena"];
    let permix = result2[0]["permiso"];
    if ((usu == usuario) && (con == contrahash) && (permix == "admin")){
        connection.query("select * from clientes", function clientes (err, result, campos){
            if (err) throw err;
            res.write(modalCargarclien);
            
            
            res.write(html);
            let resi = 
            '<meta charset="utf-8"><body style="background-color:#0a0a0a;">'+
            "<table class='table table-bordered bg-light' style='position:absolute; top:20%; width:100%;' >"+
            "<thead class='bg-dark'>"+
            "<tr>"+
            "<th style='color:white;' scope='col'>#</th>"+
            "<th style='color:white;' scope='col'>Nombre y apellido</th>"+
            "<th style='color:white;' scope='col'>Teléfono</th>"+
            "<th style='color:white;' scope='col'>Dirección</th>"+
            "<th style='color:white;' scope='col'>Modificación</th>"+
            "</tr>"+
            "</thead>"+
            "<tbody><link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' />"
            for (let row in result) {
                resi += "<tr><td id='idclirow'>"
                + result[row]["id_cliente"]  
                resi += "</td>"
                resi += "<td id='nomclirow'>"
                + result[row]["razon_social_cliente"]  
                resi += "</td>"
                resi += "<td id='telclirow'>"
                + result[row]["telefono"]  
                resi += "</td>"
                resi += "<td id='direclirow'>"
                + result[row]["direccion"]  
                resi += '<td><button type="button" class="btnEditar me-md-2 btn btn-primary btn-space" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Editar</a><button type="button" class="btnBorrar btn btn-danger btn-spacio" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Borrar </a></td>'
                resi += "</td></tr>"
            }
                "  </tbody>"+
                " </table>"
            
            resi += '</body>';
            res.write(resi);
            res.write(modalModificclien);
            res.write(mostrarmodal); 
            res.write(modalBorrarclien);
            res.write(mostrarmodalborr); 
            res.end();
        })
    }else{
        res.writeHead(302, {
            'Location': '/Inicio'
        });
        res.end();
    }
    } catch (error) {  
        res.writeHead(302, {
            'Location': '/Inicio'
        });
        res.end();
    };
});
});
app.post('/cargarclienteaccion', function(req, res){  
    var nombreclientix = req.body.nombreclia;
    var direccioncliax = req.body.direccionclia;
    var telefonoclia = req.body.telefonoclia;
    connection.query("INSERT INTO clientes(razon_social_cliente, telefono, direccion) "+
    "VALUES"+
    "('"+ nombreclientix +"','"+ direccioncliax +"','"+ telefonoclia +"')", 
    function clientes (err, result, campos){
        if (err) throw err;
        res.writeHead(302, {
            'Location': '/ABMClientes'
          });
          res.end();
    })
});  
////////////////////////////////
app.post('/buscador', function(req, res){ 
    try {
    res.setHeader('Content-type', 'text/html'); 
    var nombreclientix = req.body.buskeda;
    //nombreclientix
    connection.query("select * from clientes where concat(id_cliente, razon_social_cliente, telefono, direccion) like ?;", ['%' + nombreclientix + '%'],
    
    function clientes (err, result, campos){
        if (err) throw err;
        res.write(modalCargarclien);
        
        
        res.write(html); 
        
        let resi = 
        '<meta charset="utf-8"><body style="background-color:#0a0a0a;">'+
        "<table class='table table-bordered bg-light' style='position:absolute; top:20%; width:100%;' >"+
        "<thead class='bg-dark'>"+
        "<tr>"+
        "<th style='color:white;' scope='col'>#</th>"+
        "<th style='color:white;' scope='col'>Nombre y apellido</th>"+
        "<th style='color:white;' scope='col'>Teléfono</th>"+
        "<th style='color:white;' scope='col'>Dirección</th>"+
        "<th style='color:white;' scope='col'>Modificación</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody><link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' />"
        
            for (let row in result) {
                resi += "<tr><td id='idclirow'>"
                + result[row]["id_cliente"]  
                resi += "</td>"
                resi += "<td id='nomclirow'>"
                + result[row]["razon_social_cliente"]  
                resi += "</td>"
                resi += "<td id='telclirow'>"
                + result[row]["telefono"]  
                resi += "</td>"
                resi += "<td id='direclirow'>"
                + result[row]["direccion"]  
                resi += '<td><button type="button" class="btnEditar me-md-2 btn btn-primary btn-space" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Editar</a><button type="button" class="btnBorrar btn btn-danger btn-spacio" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Borrar </a></td>'
                resi += "</td></tr>"
            }
                "  </tbody>"+
                " </table>"
            
            resi += '</body>';
            res.write(resi);
            res.write(modalModificclien);
            res.write(mostrarmodal); 
            res.write(modalBorrarclien);
            res.write(mostrarmodalborr); 
            res.end();
       
        
    })
    } catch (error) {
    usuario = []
    contrahash = []
    res.write("<script>alert('INYECCIÓN');</script>")
    

    res.writeHead(302, {
        'Location': '/'
        });
        res.end();
}
});  


app.post('/modificarclienteaccion', function(req, res){  
    var idclientix = req.body.ache;
    var nombreclientix = req.body.nomcliax;
    var direccioncliax = req.body.direcliax;
    var telefonoclia = req.body.telcliax;
    connection.query("UPDATE clientes SET razon_social_cliente ='"+nombreclientix+
    "', telefono='"+telefonoclia+
    "', direccion='"+direccioncliax+"' WHERE id_cliente ="+idclientix
    ,function clientes (err, result, campos){
        if (err) throw err;
        res.writeHead(302, {
            'Location': '/ABMClientes'
          });
          res.end();
    })
});  

app.post('/borracion', function(req, res){  
    var idclientix = req.body.achex;

    connection.query("DELETE from clientes WHERE id_cliente ="+idclientix
    ,function clientes (err, result, campos){
        if (err) throw err;
        res.writeHead(302, {
            'Location': '/ABMClientes'
          });
          res.end();
    })
});  






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// PÁGINA DE INICIO ///////////////////////////////////////////////////////////////////////////////


var inicio = fs.readFileSync('./Inicio/index.ejs');
var inicios = fs.readFileSync('./Inicio/indexcom.ejs');
var inicior = fs.readFileSync('./Inicio/indexr.ejs')
var iniciorp2 = fs.readFileSync('./Inicio/indexrp2.ejs')

app.get('/Inicio', (req, res) => {
    let resi1 = "";
   
    connection.query("SELECT `id_producto`, `producto`, `precio`, `portada_prod` FROM `productos`"
    ,function clientes (err23, result23){
        if (err23) throw err23;
        resi1 += ' <div class="container" style="position: absolute; top: 100px; left:54px">';
        resi1 += ' <div class="row align-items-start">';
        for (let row3 in result23) { 
            resi1 += '<h4 style="color:white; display: none;" type="hidden">'+  result23[row3]["id_producto"] +'</h4>';
            resi1 += ' <div class="col-md-3 col-sm-offset-1 overflow-hidden">';
            resi1 += ' <center>';
            resi1 += ' <div class="border border-dark rounded-pill bg-danger >';
            
            resi1 += '<h5 style="color:black;">'+ result23[row3]["producto"] +'</h5>';
            resi1 += '</div>';

            resi1 += ' </center>';
            resi1 += ' <div class="classtainerxing border border-danger rounded overflow-hidden">';
            resi1 += ' <center>';
            
            resi1 += '<img src="http://localhost:1002/bd-imgproductos/'+ result23[row3]["portada_prod"] +'" style="opacity: 0.75;width:180px;height:230px; mix-blend-mode: multiply;background-color: transparent;" > ';
            
            resi1 += '<h5 style="color:white;" class="bg-dark">'+  result23[row3]["precio"] +'</h5>';
            resi1 += '</center>';
            resi1 += '</div>';
            resi1 += '</div>';
        }
        resi1 += ' </div>'
        resi1 += ' </div><link rel="stylesheet" type="text/css" href="http://localhost:1002/Inicio/animations/animationsindex.css" />'   

        res.setHeader('Content-type', 'text/html');

        res.write(inicios);
        res.write(inicio);
        res.write(resi1);
        res.end();
    })
});

app.post('/buscadorprodindex', (req, res) => {
    bushked = req.body.buskedaprodindex;
    let resi1 = "";
   
    connection.query("SELECT `id_producto`, `producto`, `precio`, `portada_prod` FROM `productos`  WHERE concat(producto, precio) like ?", ['%' + bushked + '%']
    ,function clientes (err23, result23){
        if (err23) throw err23;
        resi1 += ' <div class="container" style="position: absolute; top: 100px; left:54px">';
        resi1 += ' <div class="row align-items-start">';
        for (let row3 in result23) { 
            resi1 += '<h4 style="color:white; display: none;" type="hidden">'+  result23[row3]["id_producto"] +'</h4>';
            resi1 += ' <div class="col-md-3 col-sm-offset-1 overflow-hidden">';
            resi1 += ' <center>';
            resi1 += ' <div class="border border-dark rounded-pill bg-danger >';
            
            resi1 += '<h5 style="color:black;">'+ result23[row3]["producto"] +'</h5>';
            resi1 += '</div>';

            resi1 += ' </center>';
            resi1 += ' <div class="classtainerxing border border-danger rounded overflow-hidden">';
            resi1 += ' <center>';
            
            resi1 += '<img src="http://localhost:1002/bd-imgproductos/'+ result23[row3]["portada_prod"] +'" style="opacity: 0.75;width:180px;height:230px; mix-blend-mode: multiply;background-color: transparent;" > ';
            
            resi1 += '<h5 style="color:white;" class="bg-dark">'+  result23[row3]["precio"] +'</h5>';
            resi1 += '</center>';
            resi1 += '</div>';
            resi1 += '</div>';
        }
        resi1 += ' </div>'
        resi1 += ' </div><link rel="stylesheet" type="text/css" href="http://localhost:1002/Inicio/animations/animationsindex.css" />'   

        res.setHeader('Content-type', 'text/html');

        res.write(inicios);
        res.write(inicio);
        res.write(resi1);
        res.end();
    })
});



app.post('/buscadorprodindexr', (req, res) => {
    bushked = req.body.buskedaprodindexr;
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
        let usu = result[0]["id_usuario"];
        let con = result[0]["contrasena"];
        let fotperf = result[0]["foto_perfil"];
        let x;
        let foting = "<form action='/EditarPerfil' method='get'>   <div class='dropdown'>"+
        "<img src='http://localhost:1002/bd-imagenes/"+ fotperf +"' height='50' width='50' class='dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>"+
        "</img>"+
        "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>"+
        "  <li><form action='/EditarPerfil' method='get'><a style='cursor:pointer;' class='xDPER dropdown-item' ><i class='fa fa-user' aria-hidden='true'></i> Editar perfil</a></li></form>"+
        "</ul><button  type='submit' id='abperf' class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
        "<span class='navbar-toggler-icon'></span>"+
        "</button>"+
        "<script>$('.xDPER').click(function() {document.getElementById('abperf').click();});</script>"+
        "</div>"
        let resi1 = "";
   
        connection.query("SELECT `id_producto`, `producto`, `precio`, `portada_prod` FROM `productos` WHERE concat(producto, precio) like ?", ['%' + bushked + '%']
        ,function clientes (err23, result23){
            if (err23) throw err23;
            resi1 += ' <div class="container" style="position: absolute; top: 100px; left:54px">';
            resi1 += ' <div class="row align-items-start">';
            for (let row3 in result23) { 
                
                resi1 += ' <div class="col-md-3 col-sm-offset-1 overflow-hidden">';
                resi1 += ' <center>';
                resi1 += ' <div class="mytitling border border-dark rounded-pill bg-danger >';
                resi1 += '<h5 style="color:black;">'+ result23[row3]["producto"] +'</h5>';
                resi1 += '</div>';
    
                resi1 += ' </center>';
                resi1 += ' <div class="classtainerxing border border-danger rounded overflow-hidden">';
                resi1 += ' <center>';
                
                resi1 += '<img src="http://localhost:1002/bd-imgproductos/'+ result23[row3]["portada_prod"] +'" style="opacity: 0.75;width:180px;height:230px; mix-blend-mode: multiply;background-color: transparent;" > ';
                
                resi1 += '<h5 style="color:white;" class="bg-dark">'+  result23[row3]["precio"] +'</h5>';
                resi1 += '</center>';
                resi1 += '</div>';
                resi1 += '</div>';
            }
            resi1 += ' </div>'
            resi1 += ' </div><link rel="stylesheet" type="text/css" href="http://localhost:1002/Inicio/animations/animationsindex.css" />'   
       
        if ((usu == usuario) && (con == contrahash)){
            res.setHeader('Content-type', 'text/html');
            
            res.write(inicio);
            res.write(inicior);
            res.write(foting);
            res.write(iniciorp2);
            res.write(resi1);
            
            res.end();
        }
    })
        } catch (error) {   
            
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
    


});


app.use('/bd-imagenes', express.static('./bd-imagenes/'));


app.use('/Inicio/Animations', express.static('./Inicio/'));

app.get('/Inicior', (req, res) => {
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
        let usu = result[0]["id_usuario"];
        let con = result[0]["contrasena"];
        let fotperf = result[0]["foto_perfil"];
        let x;
        let foting = "<form action='/EditarPerfil' method='get'>   <div class='dropdown'>"+
        "<img src='http://localhost:1002/bd-imagenes/"+ fotperf +"' height='50' width='50' class='dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>"+
        "</img>"+
        "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>"+
        "  <li><form action='/EditarPerfil' method='get'><a style='cursor:pointer;' class='xDPER dropdown-item' ><i class='fa fa-user' aria-hidden='true'></i> Editar perfil</a></li></form>"+
        "</ul><button  type='submit' id='abperf' class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
        "<span class='navbar-toggler-icon'></span>"+
        "</button>"+
        "<script>$('.xDPER').click(function() {document.getElementById('abperf').click();});</script>"+
        "</div>"
        let resi1 = "";
   
        connection.query("SELECT `id_producto`, `producto`, `precio`, `portada_prod` FROM `productos`"
        ,function clientes (err23, result23){
            if (err23) throw err23;
            resi1 += ' <div class="container" style="position: absolute; top: 100px; left:54px">';
            resi1 += ' <div class="row align-items-start">';
            for (let row3 in result23) { 
                
                resi1 += ' <div class="col-md-3 col-sm-offset-1 overflow-hidden">';
                resi1 += ' <center>';
                resi1 += ' <div class="mytitling border border-dark rounded-pill bg-danger >';
                resi1 += '<h5 style="color:black;">'+ result23[row3]["producto"] +'</h5>';
                resi1 += '</div>';
    
                resi1 += ' </center>';
                resi1 += ' <div class="classtainerxing border border-danger rounded overflow-hidden">';
                resi1 += ' <center>';
                
                resi1 += '<img src="http://localhost:1002/bd-imgproductos/'+ result23[row3]["portada_prod"] +'" style="opacity: 0.75;width:180px;height:230px; mix-blend-mode: multiply;background-color: transparent;" > ';
                
                resi1 += '<h5 style="color:white;" class="bg-dark">'+  result23[row3]["precio"] +'</h5>';
                resi1 += '</center>';
                resi1 += '</div>';
                resi1 += '</div>';
            }
            resi1 += ' </div>'
            resi1 += ' </div><link rel="stylesheet" type="text/css" href="http://localhost:1002/Inicio/animations/animationsindex.css" />'   
       
        if ((usu == usuario) && (con == contrahash)){
            res.setHeader('Content-type', 'text/html');
            
            res.write(inicio);
            res.write(inicior);
            res.write(foting);
            res.write(iniciorp2);
            res.write(resi1);
            
            res.end();
        }
    })
        } catch (error) {   
            
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
    
});

app.get('/Cerrarsesion', (req, res) => {
    usuario = []
    contrahash = []

    res.writeHead(302, {
        'Location': '/Inicio'
    });
    res.end();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// PÁGINA DE EDICIÓN DE PERFIL ////////////////////////////////////////////////////////////////////
var Editar_perfil = fs.readFileSync('./editarperfil/index.ejs');
var Editar_perfilp2 = fs.readFileSync('./editarperfil/indexp2.ejs');


app.post('/borr_fotoperf', upload.single('fotora'), async function (req, res) {
    fotoraborr = "default.png";
    try {
        connection.query("UPDATE `usuarios` SET foto_perfil = '"+fotoraborr+"' WHERE id_usuario ='"+usuario+"'"
        ,function clientes (err, result, campos){
            if (err) throw err;
            res.writeHead(302, {
                'Location': '/EditarPerfil'
            });
            res.end();
        });
    } catch (error) {
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
        res.end();
    }
   
});


app.post('/cargarimagen', upload.single('fotora'), async function (req, res) {
    try {
        
    const imagePath = path.join(__dirname, './bd-imagenes/');
    const fileUpload = new Resize(imagePath);
    
    const filename = await fileUpload.save(req.file.buffer);
    //return res.status(200).json({ name: filename });
    try {
    connection.query("UPDATE `usuarios` SET foto_perfil = '"+filename+"' WHERE id_usuario ='"+usuario+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
    res.end();

       
    })
    } catch (error) {   
            
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
    res.end();
}
} catch (error) {
    res.writeHead(302, {
        'Location': '/EditarPerfil'
    });
    res.end();
}
});


app.post('/modificaratt', (req, res) => {
    let namex = req.body.cnombre;
    let apellx = req.body.cape;
    let convieja = req.body.ncontra;
    let conactual = req.body.cncontra;
    let corerox = req.body.ccorr;

    if((namex !== "") || (apellx !== "") || (convieja !== "") || (corerox !== "")){
    let conactualhash = crypto.createHash('sha512').update(convieja).digest('hex');
    let contranuevahash = crypto.createHash('sha512').update(conactual).digest('hex');

    if(contrahash == conactualhash){
        try {
            connection.query("UPDATE usuarios set nombreus = '"+ namex +"', apellidous ='"+ apellx +"', contrasena='"+ contranuevahash +"', correo='"+ corerox +"' WHERE id_usuario = '"+usuario+"' AND contrasena = '"+conactualhash+"'"
            ,function clientes (err, result, campos){
                if (err) throw err;
                res.writeHead(302, {
                    'Location': '/EditarPerfil'
                });
                res.end()
            });
        } catch (error) {
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
        res.end();
        }
    }else{
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
        res.end();
    }
    }else{
        res.writeHead(302, {
            'Location': '/EditarPerfil'
        });
        res.end();
    }
})


app.get('/EditarPerfil', (req, res) => {
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
        let usu = result[0]["id_usuario"];
       
        let con = result[0]["contrasena"];
        let fotperf = result[0]["foto_perfil"];


        let nombrelli = result[0]["nombreus"];
        let apellidelli = result[0]["apellidous"];
        let corroxas = result[0]["correo"];

        let camposacomp = "<meta charset='utf-8'><center>"+
        "<form action='/modificaratt' method='POST' style='position:absolute; top:250px; left:20%;width: 50%;min-height: 550px;'>"+
        
        "<input name='cid' value='' type='hidden' style=' top: 500px; text-align: center;'>"+
        
        "<h6 class='border border-danger rounded-pill bg-dark' style='color:white; text-align: center;' >Cambiar nombre</h6>"+
        "<input name='cnombre' value = '"+ nombrelli +"' placeholder='Nombre' type='text' style=' text-align: center;'>"+
        
        "<h6 class='border border-danger rounded-pill bg-dark' style='color:white; text-align: center;' >Cambiar apellido</h6>"+
        "<input name='cape' value = '"+ apellidelli +"' placeholder='apellido' type='text' style=' text-align: center;'>"+
        
        " <h6 class='border border-danger rounded-pill bg-dark' style='color:white;  text-align: center;' >Contraseña actual</h6>"+
        "<input name='ncontra'  type='password' placeholder='Contraseña actual' style='  text-align: center;'>"+
        
        "  <h6 class='border border-danger rounded-pill bg-dark' style='color:white;  text-align: center;' >Nueva contraseña</h6>"+
        " <input name='cncontra'  type='password' placeholder='Nueva contraseña' style=' text-align: center;'>"+
        
        " <h6 class='border border-danger rounded-pill bg-dark' style='color:white; text-align: center;' >Cambiar correo</h6>"+
        "<input name='ccorr' value = '"+ corroxas +"' type='text'  placeholder='Correo' style='text-align: center;'>"+
        
        
        "</center>"+
        "<button type='submit' name='cargardatos' class='btn btn-danger' style=' text-align:center; position:relative; left:843px; top:630px'>Modificar</button>"+
        "</form>"


        let foting = "<form action='/EditarPerfil' method='get'>   <div class='dropdown'>"+
        "<img  src='http://localhost:1002/bd-imagenes/"+ fotperf +"' height='50' width='50' class='dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>"+
        "</img>"+
        "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>"+
        "  <li><form action='/EditarPerfil' method='get'><a style='cursor:pointer;' class='xDPER dropdown-item' ><i class='fa fa-user' aria-hidden='true'></i> Editar perfil</a></li></form>"+
        "</ul><button  type='submit' id='abperf' class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
        "<span class='navbar-toggler-icon'></span>"+
        "</button>"+
        "<script>$('.xDPER').click(function() {document.getElementById('abperf').click();});</script>"+
        "</div>"
        let foting_perf = "<img src='http://localhost:1002/bd-imagenes/"+ fotperf +"' name='picus' class='picture-src' id='wizardPicturePreview' title=''><link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' /> "
        if ((usu == usuario) && (con == contrahash)){
            res.setHeader('Content-type', 'text/html');
            res.write(inicio);
            res.write(inicior);
            res.write(foting)

            res.write(iniciorp2)
            
            res.write(Editar_perfil)
            res.write(foting_perf)
            res.write(Editar_perfilp2)

            res.write(camposacomp)
            res.end();
        }

        } catch (error) {   
            
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// PÁGINA DE LOGIN-REGISTRO ///////////////////////////////////////////////////////////////////////

var login = fs.readFileSync('./Registro-inicio/login.ejs');
var loginSU = fs.readFileSync('./Registro-inicio/loginSU.ejs');

app.get('/login', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.write(login);
    res.end();
});

app.get('/loginSU', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.write(loginSU);
    res.end();
});



app.post('/loginconf', (req, res) => {
    usuario = req.body.Llogin;
    contra = req.body.Lpassword;
    contrahash = crypto.createHash('sha512').update(contra).digest('hex');
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
            var usu = result[0]["id_usuario"];
            var con = result[0]["contrasena"];
            if ((usu == usuario) && (con == contrahash)){
            
            res.writeHead(302, {
                'Location': '/Inicior'
            });
                res.end();
        }
        } catch (error) {
            console.log("Credenciales inválidas!!" + contrahash);
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// PÁGINA DE ABM PRODUCTOS ///////////////////////////////////////////////////////////////////////

var ABMProductox = fs.readFileSync('./ABMProductos/index.ejs');
var ABMProductoModalBorrar = fs.readFileSync('./ABMProductos/modalBorrarProductos.ejs');
var ABMProductoModalModificar = fs.readFileSync('./ABMProductos/modalModificarProductos.ejs');
var ABMProductoModalModificar2 = fs.readFileSync('./ABMProductos/modalModificarProductos2.ejs');

var ABMProductoModalPortada = fs.readFileSync('./ABMProductos/modalPortadaProducto.ejs');
var ABMProductoModalPortada2 = fs.readFileSync('./ABMProductos/modalPortadaProducto2.ejs');

var ABMProductoModalAgregar = fs.readFileSync('./ABMProductos/modalCargarProductos.ejs');
var ABMProductoModalAgregar2 = fs.readFileSync('./ABMProductos/modalCargarProductos2.ejs');


app.post('/buscadorprod', (req, res) => {
    bushked = req.body.buskedaprod;
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
        let usu = result[0]["id_usuario"];
        let con = result[0]["contrasena"];
        let fotperf = result[0]["foto_perfil"];
        let permix1 = result[0]["permiso"];
        let x;
        let foting = 
        "<form class='d-flex' style='position:absolute; top:10px; right:20%;' method='POST' action='/buscadorprod'>"+
            "<input class='form-control me-2' name='buskedaprod' type='search' placeholder='Buscar' aria-label='Search'>"+
            "<button class='btn btn-outline-danger' type='submit'>Buscar</button>"+
        "</form>"+

        "<form action='/EditarPerfil' method='get'>   <div class='dropdown'>"+
        "<img  src='http://localhost:1002/bd-imagenes/"+ fotperf +"' height='50' width='50' class='dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>"+
        "</img>"+
        "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>"+
        "  <li><form action='/EditarPerfil' method='get'><a style='cursor:pointer;' class='xDPER dropdown-item' ><i class='fa fa-user' aria-hidden='true'></i> Editar perfil</a></li></form>"+
        "</ul><button  type='submit' id='abperf' class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
        "<span class='navbar-toggler-icon'></span>"+
        "</button>"+
        "<script>$('.xDPER').click(function() {document.getElementById('abperf').click();});</script>"+
        "</div>"

        let resi = 
        '<meta charset="utf-8"><body style="background-color:#0a0a0a;">'+
        "<button id='btnAProd' class='btnAProd btn btn-danger' data-toggle='modal' style='position: absolute; top: 11.6%; right:3%; height:50px; width:100px; z-index:9;'>"+
        "<i class='fa fa-plus-circle' aria-hidden='true'></i> Cargar"+
        "</button>"+
        "<table class='table table-bordered bg-light' style='position:absolute; top:20%; width:100%;' >"+
        "<thead class='bg-dark'>"+
        "<tr>"+
        "<th style='color:white;' scope='col'>#</th>"+
        "<th style='color:white;' scope='col'>Producto</th>"+
        "<th style='color:white;' scope='col'>Stock</th>"+
        "<th style='color:white;' scope='col'>Precio</th>"+
        "<th style='color:white;' scope='col'>Proveedor</th>"+
        "<th style='color:white;' scope='col'>Modificación</th>"+
        "<th style='color:white;' scope='col'>Portada</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody<link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' />>"

    connection.query("SELECT `id_producto`, `producto`, `stock`, `precio`, `razon_social_proveedor`, `portada_prod`, productos.id_proveedor FROM `productos` join proveedores"+
    " on proveedores.id_proveedor = productos.id_proveedor WHERE concat(producto, stock, precio, razon_social_proveedor) like ? ORDER BY id_producto ASC", ['%' + bushked + '%']
    ,function clientes (err2, result2, campos){
        if (err2) throw err2;
        try {
            for (let row in result2) {
                resi += "<tr><td id='idprodrow'>"
                + result2[row]["id_producto"]  
                resi += "</td>"
                resi += "<td id='nomprodrow'>"
                + result2[row]["producto"]  
                resi += "</td>"
                resi += "<td id='stockprodrow'>"
                + result2[row]["stock"]  
                resi += "</td>"
                resi += "<td id='precprodrow'>"
                + result2[row]["precio"]  
                resi += "</td>"
                resi += "<td id='provrow'>"
                + result2[row]["razon_social_proveedor"]  
                resi += "</td>"

                resi += '<td><center><button type="button" class="btnEditarP me-md-2 btn btn-primary btn-space" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Editar</a>'
                resi += '<button type="button" class="btnBorrarP btn btn-danger btn-spacio" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Borrar </a></center></td>'
                resi += "</td>"
                resi += "</td>"

                resi += '<td id="imgportadprod"><center><button type="button" class="btnCargarPortada me-md-2 btn btn-danger btn-space" data-toggle="modal"><i class="fa fa-camera" aria-hidden="true"></i> Portada</a>'
                resi += "</td>"

                resi += "<td id='idportadix'  style='display:none;' >"
                + result2[row]["portada_prod"]  
                resi += "</td>"
                
                resi += "<td style='display:none;' id='iddeproveedorprod'>"
                + result2[row]["id_proveedor"]  
                resi += "</tr>"
                
            }
                "  </tbody>"+
                " </table>"
            
            resi += '</body>';                
            //<td type='text' value=''+ result2[row]['id_proveedor'] +' id='iddeproveedorprod'></td>
           
            let proveedores ="<br><select id='proveedC' name='proveedC' class='form-select' aria-label='Default select example'>"+
            "<option value='x'>Proveedores</option>"
            connection.query("SELECT * FROM `proveedores`"
            ,function clientes4 (err3, result3, campos){
            if (err3) throw err3;
            for (let row4 in result3) {
                proveedores +="<option  value='"+ result3[row4]["id_proveedor"]  +"'>"+ result3[row4]["razon_social_proveedor"] +"</option>"
                }
            
            proveedores += "</select>"
            let foting_perf1 = "<img src='http://localhost:1002/bd-imagenes/"+ fotperf +"' name='picus' class='picture-src' id='wizardPicturePreview' title=''> "
            
           


            let proveedores1 ="<br><select id='proveedC1' name='proveedC1' class='form-select' aria-label='Default select example'>"+
            "<option value='x'>Proveedores</option>"

            connection.query("SELECT * FROM `proveedores`"
            ,function clientes4 (err4, result4, campos){
            if (err4) throw err4;
            for (let row5 in result4) {
                proveedores1 +="<option value='"+ result4[row5]["id_proveedor"]  +"'>"+ result4[row5]["razon_social_proveedor"] +"</option>"
                }
            
            proveedores1 += "</select>"
            if ((usu == usuario) && (con == contrahash) && (permix1 == "admin")){
                res.setHeader('Content-type', 'text/html');
                res.write(inicio);
                res.write(inicior);
                res.write(foting)
                res.write(iniciorp2)
                res.write(resi);

                res.write(ABMProductoModalAgregar)
                res.write(proveedores)
                res.write(ABMProductoModalAgregar2)
                
                res.write(ABMProductoModalModificar)
                res.write(proveedores1)
                res.write(ABMProductoModalModificar2)



                res.write(ABMProductoModalPortada)



                res.write(ABMProductoModalBorrar)
                res.write(ABMProductox)
                res.write("<link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' />")
                
                res.end();
            }
        })
    })
        }catch (error) {   
            res.writeHead(302, {
                'Location': '/Inicior'
            });
            res.end();
        }
    })
       
        } catch (error) {   
            
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
})

app.use('/bd-imgproductos', express.static('./bd-imgproductos/'));

app.get('/ABMProdutos', (req, res) => {
    connection.query("SELECT * FROM `usuarios` WHERE id_usuario = '"+usuario+"' and contrasena = '"+contrahash+"'"
    ,function clientes (err, result, campos){
        if (err) throw err;
        try {
        let usu = result[0]["id_usuario"];
        let con = result[0]["contrasena"];
        let fotperf = result[0]["foto_perfil"];
        let permix1 = result[0]["permiso"];
        let x;
        let foting = 
        "<form class='d-flex' style='position:absolute; top:10px; right:20%;' method='POST' action='/buscadorprod'>"+
            "<input class='form-control me-2' name='buskedaprod' type='search' placeholder='Buscar' aria-label='Search'>"+
            "<button class='btn btn-outline-danger' type='submit'>Buscar</button>"+
        "</form>"+

        "<form action='/EditarPerfil' method='get'>   <div class='dropdown'>"+
        "<img  src='http://localhost:1002/bd-imagenes/"+ fotperf +"' height='50' width='50' class='dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>"+
        "</img>"+
        "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>"+
        "  <li><form action='/EditarPerfil' method='get'><a style='cursor:pointer;' class='xDPER dropdown-item' ><i class='fa fa-user' aria-hidden='true'></i> Editar perfil</a></li></form>"+
        "</ul><button  type='submit' id='abperf' class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
        "<span class='navbar-toggler-icon'></span>"+
        "</button>"+
        "<script>$('.xDPER').click(function() {document.getElementById('abperf').click();});</script>"+
        "</div>"

        let resi = 
        '<meta charset="utf-8"><body style="background-color:#0a0a0a;">'+
        "<button id='btnAProd' class='btnAProd btn btn-danger' data-toggle='modal' style='position: absolute; top: 11.6%; right:3%; height:50px; width:100px; z-index:9;'>"+
        "<i class='fa fa-plus-circle' aria-hidden='true'></i> Cargar"+
        "</button>"+
        "<table class='table table-bordered bg-light' style='position:absolute; top:20%; width:100%;' >"+
        "<thead class='bg-dark'>"+
        "<tr>"+
        "<th style='color:white;' scope='col'>#</th>"+
        "<th style='color:white;' scope='col'>Producto</th>"+
        "<th style='color:white;' scope='col'>Stock</th>"+
        "<th style='color:white;' scope='col'>Precio</th>"+
        "<th style='color:white;' scope='col'>Proveedor</th>"+
        "<th style='color:white;' scope='col'>Modificación</th>"+
        "<th style='color:white;' scope='col'>Portada</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody><link rel='stylesheet' type='text/css' href='http://localhost:1002/Inicio/animations/animationsindex.css' />"

    connection.query("SELECT `id_producto`, `producto`, `stock`, `precio`, `razon_social_proveedor`, `portada_prod`, productos.id_proveedor FROM `productos` join proveedores"+
    " on proveedores.id_proveedor = productos.id_proveedor ORDER BY id_producto ASC"
    ,function clientes (err2, result2, campos){
        if (err2) throw err2;
        try {
            for (let row in result2) {
                resi += "<tr><td id='idprodrow'>"
                + result2[row]["id_producto"]  
                resi += "</td>"
                resi += "<td id='nomprodrow'>"
                + result2[row]["producto"]  
                resi += "</td>"
                resi += "<td id='stockprodrow'>"
                + result2[row]["stock"]  
                resi += "</td>"
                resi += "<td id='precprodrow'>"
                + result2[row]["precio"]  
                resi += "</td>"
                resi += "<td id='provrow'>"
                + result2[row]["razon_social_proveedor"]  
                resi += "</td>"

                resi += '<td><center><button type="button" class="btnEditarP me-md-2 btn btn-primary btn-space" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Editar</a>'
                resi += '<button type="button" class="btnBorrarP btn btn-danger btn-spacio" data-toggle="modal"><span class="glyphicon glyphicon-edit"></span> Borrar </a></center></td>'
                resi += "</td>"
                resi += "</td>"

                resi += '<td id="imgportadprod"><center><button type="button" class="btnCargarPortada me-md-2 btn btn-danger btn-space" data-toggle="modal"><i class="fa fa-camera" aria-hidden="true"></i> Portada</a>'
                resi += "</td>"

                resi += "<td id='idportadix'  style='display:none;' >"
                + result2[row]["portada_prod"]  
                resi += "</td>"
                
                resi += "<td style='display:none;' id='iddeproveedorprod'>"
                + result2[row]["id_proveedor"]  
                resi += "</tr>"
                
            }
                "  </tbody>"+
                " </table>"
            
            resi += '</body>';                
            //<td type='text' value=''+ result2[row]['id_proveedor'] +' id='iddeproveedorprod'></td>
           
            let proveedores ="<br><select id='proveedC' name='proveedC' class='form-select' aria-label='Default select example'>"+
            "<option value='x'>Proveedores</option>"
            connection.query("SELECT * FROM `proveedores`"
            ,function clientes4 (err3, result3, campos){
            if (err3) throw err3;
            for (let row4 in result3) {
                proveedores +="<option  value='"+ result3[row4]["id_proveedor"]  +"'>"+ result3[row4]["razon_social_proveedor"] +"</option>"
                }
            
            proveedores += "</select>"
            let foting_perf1 = "<img src='http://localhost:1002/bd-imagenes/"+ fotperf +"' name='picus' class='picture-src' id='wizardPicturePreview' title=''> "
            
           


            let proveedores1 ="<br><select id='proveedC1' name='proveedC1' class='form-select' aria-label='Default select example'>"+
            "<option value='x'>Proveedores</option>"

            connection.query("SELECT * FROM `proveedores`"
            ,function clientes4 (err4, result4, campos){
            if (err4) throw err4;
            for (let row5 in result4) {
                proveedores1 +="<option value='"+ result4[row5]["id_proveedor"]  +"'>"+ result4[row5]["razon_social_proveedor"] +"</option>"
                }
            
            proveedores1 += "</select>"
            if ((usu == usuario) && (con == contrahash) && (permix1 == "admin")){
                res.setHeader('Content-type', 'text/html');
                res.write(inicio);
                res.write(inicior);
                res.write(foting)
                res.write(iniciorp2)
                res.write(resi);

                res.write(ABMProductoModalAgregar)
                res.write(proveedores)
                res.write(ABMProductoModalAgregar2)
                
                res.write(ABMProductoModalModificar)
                res.write(proveedores1)
                res.write(ABMProductoModalModificar2)



                res.write(ABMProductoModalPortada)



                res.write(ABMProductoModalBorrar)

                res.write(ABMProductox)
                res.end();
            }
        })
    })
        }catch (error) {   
            res.writeHead(302, {
                'Location': '/Inicior'
            });
            res.end();
        }
    })
       
        } catch (error) {   
            
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
        
    })
    
});

app.post('/CargarFotoProducto', upload.single('wizardpicturemyaml'), async function (req, res) {
    let inputportada = req.body.wizardpicturemyaml;
    let idprouk = req.body.id_prod;
    try {
        
        const imagePath = path.join(__dirname, './bd-imgproductos/');
        const fileUpload = new Resize(imagePath);
        
        const filename = await fileUpload.save(req.file.buffer);
        connection.query("UPDATE `productos` SET portada_prod = '"+filename+"' WHERE id_producto ='"+idprouk+"'"
        ,function clientes (err, result, campos){
            if (err) throw err;
            res.writeHead(302, {
                'Location': '/ABMProdutos'
            });
        res.end();
    
           
        })
       
    } catch (error) {
        console.log(error)
        res.writeHead(302, {
            'Location': '/ABMProdutos'
        });
        res.end();
    }
})


app.post('/borrarProductos', function(req, res){ 
    let idproductoxds = req.body.borrProduID;
    try {
        connection.query("DELETE from productos WHERE id_producto ="+idproductoxds
        ,function clientes (err2, result2, campos){
            if (err2) throw err2;
            res.writeHead(302, {
                'Location': '/ABMProdutos'
            });
            res.end();
        })
    } catch (error) {
        res.writeHead(302, {
            'Location': '/ABMProdutos'
        });
        res.end();
    }
})



app.post('/modificarProductos', function(req, res){ 
    let idproducto = req.body.acheProduxc;
    let produtox = req.body.nomcliaxProd;
    let stocking = req.body.stockcliar;
    let precioprod = req.body.preciocliack;
    let proveedor = req.body.proveedC1;
    let moneda = req.body.MonedaM;
    try {
        connection.query("UPDATE `productos`"+
        "SET producto ='"+produtox+"', stock='"+stocking+"',precio='"+precioprod+ " " + moneda +"',id_proveedor="+proveedor+
        " WHERE id_producto="+idproducto
        ,function clientes (err2, result2, campos){
            if (err2) throw err2;
            res.writeHead(302, {
                'Location': '/ABMProdutos'
            });
            res.end();
        })
    } catch (error) {   
        res.writeHead(302, {
            'Location': '/ABMProdutos'
        });
        res.end();
    }
})



app.post('/cargarProductosA', function(req, res){  
    let producto = req.body.productoC;
    let stock = req.body.StockC;
    let precio = req.body.PrecioC;
    let idproov = req.body.proveedC;
    let moneda = req.body.MonedaC;
    if((producto !== "") && (stock !== "") && (precio !== "") && (idproov !== "x") && (!isNaN(stock) && (!isNaN(precio))  && (isNaN(moneda)) )){
    try {
        connection.query("INSERT INTO `productos`"+
        "(`producto`, `stock`, `precio`, `id_proveedor`, `portada_prod`)"+
        " VALUES ('"+producto+"','"+stock+"','"+precio +" "+ moneda +"','"+idproov+"', 'default.png')"
        ,function clientes (err2, result2, campos){
            if (err2) throw err2;
            res.writeHead(302, {
                'Location': '/ABMProdutos'
            });
            res.end();
        })
    } catch (error) {   
        res.writeHead(302, {
            'Location': '/ABMProdutos'
        });
        res.end();
    }
    }else{
        res.writeHead(302, {
            'Location': '/ABMProdutos'
        });
        res.end();
    }
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// HOST DE PÁGINA LOCAL ///////////////////////////////////////////////////////////////////////////////



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});