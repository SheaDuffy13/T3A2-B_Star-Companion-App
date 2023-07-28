import { ContentTitleBar } from "../components/ContentTitleBar"

export function GalleryPage(){

    return(
        <div> 
            <div className="content-box">
                <ContentTitleBar title="Gallery" />
                <div className="image-filter-button">
                    <p>filter buttons</p>
                </div>
                <div className="gallery-image-container">
                    <div style={{width:'15vw', height:'15vh', backgroundColor:'red'}}></div>
                    <div style={{width:'15vw', height:'15vh', backgroundColor:'red'}}></div>
                </div>
            </div>
        </div>
    )
}