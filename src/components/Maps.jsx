// Importation des hooks et composants nécessaires depuis React et Mapbox
import React, { useRef, useEffect, useState } from 'react';
import { getMyFriends } from '../controllers/friends';
import mapboxgl from 'mapbox-gl';
// Importation du style CSS de Mapbox pour que la carte ait le bon style
import 'mapbox-gl/dist/mapbox-gl.css';

// Votre jeton d'accès personnel Mapbox (à conserver secret et sécurisé normalement)
const TOKEN = 'pk.eyJ1IjoiamJlYXVjaGVtaW4iLCJhIjoiY2xqb2p0MnJvMWZ3NTNra3k4MjZ2OXo4aCJ9.wGcYu2tLuZR2x28VjWDFZw';

// Le composant Map, une fonction qui renvoie ce que React doit afficher
const Map = () => {
    // Références utilisées pour accéder directement à des éléments du DOM et stocker des objets sans re-render
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);

    // Les états pour gérer les données (positions des amis) et les erreurs
    const [friendsPositions, setFriendsPositions] = useState([]);
    const [error, setError] = useState(null);

    // Fonction asynchrone simulant une demande à une API pour obtenir des positions
    const getFriendsPositions = async () => {
        // Imitation d'un délai de réseau avec une pause de 3 secondes, vous devrez retirer cette ligne dans votre code.
        await new Promise(resolve => setTimeout(resolve, 3000));
        // Ici, nous simulons une réponse avec des données fictives, vous devrez fait la demande à api.joeleprof.com
        return {
            "data": [
                {
                    "position": {
                        "lat": 45.5403129,
                        "long": -73.5563096
                    },
                    "_id": "64bc3af0a8638a0a347f94b5",
                    "username": "jdao",
                    "fullName": "John Dao"
                },
                {
                    "position": {
                        "lat": 45.6486734,
                        "long": -73.578752
                    },
                    "_id": "64bf15f9cad44bf9438a6584",
                    "username": "henri",
                    "fullName": "kondjo"
                },
                {
                    "position": {
                        "lat": 45.5230677,
                        "long": -73.5535644
                    },
                    "_id": "64bf8ab1cad44bf9438a6de1",
                    "username": "alae",
                    "fullName": "ieb"
                }
            ]
        };
    };

    // Fonction asynchrone pour récupérer les positions des amis et les stocker dans l'état
    const fetchFriendsPositions = async () => {
        try {
            const { data } = await getMyFriends();
            // const { data } = await getFriendsPositions();
            setFriendsPositions(data);
        } catch (error) {
            // Gestion des erreurs lors de la récupération des données
            setError(`Erreur lors de la récupération des positions des amis: ${error.message}`);
        }
    };

    // Initialisation de la carte avec Mapbox
    const initialiseMap = () => {
        if (!mapboxgl.supported()) {
            setError('Votre navigateur ne supporte pas Mapbox GL');
            return;
        }

        // Création de l'objet carte et configuration initiale
        mapRef.current = new mapboxgl.Map({
            accessToken: TOKEN,
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.587982, 45.529560], // Coordonnées initiales de la carte
            zoom: 9,
        });

        // Cette fonction sera appelée quand le composant Map sera retiré de la page
        return () => mapRef.current?.remove();
    };

    // Ajout des marqueurs sur la carte pour les positions des amis
    const addMarkers = () => {
        if (mapRef.current && friendsPositions.length > 0) {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            friendsPositions.forEach(({ position }) => {
                if (position && position.long && position.lat) {
                    const marker = new mapboxgl.Marker()
                        .setLngLat([position.long, position.lat])
                        .addTo(mapRef.current);
                    markersRef.current.push(marker);
                }
            });
        }
    };

    // Utilisation de useEffect pour déclencher des effets secondaires dans le cycle de vie du composant
    useEffect(() => {
        fetchFriendsPositions();
        const intervalId = setInterval(fetchFriendsPositions, 2000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        initialiseMap();
        // Ce return est appelé quand le composant est détruit
        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        addMarkers();
    }, [friendsPositions]);

    // Affichage d'une erreur si elle existe
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Rendu du conteneur où la carte sera affichée
    return (
        <div className="map-container">
            <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

// Rendre le composant Map disponible pour être utilisé dans d'autres parties de l'application
export default Map;
