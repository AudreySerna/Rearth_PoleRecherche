/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoAvecBrevet').
component('infoAvecBrevet', {
    templateUrl: 'infrastructures/info-technologie/info-avec-brevet/info-avec-brevet.template.html',
    controller: ['$http', '$routeParams', function infoAvecBrevetController($http, $routeParams, BACK_URL) {
        var self = this;
        
        this.modalShown = false; // hiding modal at first
        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;
    }]
});