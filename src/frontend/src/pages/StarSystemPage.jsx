import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStarSystem, getAllPlanets } from '../services/starSystemService';
import { createPlanet, deletePlanet, updatePlanet, deleteImage, addImagesToPlanet } from '../services/planetService';
import { ContentTitleBar } from '../components/ContentTitleBar';


export function StarSystemPage({ match }) {
  const [starSystem, setStarSystem] = useState(null);
  const [newPlanetName, setNewPlanetName] = useState('');
  const [editNote, setEditNote] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewPlanet, setPreviewPlanet] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const starSystemData = await getStarSystem(id);
      setStarSystem(starSystemData);
      const planets = await getAllPlanets(id);
    setStarSystem(prevState => ({  //Update state with fetched planets
      ...prevState,
      planets: planets
    }));
    setLoading(false);
    }
    fetchData();
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
  setUploading(true);
  const fileReaders = Array.from(selectedFiles).map((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  });
  const base64EncodedImages = await Promise.all(fileReaders);
  try {
    const updatedPlanet = await addImagesToPlanet(previewPlanet._id, {
      images: base64EncodedImages,
    });
    setPreviewPlanet(updatedPlanet);
    setStarSystem((prevState) => ({
      ...prevState,
      planets: prevState.planets.map((planet) => {
        if (planet._id === previewPlanet._id) {
          return updatedPlanet;
        }
        return planet;
      }),
    }));
    setSelectedFiles([]);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage("You need to log in to access this feature");
      setLoginRedirect(true);
    } else {
      console.error(error);
    }
  } finally {
    setUploading(false);
  }
};

const handleFileInputChange = (event) => {
  const files = event.target.files;
  setSelectedFiles(files);
};


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
        <form className="add-planet-button" onSubmit={handleAddPlanet}>
          <input
            type="text"
            value={newPlanetName}
            onChange={(event) => setNewPlanetName(event.target.value)}
            placeholder="New planet name"
          />
          <button type="submit">Add Planet</button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="inner-container">
              {starSystem.planets.map((planet) => (
                <div key={planet._id} className="planet-div">
                  <p
                    onClick={() =>
                      setPreviewPlanet(
                        previewPlanet && previewPlanet._id === planet._id ? null : planet
                      )
                    }
                    className={previewPlanet && previewPlanet._id === planet._id ? "open" : ""}
                  >
                    {planet.name}
                  </p>
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
                {/* add image */}
                <form onSubmit={handleAddImages}>
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={handleFileInputChange}
                    />
                    <button type="submit">Upload Images</button>
                </form>
                <div className="note-container">
                <h4>Notes</h4>

                  {!editNote ? (
                    <>
                      <pre>{previewPlanet.note}</pre>
                      <button
                        className="edit-button"
                        onClick={() => setEditNote(true)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleUpdateNote(
                            previewPlanet._id,
                            event.target.note.value
                          );
                          setEditNote(false);
                        }}
                      >
                        <textarea
                          name="note"
                          defaultValue={previewPlanet.note}
                        ></textarea>
                        <button className="save-button" type="submit">
                          Save
                        </button>
                      </form>
                    </>
                  )}
                </div>
                
                <div className="image-container">
                {previewPlanet.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.url} alt={`Image ${index + 1}`} />
                  <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
                </div>
                  ))}
                </div>
                
                {uploading && <div>Uploading...</div>}
  
                <button onClick={() => handleDeletePlanet(previewPlanet._id)}>
                  Delete Planet
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
