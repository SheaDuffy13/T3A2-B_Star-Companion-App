import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlanet, updatePlanet } from '../services/planetService';
import { ContentTitleBar } from '../components/ContentTitleBar';

export function PlanetPage({ match }) {
  const [planet, setPlanet] = useState(null);
  const [editNote, setEditNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newImage, setNewImage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getPlanet(id)
        .then(planet => {
          setPlanet(planet);
          setNewNote(planet.note);
        });
  }, [id]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  // handleEditNote---------------------------------------------------
  const handleEditNote = async (event) => {
    event.preventDefault();
    await updatePlanet(id, { note: newNote });
    setPlanet(prevState => ({ ...prevState, note: newNote }));
    setEditNote(false);
  };

  // handleAddImage---------------------------------------------------
  const handleAddImage = async (event) => {
    event.preventDefault();
    if (newImage) {
      await updatePlanet(id, { $push: { images: { url: newImage } } });
      setPlanet(prevState => ({
        ...prevState,
        images: [...prevState.images, { url: newImage }]
      }));
      setNewImage('');
    }
  };

  // handleDeleteImage---------------------------------------------------
  const handleDeleteImage = async (imageUrl) => {
    await updatePlanet(id, { $pull: { images: { url: imageUrl } } });
    setPlanet(prevState => ({
      ...prevState,
      images: prevState.images.filter(image => image.url !== imageUrl)
    }));
  };
  
  // ----------------------------------------------------------------------

  return (
    <div>
        <div className="content-box">
            <ContentTitleBar title={planet.name} />
            <ul>
                {planet.images.map((image, index) => (
                    <li key={index}>
                        <img src={image.url} alt={`Planet ${index + 1}`} />
                        <button onClick={() => handleDeleteImage(image.url)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddImage}>
                <input
                    type="text"
                    value={newImage}
                    onChange={event => setNewImage(event.target.value)}
                    placeholder="New image URL"
                />
                <button type="submit">Add Image</button>
            </form>
            <h2>Note</h2>
            {!editNote ? (
                <>
                    <p>{planet.note}</p>
                    <button onClick={() => setEditNote(true)}>Edit</button>
                </>
            ) : (
                <form onSubmit={handleEditNote}>
                    <textarea
                        value={newNote}
                        onChange={event => setNewNote(event.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    </div>
  );
}



// ------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ContentTitleBar } from '../components/ContentTitleBar';
// import {
//   getAllPlanets,
//   createPlanet,
//   updatePlanet,
//   removePlanet,
//   addImage,
//   updateImage,
//   deleteImage,
//   addNote,
//   updateNote,
//   deleteNote,
// } from '../services/planetService';

// export function PlanetPage({ match }) {
//   const [planet, setPlanet] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     getAllPlanets()
//       .then(planets => setPlanet(planets.find(planet => planet._id === id)));
//   }, [id]);

//   if (!planet) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//         <div className="content-box">
//             <ContentTitleBar title={planet.name} />
//             <ul>
//                 {planet.images.map(image => (
//                     <li key={image._id}>
//                         <img src={image.url} alt={image.caption} />
//                     </li>
//                 ))}
//             </ul>
//             <ul>
//                 {planet.notes.map(note => (
//                 <li key={note._id}>{note.text}</li>
//                 ))}
//             </ul>
//         </div>
//     </div>
//   );
// }
