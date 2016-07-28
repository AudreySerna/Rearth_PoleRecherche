/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.context').factory('ContextFactory', ['$resource', '$http', '$localStorage',
    function ($resource, $http, $localStorage) {

        var ContextFactory = {};
        var self = this;
        var context = {};
        var client = new xmlrpc_client('http://jenlab.iut-laval.univ-lemans.fr/webservice/xmlrpc/server.php?wstoken=02d1d49d6dcd67321987e99eb619254e');

        /**
            Recuperation du contexte commun à tout Rearth M6
            Retourne dans une string la réponse du serveur
        **/
        ContextFactory.loadGlobalContext = function() {
            var param_matricule = new xmlrpcval(ELEVE_CONTEXT);
            var param_jeu = new xmlrpcval(GAME_NAME);

            var msg = new xmlrpcmsg('jnGetGameContext', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);

            var resp = client.send(msg);
            //parsing xml response to json
            var string_resp = extractSingleValue(resp);
            var json_resp = JSON.parse(string_resp);
            $localStorage.context = unionJson(json_resp, $localStorage.context);
            return true;
        }

        ContextFactory.getGlobalContext = function() {
            return this.context;
        }

        /**
            Initialisation du contexte commun à tout Rearth M6
        **/
        ContextFactory.setGlobalContext = function() {
            var param_context;

            $http.get('assets/context.json').then(function(response) {
              param_context = new xmlrpcval(JSON.stringify(response.data));
              self.context = response.data;
              return ContextFactory.callbackSetGlobalContext(param_context);
            });
        }

        // callback utilisé pour s'assurer que la suite du code sera effectué après avoir obtenu la réponse de la requête
        ContextFactory.callbackSetGlobalContext = function (param_context) {
            var param_matricule = new xmlrpcval(ELEVE_CONTEXT);
            var param_jeu = new xmlrpcval(GAME_NAME);
            
            var msg = new xmlrpcmsg('jnSetGameContext', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_context);

            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }



        /**
            Initialisation du contexte propre a l'application
        **/
        ContextFactory.setUserContext = function(matricule) {
            var param_context;

            $http.get('assets/user-context.json').then(function(response) {
              param_context = new xmlrpcval(JSON.stringify(response.data));
              return ContextFactory.callbackSetUserContext(param_context, matricule);
            });
        }

        // callback utilisé pour s'assurer que la suite du code sera effectué après avoir obtenu la réponse de la requête
        ContextFactory.callbackSetUserContext = function (param_context, matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            
            var msg = new xmlrpcmsg('jnSetGameContext', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_context);

            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }

        /**
            Recuperation du contexte de l'application
            Retourne dans une string la réponse du serveur
        **/
        ContextFactory.loadUserContext = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);

            var msg = new xmlrpcmsg('jnGetGameContext', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);

            var resp = client.send(msg);
            //parsing xml response to json
            var string_resp = extractSingleValue(resp);
            var json_resp = JSON.parse(string_resp);
            $localStorage.context = unionJson($localStorage.context, json_resp);
            return true;
        }


        ContextFactory.getBrevet = function(infra, niveau) {
            var param_matricule = new xmlrpcval(ELEVE_CONTEXT);
            var param_jeu = new xmlrpcval(GAME_NAME);
            var param_who = new xmlrpcval("all");

            var badge = this.getNomBadge(BREVET, infra, niveau);

            var param_badge = new xmlrpcval(badge);

            var msg = new xmlrpcmsg('jnGetBadge', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_badge);
            msg.addParam(param_who);
            var resp = client.send(msg);
            //parsing xml response to json
            var eleves = extractSingleValue(resp);
            var elevesArray = eleves.split(";");
            return elevesArray;
        }



        /** 
            Récupere l'objet souhaité en matchant sur 1 unique attribut
        **/
        ContextFactory.singleGet = function(path, attr, value) {
            var req = "$." + path + "[?(@."+ attr +"=='"+ value +"')]";
            return jsonPath($localStorage.context, req);
        }

        ContextFactory.singleAttrGet = function(path, attr_filter, value, attr_selected) {
            var req = "$." + path + "[?(@."+ attr_filter +"=='"+ value +"')]." + attr_selected;
            return jsonPath($localStorage.context, req);
        }

        ContextFactory.doubleGet = function(path, attr1, value1, attr2, value2) {
            var req = "$." + path + "[?(@."+ attr1 +"=='"+ value1 +"' && @."+ attr2 +"=='"+ value2 +"')]";
            return jsonPath($localStorage.context, req);
        }

        ContextFactory.getNiveaux = function(infra) {
            var id = this.singleAttrGet("infrastructure", "urlId", infra, "id")[0];
            return this.singleGet("technologie", "infrastructure", id);
        }

        ContextFactory.getCout = function(techId, type) {
            var typeId = this.singleGet("typeCout", "nom", type)[0];
            return this.doubleGet("cout", "technologie", techId, "type", typeId)[0];
        }

        ContextFactory.getInfrastructure = function(infra) {
            return this.singleGet("infrastructure", "urlId", infra)[0];
        }

        ContextFactory.getTechnologie = function(infra, niveau) {
            var infraId = this.singleAttrGet("infrastructure", "urlId", infra, "id")[0];
            return this.doubleGet("technologie", "infrastructure", infraId, "niveau", niveau)[0];
        }

        ContextFactory.getNomBadge = function(type, infra, niveau) {
            var techno = this.getTechnologie(infra, niveau);
            if(type === BREVET) {
                var tmp = this.singleAttrGet(DEFI_TECHNOLOGIQUE, "technologie", techno.id, "nomBrevet")[0];
                return tmp;
            } else {
                return this.singleAttrGet(type, "technologie", techno.id, "nomBadge")[0];
            }
        }

        return ContextFactory;
    }
]);