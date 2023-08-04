import { ContentTitleBar } from "../components/ContentTitleBar"
import { getAllImages } from '../services/planetService';
import React, { useState, useEffect } from 'react';
import { image } from 'cloudinary-react'


export function GalleryPage(){
    const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const images = await getAllImages();
      setImages(images);
      console.log(images);
    }
    fetchImages();
  }, []);

    return(
        <div> 
            <div className="content-box">
                <ContentTitleBar title="Gallery" />
                <div className="image-filter-button">
                    <p>filter buttons</p>
                </div>
                <div className="gallery-image-container">
                {images.map(image => (
                    <img key={image} src={image} alt="Planet" />
                ))}
                </div>
            </div>
        </div>
    )
}