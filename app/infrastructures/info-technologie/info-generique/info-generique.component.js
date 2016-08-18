/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoGenerique').
component('infoGenerique', {
    templateUrl: 'infrastructures/info-technologie/info-generique/info-generique.template.html',
    controller: ['$http', '$routeParams', '$localStorage', 'ContextFactory', 'UserFactory','$location', function infoGeneriqueController($http, $routeParams, $localStorage, ContextFactory, UserFactory, $location) {
        var self = this;
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;
        this.defiTechnologique = DEFI_TECHNOLOGIQUE;
        this.achatLicence = ACHAT_LICENCE;

        if(this.annuite !== "none") {
            var type;
            if(this.annuite === "in") {
                type = "annuite-percue";
            } else {
                type = "annuite-versee";
            }
            this.coutsLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, type);
        }
        
        if(this.aObtenir) {
            this.solde = UserFactory.getSolde($localStorage.matricule);
            if($localStorage.guilde.nom === this.guilde.nom) {
                this.coutsTentativeLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, "achat-lic-guilde");   
            } else {
                this.coutsTentativeLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, "achat-lic");
            }
            this.coutsTentativeDecouverte = ContextFactory.getFormattedCouts(this.nom, this.niveau, "decouverte");
            
            this.technologie = ContextFactory.getTechnologie(this.nom, this.niveau).id;
            this.goToExercice = function(type, cout) {
                $localStorage.exercice = {
                    "autorisation": true,
                    "niveau": this.niveau,
                    "infrastructure": this.nom,
                    "nom": ContextFactory.getInfrastructure(this.nom).nom,
                    "technoId": this.technologie
                }
                //TODO UserFactory.pay($localStorage.matricule, cout);
                $location.path('/exercice/'+ type + '/' + this.technologie);
            }

        }
        
        // modal handling
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