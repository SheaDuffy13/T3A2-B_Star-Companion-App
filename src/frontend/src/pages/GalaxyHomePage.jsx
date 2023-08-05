import { ContentTitleBar } from '../components/ContentTitleBar';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAllStarSystems } from '../services/starSystemService';

export function GalaxyHomePage(){
    const [starSystems, setStarSystems] = useState([]);
    const [starError, setStarError] = useState(null);

    // render the list of star systems
    useEffect(() => {
        getAllStarSystems()
        .then(data => setStarSystems(data))
        .catch(error => console.error(error))
        // .catch(error => setStarError(error));
      }, []);
      if (starError) {
        // render an error message to user
      }


    return(
        <div> 
            <div className="outer-display-box">
                <ContentTitleBar title="Star Systems" />
                <div className="inner-container">
                    {starSystems.map(starSystem => (
                        <div key={starSystem._id} className="star-system">
                            <Link to={`/starSystem/${starSystem._id}`}>{starSystem.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}