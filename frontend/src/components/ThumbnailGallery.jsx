import React from "react";
import { Image, Button } from "react-bootstrap";

const ThumbnailGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Thumbnails */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "10px",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              width: "60px",
              height: "60px",
              marginBottom: "20px",
              border:
                currentImageIndex === index
                  ? "2px solid #000"
                  : "1px solid #ccc",
              cursor: "pointer",
            }}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div style={{ flexGrow: 1 }}>
        <Image src={images[currentImageIndex]} alt="Main Product" fluid />
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <Button variant="light">
            <i className="fas fa-expand-alt"></i>
          </Button>
          <Button variant="light">
            <i className="fas fa-share-alt"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailGallery;
