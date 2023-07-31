//in StarSystemPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStarSystem } from '../services/starSystemService';
import { ContentTitleBar } from '../components/ContentTitleBar';
import { createPlanet, deletePlanet, updatePlanet } from '../services/planetService';

export function StarSystemPage({ match }) {
  const [starSystem, setStarSystem] = useState(null);
  const [newPlanetName, setNewPlanetName] = useState('');
  const [previewPlanet, setPreviewPlanet] = useState(null);
  const [editNote, setEditNote] = useState(false);

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
    setPreviewPlanet(null);
  };
  // handleUpdateNote---------------------------------------------------
const handleUpdateNote = async (planetId, note) => {
  await updatePlanet(planetId, { note });
  setPreviewPlanet(prevState => ({ ...prevState, note }));
};

// handleAddImage---------------------------------------------------
const handleAddImage = async (planetId, image) => {
  await updatePlanet(planetId, { $push: { images: { url: image } } });
  setPreviewPlanet(prevState => ({
    ...prevState,
    images: [...prevState.images, { url: image }]
  }));
};
// ---Drag to Add Image-------------------------------------------------------------------
const handleDragOver = event => {
  event.preventDefault();
};

const handleDrop = async event => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    // Add code here to handle the dropped file
    // For example, you could call the handleAddImage function to add the image to the planet
    handleAddImage(previewPlanet._id, file);
  }
};
// ----------------------------------------------------------------------

  return (
    <div>
        <div className="outer-display-box">
            <ContentTitleBar title={starSystem.name} />
            <form className='add-planet-button' onSubmit={handleAddPlanet}>
                <input
                    type="text"
                    value={newPlanetName}
                    onChange={event => setNewPlanetName(event.target.value)}
                    placeholder="New planet name"
                />
                <button type="submit">Add Planet</button>
            </form>
            <div className="inner-container">
                {starSystem.planets.map(planet => (
                    <div key={planet._id} className="planet">
                        <Link to={`/starsystem/${id}/planet/${planet._id}`}>{planet.name}</Link>
                        {previewPlanet && previewPlanet._id === planet._id ? (
                            <button onClick={() => setPreviewPlanet(null)}>Close</button>
                        ) : (
                            <button onClick={() => setPreviewPlanet(planet)}>Open</button>
                        )}
                    </div>
                ))}
            </div>
            {/* {previewPlanet && (
                <div>
                    <h3>{previewPlanet.name}</h3>
                    <p>Note</p>
                    <p>{previewPlanet.note}</p>
                    <p>Images</p>
                    <div style={{ overflow: 'auto', maxHeight: '200px' }}>
                        {previewPlanet.images.map((image, index) => (
                            <img key={index} src={image.url} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                    <button onClick={() => handleDeletePlanet(previewPlanet._id)}>Delete</button>
                </div>
            )} */}
            {previewPlanet && (
    <div>
        <h2>{previewPlanet.name}</h2>
        <div className="note-container">
        {/* <h4>Note</h4> */}
            {!editNote ? (
                <>
                    <pre>{previewPlanet.note}</pre>
                    <button className="edit-button" onClick={() => setEditNote(true)}>Edit</button>
                </>
            ) : (
                <>
                    <form onSubmit={event => {
                        event.preventDefault();
                        handleUpdateNote(previewPlanet._id, event.target.note.value);
                        setEditNote(false);
                    }}>
                        <textarea name="note" defaultValue={previewPlanet.note}></textarea>
                        <button className="save-button" type="submit">Save</button>
                    </form>
                </>
            )}
        </div>
        <h3>Images</h3>
        <div style={{ overflow: 'auto', maxHeight: '200px' }}>
            {previewPlanet.images.map((image, index) => (
                <img key={index} src={image.url} alt={`Image ${index + 1}`} />
            ))}
        </div>
        <form onSubmit={event => {
            event.preventDefault();
            handleAddImage(previewPlanet._id, event.target.image.files[0]);
        }}>
            <input type="file" name="image" />
            <button type="submit">Add Image</button>
        </form>
        <button onClick={() => handleDeletePlanet(previewPlanet._id)}>Delete</button>
    </div>
)}

            
        </div>
    </div>
  );
}
