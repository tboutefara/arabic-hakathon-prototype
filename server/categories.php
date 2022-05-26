<?php

$categories = array("علوم الحاسب", "علوم الطبيعة", "حياة يومية", "تاريخ", "جغرافيا", "ثقافة", "العمل", "أسفار وسياحة", "رياضة");
$json_categories = json_encore($categories);
echo $json_categories;

?>
