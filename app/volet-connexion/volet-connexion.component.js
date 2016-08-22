'use strict';

angular.
module('voletConnexion').
component('voletConnexion', {
    templateUrl: 'volet-connexion/volet-connexion.template.html',
    controller: ['$rootScope', 'UserFactory', 'ContextFactory', '$localStorage', '$location', 
	function voletConnexionController($rootScope, UserFactory, ContextFactory, $localStorage, $location) {
        var self = this;
        
        // reinit local params
		$localStorage.$reset();
		$localStorage.utilisateur = {};
		$localStorage.context = {};
		$localStorage.guilde = {};
		$localStorage.exercice = {
			"autorisation": false
		}

        this.matricule = '';
        this.mdp = '';
        // Form vars
        this.error = false;
        this.submitted = false;


        this.login = function(form) {  
        	ContextFactory.setGlobalContext(); // pas hyper logique mais faute de mieux, c'est pour etre sur de prendre en compte les modifs      	

        	self.submitted = true;
        	// If form is invalid, return and let AngularJS show validation errors.
			if (form.$invalid) {
				self.error = true;
			    return;
			}
			// If form is ok, check connection
			if (UserFactory.connexion(this.matricule, this.mdp) === 'false') {
				// not authenticated
				self.error = true;
			    return;
			} else {
				// Initialization if the game hasn't started yet
				if(UserFactory.hasStarted(this.matricule) === 'false') {
					ContextFactory.setUserContext(this.matricule);
					ContextFactory.initBadges(this.matricule);
				} else {
					//ContextFactory.loadUserContext(this.matricule);
					ContextFactory.setUserContext(this.matricule);
					ContextFactory.initBadges(this.matricule); // au cas ou dans le cas reel le jeu a deja commence avant l'acces a l'application
				}
				// Anyway, load context
				ContextFactory.loadGlobalContext();
				// if authenticated, save user profile
				UserFactory.loadEleve(this.matricule, this.mdp);
				$localStorage.guilde = UserFactory.getGuilde(this.matricule);

				$rootScope.$broadcast('refreshInfos');
				$location.path('/technologie/panneau-solaire/1');
			}
        }
    }]
});