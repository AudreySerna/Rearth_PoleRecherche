/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('voletLateral').
component('voletLateral', {
    templateUrl: 'volet-lateral/volet-lateral.template.html',
    controller: ['$http', 'Guilde', function VoletLateralController($http, Guilde, BACK_URL) {
        /*this.guildes = [{
                                couleur: "#cb213d",
                                nom: "Estounettes"},
            {
                couleur: "#cb213d",
                nom: "Lisettes"
            }];*/
        this.guildes = Guilde.query();
    }]
});