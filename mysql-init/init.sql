-- mysql-init/init.sql - VERSIÓN CON STOCK
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS thornitime_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE thornitime_db;

DROP TABLE IF EXISTS productos;

-- He cambiado disponibilidad por stock (numero entero)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(500),
    categoria VARCHAR(50) NOT NULL,
    descripcion TEXT,
    stock INT DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    cuenta_bancaria VARCHAR(50),
    telefono VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO productos (nombre, precio, imagen, categoria, descripcion, stock) VALUES
-- RELOJES
('Reloj Rolex Submariner'        , 18900.00 ,'img/productos/relojes/submariner.png'                   , 'reloj'        , 'El clásico reloj de buceo, referencia absoluta en su categoría.', 5),
('Reloj Casio G-Shock'           , 320.00   ,'img/productos/relojes/gshock.png'                       , 'reloj'        , 'Resistencia absoluta, ideal para deportes extremos.'            , 20),
('Reloj Omega Seamaster'         , 5400.00  ,'img/productos/relojes/omega.png'                        , 'reloj'        , 'Elegancia y precisión en las profundidades.'                    , 3),
('Reloj Seiko 5'                 , 180.00   ,'img/productos/relojes/seiko5.png'                       , 'reloj'        , 'Automático, fiable y con un diseño atemporal.'                  , 15),
('Reloj Tissot PRX'              , 650.00   ,'img/productos/relojes/tissot.png'                       , 'reloj'        , 'Diseño de los 70 con tecnología moderna.'                       , 8),
('Reloj Apple Watch Series 9'    , 449.00   ,'img/productos/relojes/apple.png'                        , 'reloj'        , 'El reloj inteligente más avanzado del mercado.'                 , 50),
('Reloj Samsung Galaxy Watch 6'  , 399.00   ,'img/productos/relojes/samsung.png'                      , 'reloj'        , 'Tu compañero de salud y bienestar diario.'                      , 40),
('Reloj Fossil Grant Chronograph', 229.00   ,'img/productos/relojes/fossil.png'                       , 'reloj'        , 'Estilo clásico con funciones de cronógrafo.'                    , 12),

-- PENDIENTES
('Pendientes de Oro 18k'         , 149.99   ,'img/productos/pendientes/oro.png'                       , 'pendientes'   , 'Elegantes pendientes de oro puro de 18 kilates.'                , 10),
('Pendientes de Plata'           , 49.99    ,'img/productos/pendientes/plata.png'                     , 'pendientes'   , 'Diseño sencillo y brillante en plata de ley.'                   , 25),
('Pendientes Perla Blanca'       , 89.99    ,'img/productos/pendientes/perla.png'                     , 'pendientes'   , 'Perlas cultivadas de alta calidad.'                             , 5),
('Pendientes Aro Grandes'        , 39.99    ,'img/productos/pendientes/aros.png'                      , 'pendientes'   , 'Aros llamativos para un look moderno.'                          , 30),
('Pendientes Diamante Sintético' , 199.99   ,'img/productos/pendientes/diamante.png'                  , 'pendientes'   , 'Brillo espectacular a un precio accesible.'                     , 0), -- Este no tiene stock de prueba

-- ANILLOS
('Anillo de Compromiso Diamante' , 1299.99  ,'img/productos/anillos/diamante.png'                     , 'anillo'       , 'La promesa de un amor eterno.'                                  , 2),
('Anillo de Plata Minimalista'   , 59.99    ,'img/productos/anillos/plata.png'                        , 'anillo'       , 'Sencillez y elegancia en tu mano.'                              , 15),
('Anillo de Oro Blanco'          , 499.99   ,'img/productos/anillos/oro-blanco.png'                   , 'anillo'       , 'Sofisticación en oro blanco de 14k.'                            , 4),
('Anillo Ajustable Acero'        , 29.99    ,'img/productos/anillos/acero.png'                        , 'anillo'       , 'Versátil y resistente, se adapta a cualquier dedo.'             , 50),
('Anillo con Piedra Esmeralda'   , 349.99   ,'img/productos/anillos/esmeralda.png'                    , 'anillo'       , 'El verde intenso de la esmeralda destaca en este diseño.'       , 1),

-- COLLARES
('Collar de Plata'               , 79.99    , 'img/productos/collares/plata.png'                      , 'collar'       , 'Cadena fina de plata de ley 925.'                               , 20),
('Collar Corazón Oro Rosa'       , 159.99   , 'img/productos/collares/corazon.png'                    , 'collar'       , 'Romántico colgante en oro rosa.'                                , 8),
('Collar con Colgante Luna'      , 49.99    , 'img/productos/collares/luna.png'                       , 'collar'       , 'Diseño celestial para soñadores.'                               , 12),
('Collar de Perlas'              , 199.99   , 'img/productos/collares/perlas.png'                     , 'collar'       , 'Clásico collar de perlas, nunca pasa de moda.'                  , 6),
('Collar Minimalista Acero'      , 34.99    , 'img/productos/collares/acero.png'                      , 'collar'       , 'Moderno y duradero, ideal para el día a día.'                   , 30),

-- PULSERAS
('Pulsera de Plata'              , 69.99    , 'img/productos/pulseras/plata.png'                       , 'pulsera'      , 'Brillo sutil para tu muñeca.'                                   , 18),
('Pulsera de Cuero Negra'        , 39.99    , 'img/productos/pulseras/cuero.png'                       , 'pulsera'      , 'Estilo casual y robusto.'                                       , 40),
('Pulsera Pandora'               , 89.99    , 'img/productos/pulseras/pandora.png'                     , 'pulsera'      , 'Personalízala con tus charms favoritos.'                        , 10),
('Pulsera de Oro Fino'           , 299.99   , 'img/productos/pulseras/oro.png'                         , 'pulsera'      , 'Lujo discreto en oro de 14k.'                                   , 3),
('Pulsera Ajustable Acero'       , 24.99    , 'img/productos/pulseras/acero.png'                       , 'pulsera'      , 'Se ajusta perfectamente a cualquier tamaño.'                    , 25 );