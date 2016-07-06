/**
 * Created by Estelle on 13/06/2016.
 */
'use strict';

angular.
module('voletLateral').
directive('filtreLogo', function() {
    return {
        restrict: 'E',
        template: '<div style="display: inline-block">{{texte}}<div style="display: inline-block; position: absolute; right: 0px;"><img style="display: inline-block; position: absolute; right:0px; width: 20px; height: 20px;" ng-src="{{logo}}"></div></div>',
        scope: {
            texte: '=texte',
            logo: '=logo'
        }
    };
});

