<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

// Conexión
require_once 'db.php';

// Cojo los datos que me envía el formulario (JSON)
$json = file_get_contents("php://input");
$datos = json_decode($json, true);

$email = $datos['email'];
$password = $datos['password'];

// Comprobamos que no estén vacíos
if ($email == "" || $password == "") {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

try {
    // Busco el usuario por email
    $sql = "SELECT * FROM clientes WHERE email = '$email'";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    
    $usuario_encontrado = $stmt->fetch();

    // Si existe el usuario y la contraseña coincide
    if ($usuario_encontrado && password_verify($password, $usuario_encontrado['password'])) {
        
        // Quito la contraseña para no enviarla al frontend por seguridad
        unset($usuario_encontrado['password']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Has entrado correctamente',
            'user' => $usuario_encontrado
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email o contraseña mal puestos'], JSON_UNESCAPED_UNICODE);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error en el servidor']);
}
?>
