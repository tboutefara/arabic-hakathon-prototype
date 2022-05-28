function cleanExplanation(explanation){
	if(explanation.indexOf("1") != -1){
		explanation = explanation.substring(explanation.indexOf("1") + 2);
		if(explanation.indexOf(".") != -1){
			explanation = explanation.substring(0, explanation.indexOf("."));
		}
	}
	
	return explanation; 
}
