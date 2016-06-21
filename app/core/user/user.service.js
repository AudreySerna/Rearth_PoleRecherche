/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.user').factory('User', ['$resource',
    function ($resource) {
        var urlBase = 'http://localhost:3000/users';
        var User = {};

        return $resource('http://localhost:3000/users/:id', {id:"salut"}, {
            get: {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            }
        });
    }
]);