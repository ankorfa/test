<?php 
include 'meta/db.php';
$data = $_GET;

if(isset($data['id_div']) && isset($data['osX']) && isset($data['osY']) && isset($data['time']) ){

	$id_obj = $data['id_div'];
	$os_x = $data['osX'];
	$os_y = $data['osY'];
	$date_log = date("Y-m-d H:i:s");
	$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
		if (mysqli_connect_errno()) {
		  printf("Не удалось подключиться: %s\n", mysqli_connect_error());
		  exit();
		}
	$insertSite_sql_log = mysqli_query($link, "INSERT INTO move_log (id_obj, os_x, os_y, date_log) VALUES('$id_obj','$os_x','$os_y','$date_log')");
	$insertSite_sql_position = mysqli_query($link, "UPDATE obj_position SET objX='$os_x', objY='$os_y' WHERE description='$id_obj'");

	mysqli_close($link);
}



?>