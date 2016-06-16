/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('voletLateral').
component('voletLateral', {
    templateUrl: 'volet-lateral/volet-lateral.template.html',
    controller: ['$http', function VoletLateralController($http, BACK_URL) {
        /*this.guildes = [{
                                couleur: "#cb213d",
                                nom: "Estounettes"},
            {
                couleur: "#cb213d",
                nom: "Lisettes"
            }];*/
        var self = this;
        console.log(BACK_URL);
        $http.get( BACK_URL + 'guildes/').then(function(response) {
            self.guildes = response.data;
        });
    }]
});