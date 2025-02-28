<?php

namespace VinoAPI\Controllers;

use VinoAPI\Core\Router;
use VinoAPI\Modeles\UsagerModele;

/**
 * Gère les méthodes de bouteilles.
 */
class UsagerController extends Router
{
    /**
     * Traîte les requêtes PUT usager.
     *
     * @return void
     */
    public function putUsager()
    {
        if (count($this->urlParams) == 2) {
            if ($this->urlParams[1] == 'login') {
                return $this->login();
            } else if (ctype_digit($this->urlParams[1])) {
                return $this->modifierUsager();
            }
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);

            echo json_decode($this->retour);
        }
    }

    /**
     * Teste le login usager.
     *
     * @return void
     */
    public function login()
    {
        $body = json_decode(file_get_contents('php://input'));

        if (!empty($body)) {
            //TODO valider données

            $usagerClassObj = new UsagerModele;
            $resultat = $usagerClassObj->match($body->courriel, $body->mot_passe);

            $this->retour['data'] = $resultat;
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);
        }

        echo json_encode($this->retour);
    }

    /**
     * Modifie les infos d'un usager.
     *
     * @return void
     */
    public function modifierUsager()
    {
        $body = json_decode(file_get_contents('php://input'));

        if (!empty($body)) {
            //TODO valider données
            $body->id = $this->urlParams[1];

            $usagerClassObj = new UsagerModele;
            $resultat = $usagerClassObj->modifierUsager($body);

            $this->retour['data'] = $resultat;
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);
        }

        echo json_encode($this->retour);
    }

    /**
     * Traite la requête DELETE d'un usager.
     *
     * @return void
     */
    public function deleteUsager()
    {
        if (count($this->urlParams) == 2) {
            if (ctype_digit($this->urlParams[1])) {
                $usagerClassObj = new UsagerModele;
                $resultat = $usagerClassObj->deleteUsager($this->urlParams[1]);

                $this->retour['data'] = $resultat;
            } else {
                $this->retour['erreur'] = $this->erreur(400);
                unset($this->retour['data']);
            }
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);
        }

        echo json_encode($this->retour);
    }

    /**
     * Traite la requête POST usager.
     *
     * @return void
     */
    public function createUsager()
    {
        if (count($this->urlParams) == 1) {
            $body = json_decode(file_get_contents('php://input'));

            if (!empty($body)) {
                $usagerClassObj = new UsagerModele;
                $resultat = $usagerClassObj->createUsager($body);

                $this->retour['data'] = $resultat;
            } else {
                $this->retour['erreur'] = $this->erreur(400);
                unset($this->retour['data']);
            }
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);
        }

        echo json_encode($this->retour);
    }

    /**
     * Traite la requête GET usager.
     *
     * @return void
     */
    public function getUsager()
    {
        if (count($this->urlParams) == 2) {
            if (ctype_digit($this->urlParams[1])) {
                $usagerClassObj = new UsagerModele;
                $resultat = $usagerClassObj->getUsagerParId($this->urlParams[1]);

                $this->retour['data'] = $resultat;
            } else {
                $this->retour['erreur'] = $this->erreur(400);
                unset($this->retour['data']);
            }
        } else if (count($this->urlParams) == 1) {
            $usagerClassObj = new UsagerModele;
            $resultat = $usagerClassObj->getUsagers();

            $this->retour['data'] = $resultat;
        } else {
            $this->retour['erreur'] = $this->erreur(400);
            unset($this->retour['data']);
        }

        echo json_encode($this->retour);
    }
}
