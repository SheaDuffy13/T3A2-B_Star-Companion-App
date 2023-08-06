import { ContentTitleBar } from "../components/ContentTitleBar"
// import { getAllImages } from '../services/planetService';
import React from 'react';
// import { image } from 'cloudinary-react'


export function GalleryPage(){

    return(
        <div> 
            <div className="content-box">
                <ContentTitleBar title="Gallery" />

                <div className="gallery-image-container">
                
                </div>
            </div>
        </div>
    )
}