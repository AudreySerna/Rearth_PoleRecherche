/**
 * Created by Estelle on 13/06/2016.
 */
'use strict';

angular.
module('core').
directive('logoValeur', function() {
    return {
        restrict: 'E',
        template: '<div style="display: inline-block; vertical-align: middle; margin-top:5px;"><div style="display: inline-block; width:18x; margin-right:8px;"><img style="position:relat; max-width:18px; max-height:18px; vertical-align: middle;" ng-src="{{logo}}"></div>{{texte}}</div>',
        scope: {
            texte: '=texte',
            logo: '=logo'
        }
    };
});

