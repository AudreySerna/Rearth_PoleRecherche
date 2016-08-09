/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoGenerique').
component('infoGenerique', {
    templateUrl: 'infrastructures/info-technologie/info-generique/info-generique.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', function infoGeneriqueController($http, $routeParams, ContextFactory) {
        var self = this;
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        if(this.annuite !== "none") {
            var type;
            if(this.annuite === "in") {
                type = "annuite-percue";
            } else {
                type = "annuite-versee";
            }
            this.coutsLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, type);
        }
        
        
        this.modalShown = false; // hiding modal at first
        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }
    }],
    bindings: {
        // Guilde titulaire du brevet
        guilde: "<",
        // Annuite : in (=percue), out (=versee), none (=affichage de la guilde seulement)
        annuite: "<",
        // true/false pour afficher le bouton "Obtenir"
        aObtenir: "<"
    }
});