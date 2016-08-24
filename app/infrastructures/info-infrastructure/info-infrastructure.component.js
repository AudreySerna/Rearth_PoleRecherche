/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoInfrastructure').
component('infoInfrastructure', {
    templateUrl: 'infrastructures/info-infrastructure/info-infrastructure.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', function infoInfrastructureController($http, $routeParams, ContextFactory) {
        /**
            Gère l'affichage latéral des infos de l'infrastructure en cours
        **/

        var self = this;


        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        this.infrastructure = ContextFactory.getInfrastructure(this.nom);
        // Navigation arrows
        this.suivant = ContextFactory.getNextInfrastructure(this.infrastructure);
        this.precedent = ContextFactory.getPreviousInfrastructure(this.infrastructure);
    }]
});