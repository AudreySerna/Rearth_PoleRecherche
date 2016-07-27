/**
 * Created by Estelle on 31/05/2016.
 * Creates the display for a filter by guild on the filter bar on the left
 */
'use strict';

angular.
module('infoSansBrevet').
component('infoSansBrevet', {
    templateUrl: 'infrastructures/info-technologie/info-sans-brevet/info-sans-brevet.template.html',
    controller: ['$http', '$routeParams', function infoSansBrevetController($http, $routeParams, BACK_URL) {
        var self = this;
        
		this.modalShown = false; // hiding modal at first
        this.modalBrevet = function() {
            self.modalShown = !self.modalShown;
        }

        // Retrieve data called with component
        this.nom = $routeParams.nom;
        this.niveau = $routeParams.niveau;

        this.connect = function () {
            /*var request = new XmlRpcRequest(
                "http://jenlab.iut-laval.univ-lemans.fr/webservice/xmlrpc/server.php?wstoken=02d1d49d6dcd67321987e99eb619254e", 
                "jnIsGameStart");
            request.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
            request.setHeader('Access-Control-Allow-Credentials', 'true');
            request.setHeader('Content-Type', 'text/xml');
            request.addParam('ff50'); 
            request.addParam('rearth_M6Brevet'); 
            var response = request.send();  
            alert(response.parseXML()); */
            var client = new xmlrpc_client('http://jenlab.iut-laval.univ-lemans.fr/webservice/xmlrpc/server.php?wstoken=02d1d49d6dcd67321987e99eb619254e');
            var param_matricule = new xmlrpcval('152d');
            var param_mdp = new xmlrpcval('a[X[XP]');
            var param_jeu = new xmlrpcval('rearth_M6Brevet');

            var msg = new xmlrpcmsg('jnValidAuthentification', []);
            msg.addParam(param_matricule);
            msg.addParam(param_mdp);
            //msg.addParam(param_jeu);
            var resp = client.send(msg);
            console.log(resp);
         }
    }]
});