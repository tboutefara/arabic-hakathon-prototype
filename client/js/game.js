class Game {
	
	constructor(name){
		this.score = 0;
		this.playerName = name;
		this.scene = 0;
	}
	
	drawStartScene(){
		background(255);
		
		// Creating title
		textSize(72);
		textAlign(CENTER);
		text("التحضير للسباق", 400, 100);
		
		textSize(48);
		textAlign(CENTER);
		text("إختر الميدان الذي تريد تعلمه", 400, 175);
		
		// Creating buttons
		let computerScience = createButton("علوم الحاسب");
		computerScience.position(30, 300);
		computerScience.size(226, 90);
		computerScience.parent('main');
		computerScience.mouseClicked(function(){
			alert("Success");
		});
		
		let natureScience = createButton("علوم الطبيعة");
		natureScience.position(286, 300);
		natureScience.size(226, 90);
		natureScience.parent('main');
		natureScience.mouseClicked(function(){
			alert("Success");
		});
		
		let dailyLife = createButton("حياة يومية");
		dailyLife.position(542, 300);
		dailyLife.size(226, 90);
		dailyLife.parent('main');
		dailyLife.mouseClicked(function(){
			alert("Success");
		});
		
		let historyCategory = createButton("تاريخ");
		historyCategory.position(30, 400);
		historyCategory.size(226, 90);
		historyCategory.parent('main');
		historyCategory.mouseClicked(function(){
			alert("Success");
		});
		
		let geography = createButton("جغرافيا");
		geography.position(286, 400);
		geography.size(226, 90);
		geography.parent('main');
		geography.mouseClicked(function(){
			alert("Success");
		});
		
		let culture = createButton("ثقافة");
		culture.position(542, 400);
		culture.size(226, 90);
		culture.parent('main');
		culture.mouseClicked(function(){
			alert("Success");
		});
		
		let work = createButton("العمل");
		work.position(30, 500);
		work.size(226, 90);
		work.parent('main');
		work.mouseClicked(function(){
			alert("Success");
		});
		
		let travelAndTurism = createButton("أسفار وسياحة");
		travelAndTurism.position(286, 500);
		travelAndTurism.size(226, 90);
		travelAndTurism.parent('main');
		travelAndTurism.mouseClicked(function(){
			alert("Success");
		});
		
		let sport = createButton("رياضة");
		sport.position(542, 500);
		sport.size(226, 90);
		sport.parent('main');
		sport.mouseClicked(function(){
			alert("Success");
		});
		
	}
	
	drawFirstScene(){
	}
	
}