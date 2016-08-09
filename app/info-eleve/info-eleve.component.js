/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoEleve').
component('infoEleve', {
    templateUrl: 'info-eleve/info-eleve.template.html',
    controller: ['$rootScope', '$localStorage', 'UserFactory', function infoEleveController($rootScope, $localStorage, UserFactory) {
        var self = this;
        this.solde = Math.round(UserFactory.getSolde($localStorage.matricule));
        this.utilisateur = $localStorage.utilisateur;
        this.guilde = $localStorage.guilde;

        // Reactualisation des donnees forcee
        $rootScope.$on('refreshInfos', function () {
		    self.utilisateur = $localStorage.utilisateur;
		    self.solde = Math.round(UserFactory.getSolde($localStorage.matricule));
            self.guilde = $localStorage.guilde;
		});
    }]
});