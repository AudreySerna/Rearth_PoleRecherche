/**
 * Created by Estelle on 31/05/2016.
 */
'use strict';

// Register `accueil` component, along with its associated controller and template
angular.
module('accueil').
component('accueilDiscover', {
    templateUrl: 'accueil/accueil.template.html',
    controller: function AccueilDiscoverController(TAB_NAME) {
    	var self = this;
        this.tab = TAB_NAME.DISCOVER;
        this.tab_name = TAB_NAME; //injecting constant in view
        this.techs = [{ id : '3'},
        			 { id : '4'}]
    }
});