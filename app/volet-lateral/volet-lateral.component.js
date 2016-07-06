/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('voletLateral').
component('voletLateral', {
    templateUrl: 'volet-lateral/volet-lateral.template.html',
    controller: ['$http', 'Guilde', 'User', function VoletLateralController($http, Guilde, User, BACK_URL) {
        var self = this;

        this.guildes = Guilde.query();
        //this.user = User.get('coucou');
        User.get('salut').success(function(response){
	        self.user = response;
	    });
    }]
});