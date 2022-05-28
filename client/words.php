<?php

// RESTfulm service doesn't work, we do not have an API key yet
/*
$category = $_GET["c"];
$url = "https://ontology.birzeit.edu/sina/api/OntologyConceptSubtypes/293572?apikey=sampleKey";

$json = file_get_contents($url);
$jo = json_decode($json);

echo $jo;
* /

// Simple example : static data
/*
$words = array("تشغيل", "أمر", "لغة", "طور", "موقع", "تصفح", "برنامج", "مكتب", "معالجة");
$json_words = json_encode($words);
echo $json_words;
*/

class Word {
	public function __construct($word, $explanation) {
        $this->word = $word;
        $this->explanation = $explanation;
    }
}

$words = array();
$index = 0;

$file = fopen("dict.csv", "r");

if($file !== FALSE) {
	while(! feof($file)) {
		$data = fgetcsv($file, 1000, "\t");
		$rand = rand(1, 100);
		if($rand < 5){
			$words[$index] = new Word($data[0], $data[3]);
			$index++;
		}
	}
}

fclose($file);

$json_words = json_encode($words);
echo $json_words;

?>
