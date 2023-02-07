const stockProductos = [
  {
    id: 1,
    nombre: "Japón",
    cantidad: 1,
    desc: "Personaliza tú propio estilo.",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_639281-MEC31226646802_062019-O.jpg",
  },
  {
    id: 2,
    nombre: "Ecuador",
    cantidad: 1,
    desc: "Copa América",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_796106-MEC31226794254_062019-O.jpg",
  },
  {
    id: 3,
    nombre: "Paraguay",
    cantidad: 1,
    desc: "Un juego inolvidable",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_621980-MEC31226667646_062019-O.jpg",
  },
  {
    id: 4,
    nombre: "Chile",
    cantidad: 1,
    desc: "Vive la experiencia",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_998401-MEC31226805625_062019-O.webp",
  },
  {
    id: 5,
    nombre: "Frozen",
    cantidad: 1,
    desc: "La historia de hielo",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_765234-MLM32416538213_102019-O.jpg",
  },
  {
    id: 6,
    nombre: "Cars",
    cantidad: 1,
    desc: "Un cumpleaños especial...",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_898053-MLM28276323867_102018-O.jpg",
  },
  {
    id: 7,
    nombre: "Mikey de amor",
    cantidad: 1,
    desc: "Nunca lo olvides",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_733902-MLM48831991990_012022-W.jpg",
  },
  {
    id: 8,
    nombre: "Flash",
    cantidad: 1,
    desc: "Un juego rapido",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_967629-MLM51297472220_082022-W.jpg",
  },
  {
    id: 9,
    nombre: "Aquí toma",
    cantidad: 1,
    desc: "El mejorAdministrador",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_629161-MLM43487617976_092020-W.jpg",
  },
  {
    id: 10,
    nombre: "Matemático",
    cantidad: 1,
    desc: "Tu profesor es especial",
    precio: 8,
    img: "https://http2.mlstatic.com/D_NQ_NP_999487-MLM44030901120_112020-O.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }