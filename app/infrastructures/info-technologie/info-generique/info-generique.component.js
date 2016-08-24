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
        /**
            Gère l'affichage "générique", c'est à dire le cas ou il n'y a pas l'affichage de la course au brevet
            Dans le cas où [l'élève n'a pas débloqué la technologie et aucun brevet n'a été déposé], info-sans-brevet est appelé. Sinon c'est info-generique
        **/

        var self = this;
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;
        this.defiTechnologique = DEFI_TECHNOLOGIQUE;
        this.achatLicence = ACHAT_LICENCE;

        // s'il y a des annuites a afficher
        if(this.annuite !== "none") {
            var type;
            if(this.annuite === "in") {
                type = "annuite-percue";
            } else {
                type = "annuite-versee";
            }
            this.coutsLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, type);
        }
        
        // si la technologie n'est pas otebnue par l'élève
        if(this.aObtenir) {
            this.solde = UserFactory.getSolde($localStorage.matricule);
            // définition du cout d'achat de licence (si ce module est appelé alors qu'on a pas le techno, alors il y a un brevet déposé)
            if($localStorage.guilde.nom === this.guilde.nom) {
                this.coutsTentativeLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, "achat-lic-guilde");   
            } else {
                this.coutsTentativeLicence = ContextFactory.getFormattedCouts(this.nom, this.niveau, "achat-lic");
            }
            // définition du cout de découverte
            this.coutsTentativeDecouverte = ContextFactory.getFormattedCouts(this.nom, this.niveau, "decouverte");
            

            this.technologie = ContextFactory.getTechnologie(this.nom, this.niveau).id;
            this.goToExercice = function(type, cout) {
                // Securite d'acces a l'exercice
                $localStorage.exercice = {
                    "autorisation": true,
                    "niveau": this.niveau,
                    "infrastructure": this.nom,
                    "nom": ContextFactory.getInfrastructure(this.nom).nom,
                    "technoId": this.technologie
                }
                // On retire le cout du passage d'exercice
                UserFactory.pay($localStorage.matricule, cout);
                // redirection vers l'exercice
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