/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.user').factory('UserFactory', ['$resource', '$localStorage', 'ContextFactory',
    function ($resource, $localStorage, ContextFactory) {

        var UserFactory = {};
        var client = new xmlrpc_client('http://jenlab.iut-laval.univ-lemans.fr/webservice/xmlrpc/server.php?wstoken=02d1d49d6dcd67321987e99eb619254e');


        /**
            Authentification
            Retourne dans une string la réponse du serveur (true/false)
        **/
        UserFactory.connexion = function(matricule, mdp) {
            var param_matricule = new xmlrpcval(matricule);
            var param_mdp = new xmlrpcval(mdp);

            var msg = new xmlrpcmsg('jnValidAuthentification', []);
            msg.addParam(param_matricule);
            msg.addParam(param_mdp);

            var resp = client.send(msg);
            //parsing xml response
            return extractSingleValue(resp);
        };

        /**
            Vérifie si le jeu a déjà été commencé
        **/
        UserFactory.hasStarted = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);

            var msg = new xmlrpcmsg('jnIsGameStart', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);

            var resp = client.send(msg);
            //parsing xml response
            return extractSingleValue(resp);
        };

        /**
            Recuperation du profil eleve
            Retourne dans une string la réponse du serveur
        **/
        UserFactory.loadEleve = function(matricule, mdp) {
            var param_matricule = new xmlrpcval(matricule);
            var param_mdp = new xmlrpcval(mdp);

            var msg = new xmlrpcmsg('jnGetProfil', []);
            msg.addParam(param_matricule);
            msg.addParam(param_mdp);

            var resp = client.send(msg);

            //parsing xml response to json
            var eleve = extractSingleValue(resp);
            // charger parametres de session
            $localStorage.utilisateur = this.toUser(eleve);
            $localStorage.matricule = matricule;

            return true;
        }

        /**
            Recuperation du solde eleve
            Retourne dans une string la réponse du serveur
        **/
        UserFactory.getSolde = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            var param_note = new xmlrpcval(NOTE_ENERGIE);

            var msg = new xmlrpcmsg('jnGetNote', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_note);

            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }

        UserFactory.setSolde = function(matricule, valeur) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            var param_note = new xmlrpcval(NOTE_ENERGIE);
            var param_valeur = new xmlrpcval(valeur);

            var msg = new xmlrpcmsg('jnSetNote', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            msg.addParam(param_note);
            msg.addParam(param_valeur);

            var resp = client.send(msg);
            //parsing xml response to json
            return extractSingleValue(resp);
        }

        /**
            Evalue si la technologie a été débloquée
            Retourne "defi-technologique", "achat-licence" ou false si non obtenue
        **/
        UserFactory.unlocked = function(matricule, infra, niveau) {
            if(niveau == 1) {
                return true;
            } else {
                var param_matricule = new xmlrpcval(matricule);
                var param_jeu = new xmlrpcval(GAME_NAME);
                var param_who = new xmlrpcval("my");

                var badgeDecouverte = ContextFactory.getNomBadge(DEFI_TECHNOLOGIQUE, infra, niveau);

                var param_badgeDecouverte = new xmlrpcval(badgeDecouverte);

                var msg = new xmlrpcmsg('jnGetBadge', []);
                msg.addParam(param_matricule);
                msg.addParam(param_jeu);
                msg.addParam(param_badgeDecouverte);
                msg.addParam(param_who);
                var resp = client.send(msg);
                //parsing xml response to json
                var respDecouverte = extractSingleValue(resp);

                if(respDecouverte === "true") {
                    return DEFI_TECHNOLOGIQUE;
                } else {
                    var badgeLicence = ContextFactory.getNomBadge(ACHAT_LICENCE, infra, niveau);

                    var param_badgeLicence = new xmlrpcval(badgeLicence);

                    msg = new xmlrpcmsg('jnGetBadge', []);
                    msg.addParam(param_matricule);
                    msg.addParam(param_jeu);
                    msg.addParam(param_badgeLicence);
                    msg.addParam(param_who);
                    resp = client.send(msg);
                    //parsing xml response to json
                    var respLicence = extractSingleValue(resp);

                    if(respLicence === "true") {
                        return ACHAT_LICENCE;
                    } else {
                        return false;
                    }
                }
            }
        }

        /**
            Accorde tous les badges de découverte de niveau pour toutes les infrastructures
        **/
        UserFactory.initBadges = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            
            var msg;
            var param_badge;

            var badges = ['batisseur_1_decouverte', 'cyberneticien_1_decouverte', 'energeticien_1_decouverte', 'technologue_1_decouverte'];

            for (var i = 0; i < badges.length; i++) {
                msg = new xmlrpcmsg('jnAwardBadge', []);
                param_badge = new xmlrpcval(badges[i]);
                msg.addParam(param_matricule);
                msg.addParam(param_jeu);
                msg.addParam(param_badge);
                client.send(msg);
            }
        }

        UserFactory.award = function(badge, matricule) {
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

        UserFactory.awardDecouverte = function(matricule, infra, niveau) {
            var badge = ContextFactory.getNomBadge(DEFI_TECHNOLOGIQUE, infra, niveau);
            return this.award(badge, matricule);
        }

        UserFactory.awardBrevet = function(matricule, infra, niveau) {
            var badge = ContextFactory.getNomBadge(BREVET, infra, niveau);
            return this.award(badge, matricule);
        }

        UserFactory.awardLicence = function(matricule, infra, niveau) {
            var badge = ContextFactory.getNomBadge(ACHAT_LICENCE, infra, niveau);
            return this.award(badge, matricule);
        }

        /**
            Transforme la string de reponse en un objet user
        **/
        UserFactory.toUser = function (eleve) {
            var userArray = eleve.split(";");
            var userFormatted = {};
            userFormatted.nom = userArray[0];
            userFormatted.prenom = userArray[1];
            userFormatted.email = userArray[2];
            userFormatted.ville = userArray[3];
            userFormatted.pays = userArray[4];
            userFormatted.avatar = userArray[5];
            return userFormatted;
        }

        return UserFactory;
    }
]);
