/**
 * Created by Estelle on 31/05/2016.
 */
'use strict';

// Register `accueil` component, along with its associated controller and template
angular.
module('accueil').
component('accueilOwned', {
    templateUrl: 'accueil/accueil.template.html',
    controller: function AccueilOwnedController(TAB_NAME) {
        this.tab = TAB_NAME.OWNED;
        this.tab_name = TAB_NAME; // injecting constants in view
    }
});