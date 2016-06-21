/**
 * Created by Estelle on 13/06/2016.
 */
'use strict';

angular.
module('voletLateral').
directive('filtreLogo', function() {
    return {
        restrict: 'E',
        template: '<div style="display: inline-block">{{filtre.nom}}<div style="display: inline-block; position: absolute; right: 3px; top:25%; width: 12px; height: 12px; border-radius: 50%;"><img src="{{filtre.logo}}"></div></div>',
        scope: {
            filtre: '=filtre'
        }
    };
});

