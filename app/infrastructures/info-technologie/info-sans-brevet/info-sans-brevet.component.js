/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoSansBrevet').
component('infoSansBrevet', {
    templateUrl: 'infrastructures/info-technologie/info-sans-brevet/info-sans-brevet.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', function infoSansBrevetController($http, $routeParams, ContextFactory) {
        var self = this;
        
		this.modalShown = false; // hiding modal at first
        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

        this.decRequired = 3;

        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        this.gains = ContextFactory.getFormattedCouts(this.nom, this.niveau, "gain-tour-guilde");
        this.coutsPose = ContextFactory.getFormattedCouts(this.nom, this.niveau, "pose-guilde");
        this.revenus = ContextFactory.getFormattedCouts(this.nom, this.niveau, "annuite-percue");

        this.avancementsDecouverte = ContextFactory.getAvancementDecouverte(this.nom, this.niveau);


    }]
});