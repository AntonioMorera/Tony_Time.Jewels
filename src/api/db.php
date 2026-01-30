<?php
// Archivo para conectar a la base de datos

// Datos del docker
$servidor = getenv('DB_HOST') ?: 'database';
$nombre_bd = getenv('DB_NAME') ?: 'thornitime_db';
$usuario_bd = getenv('DB_USER') ?: 'thornitime_user';
$password_bd = getenv('DB_PASSWORD') ?: 'thornitime_password';

// Cadena de conexion
$dsn = "mysql:host=$servidor;port=3306;dbname=$nombre_bd;charset=utf8mb4";

try {
    // Intentamos conectar
    $conexion = new PDO($dsn, $usuario_bd, $password_bd);
    
    // Configuro para que me avise si hay errores
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Configuro para que me devuelva los datos como un array asociativo
    $conexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Esto es IMPORTANTE para los acentos y la ñ
    $conexion->exec("SET NAMES utf8mb4");
    $conexion->exec("SET CHARACTER SET utf8mb4");

} catch (PDOException $error) {
    // Si falla, mostramos el error
    echo "Error al conectar: " . $error->getMessage();
    exit;
}
?>
