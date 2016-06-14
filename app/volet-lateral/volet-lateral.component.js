/**
 * Created by Estelle on 31/05/2016.
 */
'use strict';

angular.
module('voletLateral').
component('voletLateral', {
    templateUrl: 'volet-lateral/volet-lateral.template.html',
    controller: function VoletLateralController(TAB_NAME) {
        this.disc = TAB_NAME.DISCOVER;
        this.coucou = "hey";
        this.guilde = {couleur: "#cb213d",
                        nom: "Estounettes"}
    }
});