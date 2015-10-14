<?php
require_once('DAL.php');

function  add_new_score($name, $score) {
    $name = addslashes($name);
    $score = addslashes($score);
    $sql = "insert into scores(name, score) values ('$name', '$score')";
    insert($sql);
}


function get_all_scores() {
    $sql = "select * from scores order by score desc";
    $scores = get_records($sql);
    return $scores;
}