// Creo la aplicación de Vue
const app = Vue.createApp({
    data() {
        return {
            // Variables del sistema
            pantalla: 'inicio', // controla qué sección se ve
            idioma_actual: 'es', // idioma por defecto
            
            // Datos del usuario y tienda
            usuario_conectado: null,
            lista_productos: [],
            carrito_compras: [],
            producto_para_ver: null, // el producto que clickamos para ver detalle
            
            // Variables para los formularios
            form_login: {
                email: '',
                password: ''
            },
            form_registro: {
                nombre: '',
                id: '', // AHORA ES DNI
                email: '',
                password: '',
                cuenta: '',
                telefono: ''
            },
            errores_registro: {}, // aquí guardo los mensajes de error
            
            // Textos de la web (Traducciones)
            textos_web: {
                es: {
                    menu_inicio: 'Inicio',
                    menu_productos: 'Productos',
                    menu_acerca: 'Acerca de',
                    menu_login: 'Entrar / Registro',
                    menu_logout: 'Salir',
                    menu_carrito: 'Carrito',
                    titulo_bienvenida: 'Bienvenido a Tony Time & Jewels',
                    titulo_coleccion: 'Nuestra Colección',
                    boton_anadir: 'Añadir al Carrito',
                    boton_agotado: 'Fuera de Stock', // TEXTO NUEVO
                    boton_ver: 'Ver Detalles',
                    etiqueta_precio: 'Precio',
                    etiqueta_stock: 'Stock disponible', // TEXTO NUEVO
                    etiqueta_desc: 'Descripción',
                    texto_disponible: 'En Stock',
                    texto_agotado: 'Agotado',
                    texto_total: 'Total a pagar',
                    boton_vaciar: 'Borrar todo',
                    boton_comprar: 'Terminar Compra',
                    carrito_vacio: 'No has puesto nada en el carrito',
                    titulo_login: 'Acceso Clientes',
                    titulo_registro: 'Crear Cuenta Nueva',
                    campo_nombre: 'Tu Nombre',
                    campo_email: 'Tu Email',
                    campo_pass: 'Contraseña',
                    campo_cuenta: 'Cuenta Bancaria',
                    campo_telf: 'Teléfono',
                    btn_enviar: 'Enviar',
                    cat_relojes: 'Relojes',
                    cat_pendientes: 'Pendientes',
                    cat_anillos: 'Anillos',
                    cat_collares: 'Collares',
                    cat_pulseras: 'Pulseras',
                    cat_todos: 'Ver Todos'
                },
                en: {
                    menu_inicio: 'Home',
                    menu_productos: 'Products',
                    menu_acerca: 'About',
                    menu_login: 'Login / Register',
                    menu_logout: 'Logout',
                    menu_carrito: 'Cart',
                    titulo_bienvenida: 'Welcome to Tony Time & Jewels',
                    titulo_coleccion: 'Our Collection',
                    boton_anadir: 'Add to Cart',
                    boton_agotado: 'Out of Stock',
                    boton_ver: 'View Details',
                    etiqueta_precio: 'Price',
                    etiqueta_stock: 'Stock available',
                    etiqueta_desc: 'Description',
                    texto_disponible: 'In Stock',
                    texto_agotado: 'Out of Stock',
                    texto_total: 'Total',
                    boton_vaciar: 'Clear Cart',
                    boton_comprar: 'Checkout',
                    carrito_vacio: 'Your cart is empty',
                    titulo_login: 'Customer Login',
                    titulo_registro: 'New Account',
                    campo_nombre: 'Full Name',
                    campo_email: 'Email',
                    campo_pass: 'Password',
                    campo_cuenta: 'Bank Account',
                    campo_telf: 'Phone',
                    btn_enviar: 'Submit',
                    cat_relojes: 'Watches',
                    cat_pendientes: 'Earrings',
                    cat_anillos: 'Rings',
                    cat_collares: 'Necklaces',
                    cat_pulseras: 'Bracelets',
                    cat_todos: 'All Products'
                }
            }
        };
    },
    
    // Esto se ejecuta cuando arranca la página
    mounted() {
        console.log("La aplicación ha arrancado");
        
        // Miro si hay usuario guardado
        this.revisarSesion();
        
        // Cargo el carrito si había algo guardado
        this.cargarCarritoDeMemoria();
        
        // Pido los productos al servidor
        this.cargarProductos();
    },
    
    computed: {
        // Devuelve los textos en el idioma que toca
        t() {
            return this.textos_web[this.idioma_actual];
        },
        
        // Calcula el precio total sumando todo
        precioTotal() {
            let total = 0;
            // Recorro el carrito
            for (let i = 0; i < this.carrito_compras.length; i++) {
                let item = this.carrito_compras[i];
                total = total + (parseFloat(item.precio) * item.cantidad);
            }
            return total;
        },
        
        // Cuenta cuantos articulos hay
        numeroArticulos() {
            let contador = 0;
            for (let i = 0; i < this.carrito_compras.length; i++) {
                contador = contador + this.carrito_compras[i].cantidad;
            }
            return contador;
        }
    },
    
    methods: {
        // --- Navegación ---
        
        // Función para cambiar de pantalla
        irA(nombrePantalla) {
            this.pantalla = nombrePantalla;
            if (this.pantalla === 'inicio') {
                this.cargarProductos();
            }

            window.scrollTo(0, 0);
        },
        
        // Cambiar idioma
        ponerIdioma(nuevoIdioma) {
            this.idioma_actual = nuevoIdioma;
        },

        // --- Datos y AJAX ---
        
        // Cargar productos con fetch (AJAX)
        cargarProductos(categoria) {
            console.log("Cargando productos...");
            
            let url = 'api/productos.php';
            
            // Si me pasan categoria, la pongo en la URL
            if (categoria) {
                url = url + '?categoria=' + categoria;
            }
            
            fetch(url)
                .then(function(respuesta) {
                    return respuesta.json();
                })
                .then((datos) => { // uso flecha para poder usar 'this'
                    if (datos.success == true) {
                        this.lista_productos = datos.data;
                        
                        // Si he filtrado, voy a la pantalla de productos
                        if (categoria) {
                            this.irA('productos');
                        }
                    } else {
                        console.log("Hubo un error cargando datos");
                    }
                })
                .catch(function(error) {
                    console.error("Error gordo: ", error);
                });
        },

        // Ver detalle de un producto
        verDetalle(producto) {
            this.producto_para_ver = producto;
            this.irA('detalle');
        },

        // --- Carrito ---
        
        // Leer de localStorage
        cargarCarritoDeMemoria() {
            let guardado = localStorage.getItem('mi_carrito');
            if (guardado) {
                this.carrito_compras = JSON.parse(guardado);
            }
        },
        
        // Guardar en localStorage
        guardarCarritoEnMemoria() {
            let texto = JSON.stringify(this.carrito_compras);
            localStorage.setItem('mi_carrito', texto);
        },
        
        // Añadir producto (AHORA CONTROLA STOCK)
        meterEnCarrito(producto) {
            // Primero miro si hay stock (aunque el botón debería estar deshabilitado)
            if (producto.stock <= 0) {
                alert("Lo siento, no queda stock de " + producto.nombre);
                return;
            }

            // Buscar si ya está
            let encontrado = false;
            let cantidad_actual = 0;
            
            for (let i = 0; i < this.carrito_compras.length; i++) {
                if (this.carrito_compras[i].id == producto.id) {
                    cantidad_actual = this.carrito_compras[i].cantidad;
                    encontrado = true;
                    // IMPORTANTE: no dejar añadir más que el stock
                    if (cantidad_actual < producto.stock) {
                        this.carrito_compras[i].cantidad++;
                    } else {
                        alert("No puedes añadir más, solo quedan " + producto.stock);
                        return;
                    }
                }
            }
            
            // Si no estaba, lo añado nuevo
            if (encontrado == false) {
                let nuevo = { ...producto, cantidad: 1 };
                this.carrito_compras.push(nuevo);
            }
            
            this.guardarCarritoEnMemoria();
            alert("Has añadido: " + producto.nombre);
        },
        
        // Quitar producto
        sacarDelCarrito(indice) {
            this.carrito_compras.splice(indice, 1);
            this.guardarCarritoEnMemoria();
        },
        
        // Vaciar todo
        borrarCarrito() {
            this.carrito_compras = [];
            this.guardarCarritoEnMemoria();
        },
        
        // Pagar (AHORA RESTA STOCK)
        pagar() {
            if (this.usuario_conectado == null) {
                alert('Tienes que iniciar sesión primero');
                this.irA('login');
                return;
            }

            // Llamamos al archivo comprar.php para restar stock
            fetch('api/comprar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.carrito_compras)
            })
            .then(res => res.json())
            .then(respuesta => {
                if (respuesta.success == true) {
                    alert('¡Compra realizada con éxito! ' + this.usuario_conectado.nombre);
                    this.borrarCarrito();
                    
                    // IMPORTANTE: Recargo los productos para ver el stock actualizado
                    this.cargarProductos();
                    
                    this.irA('inicio');
                } else {
                    alert("Error en la compra: " + respuesta.message);
                }
            });
        },

        // --- Login y Registro ---
        
        revisarSesion() {
            let usuario = sessionStorage.getItem('usuario_torni');
            if (usuario) {
                this.usuario_conectado = JSON.parse(usuario);
            }
        },
        
        hacerLogin() {
            fetch('api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.form_login)
            })
            .then(res => res.json())
            .then(respuesta => {
                if (respuesta.success == true) {
                    this.usuario_conectado = respuesta.user;
                    // Guardar en session para que no se borre al recargar
                    sessionStorage.setItem('usuario_torni', JSON.stringify(this.usuario_conectado));
                    
                    // Limpio el formulario
                    this.form_login.email = '';
                    this.form_login.password = '';
                    
                    this.irA('inicio');
                } else {
                    alert('Error: ' + respuesta.message);
                }
            });
        },
        
        cerrarSesion() {
            this.usuario_conectado = null;
            sessionStorage.removeItem('usuario_torni');
            this.irA('inicio');
        },
        
        registrarse() {
            // Validaciones sencillas (Expresiones regulares)
            this.errores_registro = {};
            
            // Regex simple para email
            let reglaEmail = /\S+@\S+\.\S+/;
            // Regex solo numeros para telefono
            let reglaTelf = /^[0-9]+$/;
            
            if (this.form_registro.nombre == '') {
                this.errores_registro.nombre = 'Pon tu nombre';
            }
            
            if (!reglaEmail.test(this.form_registro.email)) {
                this.errores_registro.email = 'El email está mal';
            }
            
            if (this.form_registro.password.length < 6) {
                this.errores_registro.password = 'La contraseña es muy corta';
            }
            
            if (this.form_registro.cuenta == '') {
                this.errores_registro.cuenta = 'Falta la cuenta bancaria';
            }
            
            if (!reglaTelf.test(this.form_registro.telefono)) {
                this.errores_registro.telefono = 'El teléfono solo puede tener números';
            }

            // Si hay errores, paro
            if (Object.keys(this.errores_registro).length > 0) {
                return;
            }

            // Si todo bien, envío al servidor
            fetch('api/registro.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.form_registro)
            })
            .then(res => res.json())
            .then(dato => {
                if (dato.success == true) {
                    alert('¡Te has registrado! Ahora entra con tu cuenta.');
                    this.irA('login');
                    // Limpio formulario
                    this.form_registro = { nombre: '', id: '', email: '', password: '', cuenta: '', telefono: '' };
                } else {
                    alert('Error: ' + dato.message);
                }
            });
        },

        // --- Utilidades ---
        precioBonito(numero) {
            // Truco para formatear dinero en euros
            return parseFloat(numero).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
        }
    }
});

