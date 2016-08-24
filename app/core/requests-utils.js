// Fichier utilisé pour définir un certain nombre de constantes et de fonctions utilitaires

// Permet l'initialisation des badges, contient le noms de TOUS les badges de nv 1
var BADGES_NV_1 = ['batisseur_1_decouverte', 'cyberneticien_1_decouverte', 'energeticien_1_decouverte', 'technologue_1_decouverte']; // Ajouter ici les nouveaux badges de niveau 1

var GAME_NAME = "rearth_M6Brevet";
var NOTE_ENERGIE = "energie";
var ELEVE_CONTEXT = "rearthm6";
var DEFI_TECHNOLOGIQUE = "defi-technologique";
var ACHAT_LICENCE = "achat-licence";
var BREVET = "brevet";
// Nombre de decouvertes requises pour debloquer un brevet
var NB_DEC_BREVET = 3;

// TODO Marc En attendant d'avoir un service qui renvoie l'ensemble des guildes, on défini les guildes ici
var GUILDES_ARRAY = ["Technologues", "Batisseurs", "Cyberneticiens", "Energeticiens"];

// Récupère la valeur retournée par le serveur moodle, la réponse suivant toujours le même formalisme on défini une fonction qui se charge de l'extraire
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

