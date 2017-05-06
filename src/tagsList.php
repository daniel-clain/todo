<?php

$json = file_get_contents('php://input');
echo $json;
file_put_contents('assets/tagsList.json', $json);
   
?>