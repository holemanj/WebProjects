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
		abilityValue = ability[i].getElementsByTagName("value")[0].childNodes[0].nodeValue;
		
		output+="<section class=\"attribute\">";
			
		output+="<label class=\"attributeName\" for=\"" + attributeID + "\">" +
		ability[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
		"</label>";

		output+="<input class=\"attributeValue\" value=\"" +  abilityValue + "\"" + 
		" id=\""+attributeID+"\""  +
		" onchange=\"updateDnDBonus(" +attributeID+","+bonusID+ ")\""+
		" required=\"required\"/>";
		
		output+="<div class=\"attributeBonus\" id=\"" + bonusID + "\">" + 
		dndAttributeBonus(abilityValue) +
		"</div>";

		output+="</section>";
	}
	document.getElementById("attributes").innerHTML = output;

}

function dndAttributeBonus(abilityScore) {
	abilityValue=parseInt(abilityScore);
	return ((abilityValue>=12)?"+":"") + (Math.floor(parseInt(abilityValue)/2)-5).toString();
}

function updateDnDBonus(attrValID,attBonusID) {
	//document.getElementById("infoblock").innerHTML=node.innerHTML;
	abilityValue=parseInt(attrValID.value);
	newBonus = dndAttributeBonus(abilityValue);
	attBonusID.innerHTML=newBonus;
}
