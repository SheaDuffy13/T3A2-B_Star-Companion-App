import { ContentTitleBar } from '../components/ContentTitleBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function GalaxyHomePage(){
    // const [starSystems, setStarSystems] = useState([]);

    // useEffect(() => {
    //     fetch('/api/star-systems')
    //       .then(response => response.json())
    //       .then(data => setStarSystems(data))
    //       .catch(error => console.error(error));
    //   }, []);


    return(
        <div> 
            <div className="content-box">
            <ContentTitleBar title="Star System" />
            {/* <ul>
                {starSystems.map(starSystem => (
                    <li key={starSystem._id}>
                    <Link to={`/star-system/${starSystem._id}`}>{starSystem.name}</Link>
                    </li>
                ))}
            </ul> */}
            </div>
        </div>
    )
}