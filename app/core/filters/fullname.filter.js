/**
 * Created by Estelle on 20/06/2016.
 */
'use strict';

angular.
module('core').
filter('fullname', function() {
    return function(user) {
        return user.prenom + " " + user.nom;
    };
});