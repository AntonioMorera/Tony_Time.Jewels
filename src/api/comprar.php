<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

require_once 'db.php';

$json = file_get_contents("php://input");
$carrito = json_decode($json, true);

// Si no hay carrito, error
if (!$carrito) {
    echo json_encode(['success' => false, 'message' => 'El carrito está vacío']);
    exit;
}

try {
    // Voy a recorrer cada producto del carrito y restarlo de la base de datos
    foreach ($carrito as $item) {
        $id_producto = $item['id'];
        $cantidad_comprada = $item['cantidad'];
        
        // Compruebo primero si hay stock suficiente (por seguridad)
        $consulta_stock = $conexion->prepare("SELECT stock FROM productos WHERE id = $id_producto");
        $consulta_stock->execute();
        $producto_db = $consulta_stock->fetch();
        
        if ($producto_db['stock'] < $cantidad_comprada) {
            // Si alguien se adelantó y compró, devolvemos error
            echo json_encode(['success' => false, 'message' => 'Ups! No hay suficiente stock de: ' . $item['nombre']]);
            exit;
        }

        // Restamos el stock
        $sql_update = "UPDATE productos SET stock = stock - $cantidad_comprada WHERE id = $id_producto";
        $conexion->exec($sql_update);
    }
    
    echo json_encode(['success' => true, 'message' => 'Compra realizada correctamente']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al comprar: ' . $e->getMessage()]);
}
?>
