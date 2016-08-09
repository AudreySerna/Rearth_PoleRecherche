/**
 * Created by Estelle on 20/06/2016.
 */
'use strict';

angular.
module('core').
filter('numberize', function() {
    return function(number) {
        if(number >= 0) {
        	return "+"+number;
        } else {
        	return number;
        }
    }
});