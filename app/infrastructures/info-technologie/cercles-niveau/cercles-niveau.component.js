/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('cerclesNiveau').
component('cerclesNiveau', {
    templateUrl: 'infrastructures/info-technologie/cercles-niveau/cercles-niveau.template.html',
    controller: ['$http', '$sce', '$routeParams', 'ContextFactory', 'UserFactory', '$localStorage', 
    function infoTechnologieController($http, $sce, $routeParams, ContextFactory, UserFactory, $localStorage) {
        var self = this;
        
        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;
        this.levelUrl = [];
        this.levelUrlTrusted = [];

        console.log("----- Niveaux -----");
        this.niveaux = ContextFactory.getNiveaux(this.nom);
        for (i = 0; i < this.niveaux.length; i++) {
            this.niveaux[i].unlocked = UserFactory.unlocked($localStorage.matricule, this.nom, this.niveaux[i].niveau);
        }
        console.log(this.niveaux);
        console.log("-------------------");


        // Centre du premier cercle, utilise pour les calculs de positions de toutes les autres formes
        this.x = 46;
        this.y = 46;

        // Formatter les url afin que angular les accepte
        var i;
        var tmpUrl;
        for (i = 0; i < this.niveaux.length; i++) {
            this.levelUrl[i] = $sce.trustAsUrl('http://localhost:8000/#!/technologie/'+ this.nom +'/' + (i+1));
            this.levelUrlTrusted[i] = $sce.getTrustedUrl(this.levelUrl[i]);
        }
    }]
});