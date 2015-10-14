<?php



function connect() {
    $connection = mysqli_connect('localhost', 'root', '', 'lines');
    if (is_null($connection)) {
        return false;
    }
    mysqli_set_charset($connection, 'utf8');
    return $connection;
}


function insert($sql) {

    $connection = connect();
    if ($connection === FALSE) {
        return FALSE;
    }

    mysqli_query($connection, $sql);

    $insert_id = mysqli_insert_id($connection);
    if ($insert_id === 0) {
        return FALSE;
    }

    mysqli_close($connection);
    return $insert_id;
}


function get_records($sql) {

    $connection = connect();
    if ($connection === FALSE) {
        return FALSE;
    }
    $arr = array();
    $result = mysqli_query($connection, $sql);
    if ($result === FALSE) {
        return FALSE;
    }
    while ($obj = mysqli_fetch_assoc($result)) {
        $arr[] = $obj;
    }

    mysqli_close($connection);
    return $arr;
}





