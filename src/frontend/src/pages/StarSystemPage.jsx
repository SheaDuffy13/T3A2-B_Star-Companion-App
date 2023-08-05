//in StarSystemPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStarSystem } from '../services/starSystemService';
import { createPlanet, deletePlanet, updatePlanet, addImage, deleteImage, addImagesToPlanet } from '../services/planetService';
import { ContentTitleBar } from '../components/ContentTitleBar';
import axios from 'axios';
import api from '../config/api';


export function StarSystemPage({ match }) {
  const [starSystem, setStarSystem] = useState(null);
  const [newPlanetName, setNewPlanetName] = useState('');
  const [editNote, setEditNote] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [loginRedirect, setLoginRedirect] = useState(false);

  const [fileInputState, setFileInputState] = useState('')
  // const [selectedFile, setSelectedFile] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [previewPlanet, setPreviewPlanet] = useState(null);

  const navigate = useNavigate();
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
      try {
        const newPlanet = await createPlanet({ name: newPlanetName, star: id });
        setStarSystem(prevState => ({
          ...prevState,
          planets: [...prevState.planets, newPlanet]
        }));
        setNewPlanetName('');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage('You need to log in to access this feature');
          setLoginRedirect(true);
        } else {
          console.error(error);
        }
      }
    }
  };  

  // handleDeletePlanet---------------------------------------------------
  const handleDeletePlanet = async (planetId) => {
    try {
    await deletePlanet(planetId);
    setStarSystem(prevState => ({
      ...prevState,
      planets: prevState.planets.filter(planet => planet._id !== planetId)
    }));
    setPreviewPlanet(null);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage('You need to log in to access this feature');
      setLoginRedirect(true);
    } else {
      console.error(error);
    }
  }
  };
  // handleUpdateNote---------------------------------------------------
const handleUpdateNote = async (planetId, note) => {
  try {
  await updatePlanet(planetId, { note });
  setPreviewPlanet(prevState => ({ ...prevState, note }));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage('You need to log in to access this feature');
      setLoginRedirect(true);
    } else {
      console.error(error);
    }
  }
};

// handleAddImages---------------------------------------------------
const handleAddImages = async (event) => {
  event.preventDefault();
  if (!selectedFiles.length) return;
  // Convert selected files to base64 encoded strings
  const fileReaders = Array.from(selectedFiles).map(file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  });
  const base64EncodedImages = await Promise.all(fileReaders);
  try {
    const updatedPlanet = await addImagesToPlanet(previewPlanet._id, { images: base64EncodedImages });
    setPreviewPlanet(updatedPlanet);
    setStarSystem(prevState => ({
      ...prevState,
      planets: prevState.planets.map(planet => {
        if (planet._id === previewPlanet._id) {
          return updatedPlanet;
        }
        return planet;
      })
    }));
    setFileInputState('');
    setSelectedFiles([]);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // display a message to the user indicating that they need to log in
      setMessage('You need to log in to access this feature');
      // provide a button or link for the user to navigate to the login page
      setLoginRedirect(true);
    } else {
      // handle other errors
      console.error(error);
    }
  }
};


const handleFileInputChange = (event) => {
  const files = event.target.files;
  setSelectedFiles(files);
};

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewSource(reader.result);
  };
};

const uploadImage = async (base64EncodedImage, planetId) => {
  try {
    const response = await addImage(planetId, { data: base64EncodedImage });
      if (response.status === 200) {
        console.log('Image uploaded successfully!');
      } else {
        console.log('An error occurred while uploading the image');
      }
  } catch (error) {
    console.log(error)
  }
}

const handleSubmitFile = async (e) => {
  console.log('submitting...')
  e.preventDefault()
  if(!previewSource) return;
  uploadImage(previewSource, previewPlanet._id)
}


// ---delete image-------------------------------------------------------------------
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImage(previewPlanet._id, imageId);
      setPreviewPlanet(prevState => ({
        ...prevState,
        images: prevState.images.filter(image => image._id !== imageId)
      }));
      setStarSystem(prevState => ({
        ...prevState,
        planets: prevState.planets.map(planet => {
          if (planet._id === previewPlanet._id) {
            return {
              ...planet,
              images: planet.images.filter(image => image._id !== imageId)
            };
          }
          return planet;
        })
      }));
    } catch (error) {
      console.error(error);
    }
  };
// ----------------------------------------------------------------------
  const handleLoginRedirect = () => {
    navigate('/profile');
  };

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
            {loginRedirect && (
              <div>
                <p>Account required</p>
                <button onClick={handleLoginRedirect}>Signup or login</button>
              </div>
            )}

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
        <div className="image-container">
            {previewPlanet.images.map((image, index) => (
                <div key={index}>
                  <img src={image.url} alt={`Image ${index + 1}`} />
                  <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
                </div>
            ))}
        </div>
        {/* add image */}
        <form onSubmit={handleAddImages}>
          <input type="file" name="images" multiple onChange={handleFileInputChange} />
          <button type="submit">Upload Images</button>
        </form>

        <button onClick={() => handleDeletePlanet(previewPlanet._id)}>Delete</button>
    </div>
)}     
        </div>
    </div>
  );
}
