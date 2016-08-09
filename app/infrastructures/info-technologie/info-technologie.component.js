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
        var coutsPose;
        var gains;
        var unlockedReturn = ContextFactory.unlocked($localStorage.matricule, this.nom, this.niveau);
        var guildeBrevet = ContextFactory.getGuildeBrevet(this.nom, this.niveau);
        this.guilde = guildeBrevet;

        if(unlockedReturn === false) {
            // techno pas debloquee
            this.unlocked = false;
            if(guildeBrevet !== false) {
                // mais un brevet a deja ete depose...
                this.templateTechno = 'generique';
                this.annuite = 'out';
                this.aObtenir = true;
            } else {
                // aucun brevet déposé
                this.templateTechno = 'sansBrevet';
            }
        } else {
            // techno debloquee
            this.unlocked = true;
            if(guildeBrevet !== false) {
                // Un brevet a été déposé
                if(unlockedReturn === ACHAT_LICENCE) {
                    // en ayant achete une licence
                    this.templateTechno = 'generique';
                    this.annuite = 'out';
                    this.aObtenir = false;
                } else if (ContextFactory.hasBrevet($localStorage.matricule, this.nom, this.niveau) === "true") {
                    // en étant titulaire du brevet
                    this.templateTechno = 'generique';
                    this.annuite = 'in';
                    this.aObtenir = false;
                } else {
                    this.templateTechno = 'generique';
                    this.annuite = 'none';
                    this.aObtenir = false;
                }
            } else {
                // Aucun brevet n'a ete depose
                this.templateTechno = 'none';
            }
        }

        // si aucune guilde n'a déposé de brevet ou que ce n'est pas ma guilde qui possede le brevet
        if(guildeBrevet === false || $localStorage.guilde.nom !== guildeBrevet.nom) {
                // pas de tarifs préférentiels
                this.gains = ContextFactory.getFormattedCouts(this.nom, this.niveau, "gain-tour");
                this.coutsPose = ContextFactory.getFormattedCouts(this.nom, this.niveau, "pose");
            } else {
                // tarifs préférentiels
                this.gains = ContextFactory.getFormattedCouts(this.nom, this.niveau, "gain-tour-guilde");
                this.coutsPose = ContextFactory.getFormattedCouts(this.nom, this.niveau, "pose-guilde");
        }
        

        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

    }]
});