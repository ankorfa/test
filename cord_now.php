<?php
include 'meta/db.php';
$data = $_GET;
if (isset($data)) {
    $link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
    if (mysqli_connect_errno()) {
        printf("Не удалось подключиться: %s\n", mysqli_connect_error());
        exit();
    }
    $browser = $data['id_div'];
    $out = array();
    $select = mysqli_query($link, "SELECT description, objX, objY FROM obj_position WHERE description <> '$browser'");
    while ($result = mysqli_fetch_assoc($select)) {
        $out[] = $result;
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($out);
    mysqli_close($link);
}

?>