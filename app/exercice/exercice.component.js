'use strict';

angular.
module('exercice').
component('exercice', {
    templateUrl: 'exercice/exercice.template.html',
    controller: ['$http', '$routeParams', function exerciceController($http, $routeParams, BACK_URL) {
        var self = this;
        
        // Retrieve data called with component
        this.idExo = $routeParams.idExo;
    }]
});