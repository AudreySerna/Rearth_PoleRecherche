/**
 * Created by Estelle on 31/05/2016.
 */
'use strict';

angular.
module('poleRecherche').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/technologie/:nom/:niveau', {
            template: "<infrastructures></infrastructures>"
        })
        .when('/connect', {
            template: "<volet-connexion></volet-connexion>"
        })
        .when('/exercice/:idExo', {
            template: "<exercice></exercice>"
        })    
        .otherwise('/connect');
    }
])
    .config(function(ngModalDefaultsProvider) {
      ngModalDefaultsProvider.set('closeButtonHtml', 'Retour');
})
    .constant(
        'TAB_NAME', {
            DISCOVER : 'discover',
            OWNED : 'my-techs'
        })
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8000';
}])
    .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self'   // trust all resources from the same origin
    ])
})
    .config(function(ngModalDefaultsProvider) { //modal parameters
    ngModalDefaultsProvider.set('closeButtonHtml', '<i class="fa fa-1x fa-times" style="color:black;" aria-hidden="true"></i>');
    });
