/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.guilde').factory('Guilde', ['$resource',
    function ($resource) {
        return $resource('http://localhost:3000/guildes', {}, {
            query: {
                method: 'GET'
            }
        });
    }
]);