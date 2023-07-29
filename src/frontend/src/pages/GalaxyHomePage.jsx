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
            <div className="content-box">
                <ContentTitleBar title="Star System" />
                {console.log(starSystems)}
                <ul>
                    {starSystems.map(starSystem => (
                        <li key={starSystem._id}>
                            <Link to={`/starSystem/${starSystem._id}`}>{starSystem.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}