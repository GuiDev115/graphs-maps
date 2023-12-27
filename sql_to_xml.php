<?php

function parseToXML($htmlStr){ //função para analisar as tags html
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
}

$servername = "localhost"; //nome do server
$servusername = "root"; //nome do user
$servpassword = ""; //password
$dbname = "project_iwp";

// Abre uma ligação a um servidor MySQL
$connection= mysqli_connect($servername, $servusername, $servpassword, $dbname);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Selecionar todas as linhas da tabela de marcadores
$query = "SELECT * FROM markers WHERE 1";
$result = mysqli_query($connection, $query);
if (!$result) {
  die('Invalid query: ' . mysqli_error($connection));
}

header("Content-type: text/xml");

// Iniciar o ficheiro XML, passo o nó principal
echo "<?xml version='1.0' ?>";
echo '<markers>';
$ind=0;
// Iterar pelas linhas, imprimindo os nós XML para cada
while ($row = @mysqli_fetch_assoc($result)){ 

  echo '<marker ';
  echo 'id="' . $row['id'] . '" ';
  echo 'lat="' . $row['lat'] . '" ';
  echo 'lng="' . $row['lng'] . '" ';
  echo '/>';
  $ind = $ind + 1;
}

// Fim do XML
echo '</markers>';

?>