// --- Componentes ---


app.component('mi-carrusel', {
    template: `
        <div class="carousel">
          <div class="carousel-track">

            <div class="slide"><img src="img/carrusel/submariner.png" alt="Rolex Submariner"></div>

            <div class="slide"><img src="img/carrusel/omega.png" alt="Omega"></div>
            <div class="slide"><img src="img/carrusel/anillo-diamante.png" alt="Anillo"></div>
            <div class="slide"><img src="img/carrusel/collar-plata.png" alt="Collar"></div>
            <div class="slide"><img src="img/carrusel/pulsera-oro.png" alt="Pulsera"></div>
            <div class="slide"><img src="img/carrusel/submariner.png" alt="Rolex Submariner"></div>

            <div class="slide"><img src="img/carrusel/omega.png" alt="Omega"></div>


          </div>
        </div>
    `,
    mounted() {
        // CÓDIGO JS DEL CARRUSEL QUE NO SE PUEDE TOCAR
        const track = this.$el.querySelector('.carousel-track');
        const slides = this.$el.querySelectorAll('.slide');

        let index = 1;
        const DELAY = 3500;

        function actualizarCarrusel(animar = true) {
          track.style.transition = animar ? 'transform 0.5s ease-in-out' : 'none';
          track.style.transform = `translateX(-${index * 100}%)`;
        }

        actualizarCarrusel(false);

        setInterval(() => {
          index++;
          actualizarCarrusel();

          if (index === slides.length - 1) {
            setTimeout(() => {
              index = 1;
              actualizarCarrusel(false);
            }, 500);
          }

          if (index === 0) {
            setTimeout(() => {
              index = slides.length - 2;
              actualizarCarrusel(false);
            }, 500);
          }
        }, DELAY);
    }
});

// COMPONENTE MENU DESPLEGABLE
app.component('mi-dropdown', {
    props: ['textos', 'idioma'],
    template: `
        <div class="dropdown">
            <!-- Uso prevent para que no recargue la página -->
            <a href="#" @click.prevent>{{ textos[idioma].menu_productos }} <i class="fas fa-chevron-down"></i></a>
            <div class="dropdown-content">
                <a href="#" @click.prevent="$root.cargarProductos(); $root.irA('productos')">{{ textos[idioma].cat_todos }}</a>
                <a href="#" @click.prevent="$root.cargarProductos('reloj')">{{ textos[idioma].cat_relojes }}</a>
                <a href="#" @click.prevent="$root.cargarProductos('anillo')">{{ textos[idioma].cat_anillos }}</a>
                <a href="#" @click.prevent="$root.cargarProductos('collar')">{{ textos[idioma].cat_collares }}</a>
                <a href="#" @click.prevent="$root.cargarProductos('pulsera')">{{ textos[idioma].cat_pulseras }}</a>
                <a href="#" @click.prevent="$root.cargarProductos('pendientes')">{{ textos[idioma].cat_pendientes }}</a>
            </div>
        </div>
    `
});

// Arrancamos Vue
app.mount('#app');
