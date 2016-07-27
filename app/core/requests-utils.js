var GAME_NAME = "rearth_M6Brevet";
var NOTE_ENERGIE = "energie";
var ELEVE_CONTEXT = "rearthm6";

var extractSingleValue = function(xmlResponse) {
    var x2js = new X2JS();
	var jsonResp = x2js.xml_str2json(xmlResponse.raw_data);
    return jsonResp.methodResponse.params.param.value.string;
}

/**
	Join two JSON array. tab1.length > tab2.length
**/
var unionJson = function(tab1, tab2) {
	for (var key in tab2) {
	  if (tab2.hasOwnProperty(key)) {
	    tab1[key] = tab2[key];
	  }
	}
	return tab1;
}

