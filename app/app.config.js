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
        }).        
        otherwise('/technologie/eolienne/1');
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
    .constant(
        'BACK_URL', 'http://localhost:3000/'
    ).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8000';
}]).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self'   // trust all resources from the same origin
    ]);
});


/*
jQuery(document).ready(function(){
    jQuery(this).find('.caption').slideDown(250);
});*/