<?php 
include 'meta/db.php';

$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
$select = mysqli_query($link, "SELECT * FROM obj_position");
	while ($result = mysqli_fetch_array($select, MYSQLI_ASSOC)) {
		print '<div id="'.($result['description']).'" class="move_ball" style="position: absolute; left: '.($result['objX']).'; top: '.($result['objY']).'; z-index: 1000;"></div>';
	}
mysqli_close($link);
?>