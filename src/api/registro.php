<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

require_once 'db.php';

$json = file_get_contents("php://input");
$datos = json_decode($json, true);

// Asigno variables para que sea mas facil leer
$nombre = $datos['nombre'];
$email = $datos['email'];
$pass = $datos['password'];
$cuenta = $datos['cuenta'];
$telef = $datos['telefono'];

// Validacion basica en PHP
if ($nombre == "" || $email == "" || $pass == "" || $cuenta == "" || $telef == "") {
    echo json_encode(['success' => false, 'message' => 'Tienes que rellenar todo']);
    exit;
}

try {
    // Miro si ya existe el email
    $check = $conexion->prepare("SELECT id FROM clientes WHERE email = '$email'");
    $check->execute();
    
    if ($check->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Ese email ya está registrado']);
        exit;
    }

    // Encripto la contraseña
    $pass_segura = password_hash($pass, PASSWORD_DEFAULT);

    // Inserto en la base de datos
    $sql = "INSERT INTO clientes (nombre, email, password, cuenta_bancaria, telefono) VALUES ('$nombre', '$email', '$pass_segura', '$cuenta', '$telef')";
    
    $conexion->exec($sql);
    
    echo json_encode(['success' => true, 'message' => 'Te has registrado bien'], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $e->getMessage()]);
}
?>
