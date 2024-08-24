class abilityScore {
	constructor(name,value,index) {
		this.name=name;
		this.value=value;
		this.index=index;
	}
	
	outputValue() {
		return ((this.value>=12)?"+":"") + (Math.floor(parseInt(this.value)/2)-5).toString();
	}
	
	id() {
		return "attr"+(this.index+1);
	}

	bonusID() {
		return "attrBonus"+(this.index+1);
	}
}
const abilities=[];

function getAttributes() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			htmlAttributes(this);
		}
	};
	xmlhttp.open("GET", "DnD.xml", true);
	xmlhttp.send();
}

function htmlAttributes(xmlDnD) {
	xmlDoc = xmlDnD.responseXML;
	
	output="";

	ability = xmlDoc.getElementsByTagName("InherentQuality");
	num_abilities=ability.length;
	
	for (i = 0; i <num_abilities; i++) {
		attributeID  = "attr"+(i+1);
		bonusID  = "attrBonus"+(i+1);
		
		abilities.push(new abilityScore(ability[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
										ability[i].getElementsByTagName("value")[0].childNodes[0].nodeValue,
										i));
										
		abilityValue = abilities[i].name;
		
		output+="<section class=\"attribute\">";
			
		output+="<label class=\"attributeName\" for=\"" + abilities[i].id() + "\">" +
		abilities[i].name +
		"</label>";

		output+="<input class=\"attributeValue\" value=\"" +  abilities[i].value + "\"" + 
		" id=\""+abilities[i].id()+"\""  +
		" onchange=\"updateDnDBonus(" +i+ ")\""+
		" required=\"required\"/>";
		
		output+="<div class=\"attributeBonus\" id=\"" + abilities[i].bonusID() + "\">" + 
		abilities[i].outputValue() +
		"</div>";

		output+="</section>";
	}
	document.getElementById("attributes").innerHTML = output;
	InfoBlockJSON(abilities);
}

function InfoBlockJSON(data) {
	document.getElementById("infoblock").innerHTML = JSON.stringify(data);
}

function updateDnDBonus(index) {
	//document.getElementById("infoblock").innerHTML=node.innerHTML;
	abilities[index].value=parseInt(document.getElementById(abilities[index].id()).value);
	document.getElementById(abilities[index].bonusID()).innerHTML=abilities[index].outputValue();
	InfoBlockJSON(abilities);
}
