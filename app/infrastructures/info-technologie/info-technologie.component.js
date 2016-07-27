/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoTechnologie').
component('infoTechnologie', {
    templateUrl: 'infrastructures/info-technologie/info-technologie.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', function infoTechnologieController($http, $routeParams, ContextFactory) {
        var self = this;
        this.modalShown = false; // hiding modal at first
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        this.technologie = ContextFactory.getTechnologie(this.nom, this.niveau);

        // identify profile
        // technologie possedee ?
        
        if() {
            // possedee
            this.possession = true;
            if() {
                // avec brevet
                this.brevet = true;
            } else {
                // sans brevet
                this.brevet = false;
            }
        } else {
            // non possedee
            this.possession = false;
            if() {
                // brevet deja depose
                this.brevet = true;
            } else {
                // brevet non depose
                this.brevet = false;
            }
        }

        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

    }]
});