/**
 * Created by Estelle on 31/05/2016.
 */
'use strict';

angular.
module('poleRecherche').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/welcome', {
            template: "<accueil></accueil>"
        }).
        otherwise('/welcome');
    }
])
    .constant(
        'TAB_NAME', {
            DISCOVER : 'discover',
            OWNED : 'my-techs'
        }
    );
