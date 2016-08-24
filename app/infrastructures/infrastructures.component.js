'use strict';

angular.
module('infrastructures').
component('infrastructures', {
    templateUrl: 'infrastructures/infrastructures.template.html',
    controller: ['$http', '$routeParams', '$localStorage', 'ContextFactory', 
    function infrastructuresController($http, $routeParams, $localStorage, ContextFactory) {
        /**
            Point d'entrée de l'url /technologie/....
            Appelle en son template les différents modules composant la page
        **/
        var self = this;

        if(typeof $localStorage.matricule == 'undefined') {
            // Si non connecté -> impossible d'accéder à cette page
            $location.path('/connect');
        } else {
            // Retrieve data called with component
            this.nom = $routeParams.nom;
            this.niveau = $routeParams.niveau;
            
            // Réinitialisation des autorisations d'accès aux exercices
            $localStorage.exercice = {
                "autorisation": false
            }

        }
        
    }]
});