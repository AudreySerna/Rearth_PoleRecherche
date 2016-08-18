'use strict';

angular.
module('exercice').
component('exercice', {
    templateUrl: 'exercice/exercice.template.html',
    controller: ['$http', '$routeParams', 'ContextFactory', '$localStorage', '$location', function exerciceController($http, $routeParams, ContextFactory, $localStorage, $location) {
        var self = this;

        // si on accede à l'url d'exercice sans etre connecte
        if(typeof $localStorage.matricule == 'undefined') {
            $location.path('/connect');
        } else {
            if($localStorage.exercice.autorisation !== true || $localStorage.exercice.technoId !== parseInt($routeParams.idExo)) {
            	// Si pas autorisé a passer l'exercice -> retour accueil
            	$location.path('/technologie/panneau-solaire/1');
            }
            else {

                this.code = '';

                // Form vars
                this.error = false;
                this.submitted = false;

    	        this.niveau = $localStorage.exercice.niveau;
                this.infrastructure = $localStorage.exercice.infrastructure;
    	        this.nom = $localStorage.exercice.nom;

                
                ContextFactory.getAvancementDecouverte(this.infrastructure, this.niveau);

    	        
    	        // Retrieve data called with component
    	        this.technologie = $routeParams.idExo;
    	        this.type = $routeParams.type;

    	        this.exercice = ContextFactory.getExercice(this.technologie, this.type);

                this.modalRetourShown = false; // hiding modal at first
                this.modalRetour = function() {
                    self.modalRetourShown = !self.modalRetourShown;
                }

                this.modalValidationShown = false; // hiding modal at first
                this.modalValidation = function() {
                    self.modalValidationShown = !self.modalValidationShown;
                }

                this.valider = function() {
                    self.submitted = true;
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (self.code !== self.exercice.codeValidation) {
                        self.error = true;
                        return;
                    }

                    ContextFactory.awardDecouverte($localStorage.matricule, this.infrastructure, this.niveau);
                    if(!ContextFactory.getGuildeBrevet(this.infrastructure, this.niveau)) {
                        // si personne n'a le brevet -> calcul si brevet accordé
                        var elevesDecouvert = ContextFactory.decouvertGuilde($localStorage.matricule, this.infrastructure, this.niveau);
                        for(var i=0; i<elevesDecouvert.length; i++) {
                            ContextFactory.awardBrevet()
                        }
                    }

                }

                this.invalider = function() {
                    self.submitted = true;
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (self.code !== self.exercice.codeValidation) {
                        self.error = true;
                        return;
                    }

                    $location.path('/technologie/'+self.infrastructure+'/'+self.niveau);
                }
            }
        }
    }]
});