'use strict';

angular.
module('infrastructures').
component('infrastructures', {
    templateUrl: 'infrastructures/infrastructures.template.html',
    controller: ['$http', '$routeParams', '$localStorage', 'ContextFactory', 
    function infrastructuresController($http, $routeParams, $localStorage, ContextFactory) {
        var self = this;

        if(typeof $localStorage.matricule == 'undefined') {
            $location.path('/connect');
        } else {
            // Retrieve data called with component
            this.nom = $routeParams.nom;
            this.niveau = $routeParams.niveau;
            
            $localStorage.exercice = {
                "autorisation": false
            }

        }
        
    }]
});