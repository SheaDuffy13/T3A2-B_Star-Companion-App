import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentTitleBar } from '../components/ContentTitleBar';
import {
  getAllPlanets,
  createPlanet,
  updatePlanet,
  removePlanet,
  addImage,
  updateImage,
  deleteImage,
  addNote,
  updateNote,
  deleteNote,
} from '../services/planetService';

export function PlanetPage({ match }) {
  const [planet, setPlanet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getAllPlanets()
      .then(planets => setPlanet(planets.find(planet => planet._id === id)));
  }, [id]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="content-box">
            <ContentTitleBar title={planet.name} />
            <ul>
                {planet.images.map(image => (
                    <li key={image._id}>
                        <img src={image.url} alt={image.caption} />
                    </li>
                ))}
            </ul>
            <ul>
                {planet.notes.map(note => (
                <li key={note._id}>{note.text}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}
