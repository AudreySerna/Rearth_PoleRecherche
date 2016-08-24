/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.context').factory('ContextFactory', ['$resource', '$http', '$localStorage', 'UserFactory',
    function ($resource, $http, $localStorage, UserFactory) {
        /**
            Contient toutes les interactions avec la BD moodle ou les fichiers internes context et user-context
        **/

        var ContextFactory = {};
        var self = this;
        var context = {};
        // url pour se connecter à la base moodle
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

            $http.get('assets/user-context.json').then(function(response) {
                var context = response.data;
                return ContextFactory.callbackSetUserContext(context, matricule);
            });
        }

        // callback utilisé pour s'assurer que la suite du code sera effectué après avoir obtenu la réponse de la requête
        ContextFactory.callbackSetUserContext = function (context, matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_context = new xmlrpcval(JSON.stringify(context));
            var param_jeu = new xmlrpcval(GAME_NAME);
            
            var msg = new xmlrpcmsg('jnSetGameContext', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_context);

            var resp = client.send(msg);
            //parsing xml response to json
            $localStorage.context = unionJson($localStorage.context, context);;
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

        
        /**
            Evalue si la technologie a été débloquée
            Retourne "defi-technologique", "achat-licence" ou false si non obtenue
        **/
        ContextFactory.unlocked = function(matricule, infra, niveau) {
            if(niveau == 1) {
                return DEFI_TECHNOLOGIQUE;
            } else {
                var badgeDecouverte = this.getNomBadge(DEFI_TECHNOLOGIQUE, infra, niveau);
                var respDecouverte = this.hasBadge(matricule, badgeDecouverte);

                if(respDecouverte === "true") {
                    return DEFI_TECHNOLOGIQUE;
                } else {
                    var badgeLicence = this.getNomBadge(ACHAT_LICENCE, infra, niveau);
                    var respLicence = this.hasBadge(matricule, badgeLicence);

                    if(respLicence === "true") {
                        return ACHAT_LICENCE;
                    } else {
                        return false;
                    }
                }
            }
        }

        
        /**
            Accorde tous les badges de découverte de niveau 1 pour toutes les infrastructures
            Repose sur BADGES_NV_1 défini dans requests-utils.js
        **/
        ContextFactory.initBadges = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            
            var msg;
            var param_badge;

            var badges = BADGES_NV_1;

            for (var i = 0; i < badges.length; i++) {
                msg = new xmlrpcmsg('jnAwardBadge', []);
                param_badge = new xmlrpcval(badges[i]);
                msg.addParam(param_matricule);
                msg.addParam(param_jeu);
                msg.addParam(param_badge);
                client.send(msg);
            }
        }

        /**
            Decerne un badge
        **/
        ContextFactory.award = function(badge, matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            var param_badge = new xmlrpcval(badge);

            var msg = new xmlrpcmsg('jnAwardBadge', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_badge);

            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }

        ContextFactory.awardDecouverte = function(matricule, infra, niveau) {
            var badge = this.getNomBadge(DEFI_TECHNOLOGIQUE, infra, niveau);
            return this.award(badge, matricule);
        }

        ContextFactory.awardBrevet = function(matricule, infra, niveau) {
            var badge = this.getNomBadge(BREVET, infra, niveau);
            return this.award(badge, matricule);
        }

        ContextFactory.awardLicence = function(matricule, infra, niveau) {
            var badge = this.getNomBadge(ACHAT_LICENCE, infra, niveau);
            return this.award(badge, matricule);
        }

        /**
            Envoie une requête getBadge à moodle, cf doc des services web
        **/
        ContextFactory.getBadge = function(matricule, who, nomBadge) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            var param_who = new xmlrpcval(who);

            var param_badge = new xmlrpcval(nomBadge);

            var msg = new xmlrpcmsg('jnGetBadge', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_badge);
            msg.addParam(param_who);
            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }

        /**
            Retourne le nom de la guilde détenant le brevet, ou false si non
        **/
        ContextFactory.getGuildeBrevet = function(infra, niveau) {
            var badge = this.getNomBadge(BREVET, infra, niveau);

            var eleves = this.getBadge(ELEVE_CONTEXT, "all", badge);
            var elevesArray = eleves.split(";");
            elevesArray.pop();

            // si le brevet a été déposé
            if(elevesArray.length > 0) {
                // on récupere la guilde d'un des joueurs puisqu'ils doivent tous etre de la meme guilde
                var respArray = UserFactory.getGuilde(elevesArray[0]);
                return respArray;
            }
            return false;
        }

        /**
            Vérifie si le badge est possédé ou non
        **/
        ContextFactory.hasBadge = function(matricule, badge) {
            return this.getBadge(matricule, "my", badge);
        }

        ContextFactory.hasBrevet = function(matricule, infra, niveau) {
            var badge = this.getNomBadge(BREVET, infra, niveau);
            return this.hasBadge(matricule, badge);
        }

        /**
            Retourne qui a découvert la technologie dans la guilde d'un eleve
        **/
        ContextFactory.decouvertGuilde = function(matricule, infra, niveau) {
            var badge = this.getNomBadge(BREVET, infra, niveau);

            var eleves = this.getBadge(matricule, "group", badge);
            var elevesArray = eleves.split(";");
            elevesArray.pop();
            return elevesArray;
        }

        /**
            Retourne un objet contenant les informations sur un cout
        **/
        ContextFactory.getFormattedCouts = function(infra, niveau, nomType) {
            var couts = this.getCouts(infra, niveau, nomType);
            var ressource;
            for(var i=0; i < couts.length; i++) {
                couts[i].icone = this.getRessource(couts[i].ressource).icone;
            }
            return couts;
        }

        /**
        TODO Marc
            A décommenter une fois la modification du service getGroup effective
        **/
        /**
        ContextFactory.getGuildes = function() {
            var guildes = UserFactory.getGuilde(ELEVE_CONTEXT, "all");
            var guildesArray = guildes.split(";");
            guildesArray.pop();
            return guildesArray;
        }**/

        /**
            Retourne le nombre de personnes ayant découvert la technologie par guilde
            Repose sur la variable GUILDES de requests-utils.js, à modifier une fois le service de récupération des guildes sera présent
        **/
        ContextFactory.getAvancementDecouverte = function(infra, niveau) {
            var badge = this.getNomBadge(DEFI_TECHNOLOGIQUE, infra, niveau);

            var eleves = this.getBadge(ELEVE_CONTEXT, "all", badge);

            var elevesArray = eleves.split(";");
            elevesArray.pop();
            var respArray = {};
            var guildeTmp;

            for(var i=0; i<GUILDES_ARRAY.length; i++) {
                respArray[GUILDES_ARRAY[i]] = {"count":0, "matricules" : [], "nom": GUILDES_ARRAY[i]};
            }
            /** TODO Marc - une fois le service effectif, remplacer le for ci dessus par
            var guildesArray = this.getGuildes();
            for(var i=0; i<guildesArray.length; i++) {
                respArray[i] = {"count":0, "matricules" : [], "nom": guildesArray[i]};
            }
            **/

            if(elevesArray.length > 0) {
                // si il y a eu des découvertes
                for(var i = 0; i<elevesArray.length; i++) {
                    // on récupere la guilde d'un des joueurs puisqu'ils doivent tous etre de la meme guilde
                    guildeTmp = UserFactory.getGuilde(elevesArray[i]);
                    respArray[guildeTmp.nom].count += 1;
                    respArray[guildeTmp.nom].matricules.push(elevesArray[i]);
                }
            }
            return respArray;
        }


        /** 
            Requêtes génériques utilisant json path
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

        /**
            Requêtes spécifiques utilisant les requêtes génériques ci-dessus
        **/
        ContextFactory.getNiveaux = function(infra) {
            var id = this.singleAttrGet("infrastructure", "urlId", infra, "id")[0];
            return this.singleGet("technologie", "infrastructure", id);
        }

        ContextFactory.getRessource = function(ressource) {
            return this.singleGet("ressource", "id", ressource)[0];
        }

        ContextFactory.getCouts = function(infra, niveau, type) {
            var techno = this.getTechnologie(infra, niveau);
            var typeObj = this.getTypeCout(type);
            return this.doubleGet("cout", "techno", techno.id, "type", typeObj.id);
        }
        
        ContextFactory.getTypeCout = function(type) {
            return this.singleGet("typeCout", "nom", type)[0];
        }

        ContextFactory.getInfrastructure = function(infra) {
            return this.singleGet("infrastructure", "urlId", infra)[0];
        }
s
        ContextFactory.getPreviousInfrastructure = function(infraObj) {
            var id = infraObj.id - 1;
            return this.singleGet("infrastructure", "id", id)[0];
        }

        ContextFactory.getNextInfrastructure = function(infraObj) {
            var id = infraObj.id + 1;
            return this.singleGet("infrastructure", "id", id)[0];
        }

        ContextFactory.getTechnologie = function(infra, niveau) {
            var infraId = this.singleAttrGet("infrastructure", "urlId", infra, "id")[0];
            return this.doubleGet("technologie", "infrastructure", infraId, "niveau", niveau)[0];
        }

        ContextFactory.getExercice = function(technologie, type) {
            return this.singleGet(type, "technologie", technologie)[0];
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