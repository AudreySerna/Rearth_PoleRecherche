/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoTechnologie').
component('infoTechnologie', {
    templateUrl: 'infrastructures/info-technologie/info-technologie.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', 'UserFactory', '$localStorage', 
    function infoTechnologieController($http, $routeParams, ContextFactory, UserFactory, $localStorage) {
        var self = this;
        this.modalShown = false; // hiding modal at first
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        // identify profile
        // technologie unlocked ?
        var unlockedReturn = UserFactory.unlocked($localStorage.matricule, this.nom, this.niveau);
        var brevet = ContextFactory.getBrevet(this.nom, this.niveau);
        console.log(brevet);

        if(unlockedReturn === false) {
            this.unlocked = false;

        } else {
            this.unlocked = true;
            if(unlockedReturn === ACHAT_LICENCE) {
                this.brevet = false;
            } else {

            }
        }

        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

    }]
});