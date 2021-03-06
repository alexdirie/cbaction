let baseDeDatos = [];
let carrito = [];


class Producto {

  constructor(nombreProducto, marcaProducto, stockProducto, precioProducto, imagenProducto) {
    this.producto = nombreProducto;
    this.marca = marcaProducto;
    this.stock = stockProducto;
    this.precio = precioProducto;
    this.imagen = imagenProducto;
  }

}

let verRemera = new Producto("Remera", "CBAction", 20, 400, "../img/REMERA.png")
let verBuzo = new Producto("Buzo", "CBAction", 8, 600, "../img/BUZO.png")
let verPantalon = new Producto("Pantalon", "CBAction", 5, 1000, "../img/PANTALON.png")
let verGorra = new Producto("Gorra", "CBAction", 12, 200, "../img/GORRAP.png")


baseDeDatos.push(verRemera, verBuzo, verPantalon, verGorra);





let aux = ``;


for (let i = 0; i < baseDeDatos.length; i++) {
  if (baseDeDatos[i].stock > 0) {
    aux += ` <div class="cartas">
        <div class="col-xl-8 col-lg-8 col-md-6 col-s-4 col-xs-2 mb-4">
        <div class="card h-100">
        <a href="#"><img class="card-img-top" src="${baseDeDatos[i].imagen}" alt=""></a>
        <div class="card-body">
        <h5 class="card-title">
        ${baseDeDatos[i].producto}
        </h5>
        <h5 class="card-title">
        ${baseDeDatos[i].marca}
        </h5>
        <h5>$${baseDeDatos[i].precio}</h5>
        </div>
        <div class="card-footer">
        <button class="btn btn-primary botonProducto" style="width:100%" 
    onclick='agregarAlCarrito(${JSON.stringify(
      baseDeDatos[i])})'>Agregar al carrito</button>
        </div>
        </div>
        </div>
        </div>
        `;
  } else {
    aux += `
      <h2>No tenemos stock</h2>`
  }
}

document.getElementById("productos").innerHTML = aux;



function agregarAlCarrito(producto) {
  carrito.push(producto);
  console.log(carrito);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  

  let aux = 0;
  let tableHead = `<table>
   <tr>
       <th>Nombre</th>
       <th>Marca</th>
       <th>Precio</th>
   </tr>
`;
  let tablaCompleta = ``;
  let tableBody
  for (let i = 0; i < carrito.length; i++) {
    aux += carrito[i].precio;


    tableBody += `<tr>
     <th>${carrito[i].producto}</th>
     <th>${carrito[i].marca}</th>
     <th>${carrito[i].precio}</th>
 </tr>`;
  }
  tablaCompleta = tableHead + tableBody + `</table>`
  document.getElementById("precio-total").innerHTML = "$" + aux;
  document.getElementById("carrito").innerHTML = tablaCompleta;

  

}

if (localStorage.getItem("carrito") != null) {
  let valoresDelCarrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = valoresDelCarrito;
}




function obtenerDatos() {
  nombreCliente = document.getElementById("nombreCliente").value;
  apellidoCliente = document.getElementById("apellidoCliente").value;
  var nombreCompleto = [nombreCliente + " " + apellidoCliente];
  return nombreCompleto;
}

var input = document.getElementsByTagName("input")


for (i = 0; i < input.length; i++) {
  input[i].addEventListener("change", resultadoNombre)
};

function resultadoNombre() {
  resultado = obtenerDatos();
  console.log(resultado);
};


function comprar() {
  let aux1 = ``

  for (let i = 0; i < carrito.length; i++) {
    aux1 += ` 
        <div class="card h-100">
        <a href="#"><img class="card-img-top" src="${carrito[i].imagen}" alt=""></a>
        <div class="card-body">
        <h5 class="card-title">
        ${carrito[i].producto}
        </h5>
        <h5 class="card-title">
        ${carrito[i].marca}
        </h5>
        <h5>$${carrito[i].precio}</h5>
        </div>
        <div class="card-footer">
        <button type="button" class="btn btn-primary botonProducto" onclick="borrarUnProducto(${i})">Borrar un
                    producto</button>
        </div>
        </div>
        `;
  }
  document.getElementById("carrito").innerHTML = aux1
  
}

function borrarUnProducto(index) {
  const nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (i != index) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  
}

function vaciarCarrito(){
  window.location.reload();
  carrito = []
}


//APLICANDO jQuery//

$("button").hover(function () {
  $(this).css("background-color", "red");
},
  function () {
    $(this).css("background-color", "black");
  });

$("input").hover(function () {
  $(this).css("background-color", "lightpink");
},
  function () {
    $(this).css("background-color", "white");
  });


    //APLICANDO AJAX//

    $.get(
      "/data.json",
      function (data, status) {
        console.log(data)
        console.log(status);
        baseDedatos = valores;
      }
    );
