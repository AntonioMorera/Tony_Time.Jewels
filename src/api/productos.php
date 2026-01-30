<?php
// Esto es para que se puedan leer los acentos y caracteres especiales
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

// Incluyo el archivo de conexión
require_once 'db.php';

// Miro si me han pasado una categoria por la URL (GET)
$categoria_filtro = "";
if (isset($_GET['categoria'])) {
    $categoria_filtro = $_GET['categoria'];
}

try {
    // Preparo la consulta SQL
    // AHORA SELECCIONAMOS 'stock' EN LUGAR DE 'disponibilidad'
    $consulta = "SELECT * FROM productos";
    
    // Si hay categoria, añado el WHERE
    if ($categoria_filtro != "") {
        $consulta = $consulta . " WHERE categoria = '$categoria_filtro'";
    }
    
    // Preparo la sentencia
    $sentencia = $conexion->prepare($consulta);
    
    // Ejecuto la consulta
    $sentencia->execute();
    
    // Guardo todos los resultados en una variable
    $lista_productos = $sentencia->fetchAll();
    
    // Devuelvo los datos en formato JSON para que los lea Vue
    echo json_encode([
        'success' => true,
        'data' => $lista_productos
    ], JSON_UNESCAPED_UNICODE); 
    
} catch (Exception $e) {
    // Si hay error devuelvo false
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>