import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStarSystem } from '../services/starSystemService';
import { ContentTitleBar } from '../components/ContentTitleBar';

import { createPlanet, deletePlanet } from '../services/planetService';

export function StarSystemPage({ match }) {
  const [starSystem, setStarSystem] = useState(null);
  const [newPlanetName, setNewPlanetName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getStarSystem(id)
        .then(starSystem => setStarSystem(starSystem));
  }, [id]);
  if (!starSystem) {
    return <div>Loading...</div>;
  }

  // handleAddPlanet---------------------------------------------------
  const handleAddPlanet = async (event) => {
    event.preventDefault();
    if (newPlanetName) {
      const newPlanet = await createPlanet({ name: newPlanetName, star: id });
      setStarSystem(prevState => ({
        ...prevState,
        planets: [...prevState.planets, newPlanet]
      }));
      setNewPlanetName('');
    }
  };

  // handleDeletePlanet---------------------------------------------------
  const handleDeletePlanet = async (planetId) => {
    await deletePlanet(planetId);
    setStarSystem(prevState => ({
      ...prevState,
      planets: prevState.planets.filter(planet => planet._id !== planetId)
    }));
  };
  // ----------------------------------------------------------------------

  return (
    <div>
        <div className="content-box">
            <ContentTitleBar title={starSystem.name} />
            <ul>
                {starSystem.planets.map(planet => (
                    <li key={planet._id}>
                    <Link to={`/starsystem/${id}/planet/${planet._id}`}>{planet.name}</Link>
                    <button onClick={() => handleDeletePlanet(planet._id)}>Delete</button>
                </li>
                ))}
            </ul>
            <form onSubmit={handleAddPlanet}>
                <input
                    type="text"
                    value={newPlanetName}
                    onChange={event => setNewPlanetName(event.target.value)}
                    placeholder="New planet name"
                />
                <button type="submit">Add Planet</button>
            </form>
        </div>
    </div>
  );
}
