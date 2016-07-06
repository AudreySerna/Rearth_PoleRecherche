/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.user').factory('User', ['$resource', '$http',
    function ($resource, $http) {
        var urlBase = 'http://localhost:3000/users';
        var factory = {};

        return $resource('http://localhost:3000/users', {
            get: {
                method: 'GET',
                url: 'http://localhost:3000/users/:id',
                params: { 
                            id : id
                        },
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            }
        });

        /*this.get = function(userId){
            $http.get("http://localhost:3000/users/:id",
                {
                    id: userId
                }).then( function successCallback(data) {
                console.log('ok');
            }, function errorCallback(data) {
                console.log('ok');
            } );
        }

        return this;*/
    }
]);

// I transform the error response, unwrapping the application dta from
// the API response payload.
function handleError( response ) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (
        ! angular.isObject( response.data ) ||
        ! response.data.message
        ) {
        return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return( $q.reject( response.data.message ) );
}

// I transform the successful response, unwrapping the application data
// from the API response payload.
function handleSuccess( response ) {
    return( response.data );
}