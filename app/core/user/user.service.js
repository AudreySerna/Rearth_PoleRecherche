/**
 * Created by Estelle on 16/06/2016.
 */
'use strict';

angular.module('core.user').factory('UserFactory', ['$resource', '$localStorage',
    function ($resource, $localStorage) {
        /**
            Effectue l'interface avec la BD moodle pour ce qui est du ressort de l'utilisateur uniquement
        **/

        var UserFactory = {};
        // url de connexion aux webservices moodle
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

        /**
            Modifie le solde d'un élève
        **/
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
            Retire une somme au solde d'un élève
        **/
        UserFactory.pay = function(matricule, cout) {
            var solde = parseInt(this.getSolde(matricule));
            solde = solde-cout;
            if(solde < 0) {
                solde = 0;
            }
            this.setSolde(matricule, solde);
        }

        /**
            Retourne un objet guilde
            TODO MARC, ajouter un parametre who en entrée : function(matricule, who)
        **/
        UserFactory.getGuilde = function(matricule) {
            var param_matricule = new xmlrpcval(matricule);
            var param_jeu = new xmlrpcval(GAME_NAME);
            //TODO Marc - décommenter ces lignes
            //var param_who = new xmlrpcval(who);

            var msg = new xmlrpcmsg('jnGetGroupe', []);
            msg.addParam(param_matricule);
            msg.addParam(param_jeu);
            //msg.addParam(param_who);

            var resp = client.send(msg);
            //parsing xml response to json
            return this.toGuilde(extractSingleValue(resp));
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

        /**
            Transforme la string de reponse en un objet user
        **/
        UserFactory.toGuilde = function (guilde) {
            var guildeArray = guilde.split(";");
            var guildeFormatted = {};
            guildeFormatted.nom = guildeArray[0];
            guildeFormatted.logo = guildeArray[1];
            return guildeFormatted;
        }

        return UserFactory;
    }
]);
