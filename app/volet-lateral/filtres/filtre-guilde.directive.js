/**
 * Created by Estelle on 13/06/2016.
 */
'use strict';

angular.
module('voletLateral').
directive('filtreGuilde', function() {
    return {
        restrict: 'E',
        template: '<div style="display: inline-block">{{guilde.nom}}<div style="display: inline-block; position: absolute; right: 3px; top:25%; width: 12px; height: 12px; border-radius: 50%; background: {{guilde.couleur}}"></div></div>',
        scope: {
            guilde: '=guilde'
        }
    };
});

