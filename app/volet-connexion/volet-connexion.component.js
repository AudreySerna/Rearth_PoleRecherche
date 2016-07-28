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

        this.matricule = '';
        this.mdp = '';
        // Form vars
        this.error = false;
        this.submitted = false;

        ContextFactory.setGlobalContext();

        this.login = function(form) {


			ContextFactory.setGlobalContext(); // TODO remove this line
        	

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
				ContextFactory.setUserContext(); // TODO remove this line

				console.log("------test award--------");
				console.log(UserFactory.awardDecouverte(this.matricule, "panneau-solaire", 2));
				console.log("--------------");

				$rootScope.$broadcast('refreshInfos');
				document.getElementById('slider').classList.toggle('closed');
				$location.path('/technologie/panneau-solaire/2');
			}
        }
    }]
});