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
        ContextFactory.setGlobalContext(); // TODO REMOVE      	

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
				// if authenticated, save user profile
				UserFactory.loadEleve(this.matricule, this.mdp);
				$localStorage.guilde = UserFactory.getGuilde(this.matricule);

				// Initialization if the game hasn't started yet
				if(UserFactory.hasStarted(this.matricule) === 'false') {
					ContextFactory.setUserContext(this.matricule);
					UserFactory.initBadges(this.matricule);
				} else {
					ContextFactory.loadUserContext(this.matricule);
				}
				// Anyway, load context
				ContextFactory.loadGlobalContext();

				// test area
				ContextFactory.setUserContext(this.matricule); // TODO remove this line

				$rootScope.$broadcast('refreshInfos');
				$location.path('/technologie/panneau-solaire/1');
			}
        }
    }]
});