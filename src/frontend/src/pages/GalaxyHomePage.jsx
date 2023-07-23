import { ContentTitleBar } from '../components/ContentTitleBar';

export function GalaxyHomePage(){


    return(
        <div> 
            <div className="content-box">
            <ContentTitleBar title="Star System" />
            {/* <div className="content-box-title">
                <button onClick={handleButtonClick}>Go to Gallery</button>
                <p>Galaxy</p>
                <p>Search bar</p>
            </div> */}
            </div>
        </div>
    )
}