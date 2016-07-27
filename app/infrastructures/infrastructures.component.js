'use strict';

angular.
module('infrastructures').
component('infrastructures', {
    templateUrl: 'infrastructures/infrastructures.template.html',
    controller: ['$http', '$routeParams', '$localStorage', 'ContextFactory', 
    function infrastructuresController($http, $routeParams, $localStorage, ContextFactory) {
        var self = this;
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;
        
        

        if(!$localStorage.utilisateur) {
        	console.log("erreur !!!!!!!");
        }
    }]
});