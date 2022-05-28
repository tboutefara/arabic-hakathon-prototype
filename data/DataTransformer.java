import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

import java.util.List;
import java.util.ArrayList;

public class DataTransformer {
	
	public static void main (String[] args) {
		
		try{
			List<String> techContent = Files.readAllLines(Paths.get("techdict_withoutTashqil.csv"));
			List<String> generalContent = Files.readAllLines(Paths.get("masdar_withoutTashqil.csv"), StandardCharsets.UTF_8);
			
			List<TechEntry> techEntries = new ArrayList<>();
			List<GeneralEntry> generalEntries = new ArrayList<>();
			
			System.out.println(techContent.size() + "  " + generalContent.size());
			
			for(int i = 1; i < techContent.size(); i++){
				String[] lineParts = techContent.get(i).split(";");
				techEntries.add(new TechEntry(lineParts[0].trim(), 
					lineParts[1].trim()));
			}
			
			for(int i = 1; i < generalContent.size(); i++){
				String[] lineParts = generalContent.get(i).split("\t");
				if(lineParts.length > 5){
					generalEntries.add(new GeneralEntry(lineParts[1].trim(), 
						lineParts[2].trim(),
						lineParts[3].trim(),
						lineParts[lineParts.length - 1].trim()));
				}
			}
			
			System.out.println(techEntries.size() + "  " + generalEntries.size());
			
			List<GeneralEntry> techInGeneral = new ArrayList<>();
			
			for(int i = 0; i < techEntries.size(); i++){
				String[] parts = techEntries.get(i).getArabicValue().split(" ,");
				for(int k = 0; k < parts.length; k++){
					for(int j = 0; j < generalEntries.size(); j++){
						if(
							generalEntries.get(j).getWord().contains(parts[k]) ||
							generalEntries.get(j).getWithoutShaql().contains(parts[k]) ||
							generalEntries.get(j).getRoot().contains(parts[k]) ||
							techEntries.get(i).getArabicValue().contains(generalEntries.get(j).getWord()) ||
							techEntries.get(i).getArabicValue().contains(generalEntries.get(j).getWithoutShaql()) ||
							techEntries.get(i).getArabicValue().contains(generalEntries.get(j).getRoot())
						){
							if(!techInGeneral.contains(generalEntries.get(j)))
								techInGeneral.add(generalEntries.get(j));
							break;
						}
					}
				}
			}
			
			List<String> lines = new ArrayList<>();
			for(GeneralEntry e : techInGeneral){
				lines.add(e.toString());
			}
			
			Files.write(Paths.get("techInGeneral.csv"), lines);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
}

class GeneralEntry {
	String word;
	String withoutShaql;
	String root;
	String explanation;
	
	public GeneralEntry(){}
	
	public GeneralEntry(String w, String ws, String r, String e){
		this.word = w;
		this.withoutShaql = ws;
		this.root = r;
		this.explanation = e;
	}
	
	public String getWord(){
		return word;
	}
	
	public String getWithoutShaql(){
		return word;
	}
	
	public String getRoot(){
		return word;
	}
	
	public String getExplanation(){
		return word;
	}
	
	public String toString(){
		return word + "\t" + withoutShaql + "\t" + root + "\t" + explanation; 
	}
}

class TechEntry {
	String englishValue;
	String arabicValue;
	
	public TechEntry(){}
	
	public TechEntry(String e, String a){
		this.englishValue = e;
		this.arabicValue = a;
	}
	
	public String getEnglishValue(){
		return englishValue;
	}
	
	public String getArabicValue(){
		return arabicValue;
	}
}
