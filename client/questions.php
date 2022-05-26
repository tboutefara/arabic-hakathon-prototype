<?php

class Question {
	public function __construct($question, $choices, $answer) {
        $this->question = $question;
        $this->choices = $choices;
        $this->answer = $answer;
    }
}

$questions = array(
	new Question("السؤال الأول", array("الخيار الأول", "الخيار الثاني","الخيار الثالث"), 1),
	new Question("السؤال الثاني", array("الخيار الأول","الخيار الثاني","الخيار الثالث"), 0),
	new Question("السؤال الثالث", array("الخيار الأول","الخيار الثاني","الخيار الثالث"), 2)
);

$json_questions = json_encode($questions);
echo $json_questions;

?>
