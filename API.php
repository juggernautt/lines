<?php

require_once('BL.php');


if($_POST['action'] == "addScore") {
    add_new_score($_POST['name'], $_POST['scores']);
    $result = get_all_scores();
    print json_encode($result);
    return;
}