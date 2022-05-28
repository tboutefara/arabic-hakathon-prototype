<?php

$related = array("تشغيل", "أمر", "لغة");
$unrelated = array("حساب", "ارسال", "مثال");

$words = ["related" => $related, "unrelated" => $unrelated];

$json_words = json_encode($words);
echo $json_words;

?>
