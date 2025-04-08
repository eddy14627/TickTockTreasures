import React from "react";
import { Carousel } from "react-bootstrap";

const VideoCarousel = () => {
  const videos = [
    {
      id: 1,
      src: "/videos/1.mp4", // Replace with actual video URLs
      title: "Plein Sports",
      description: "Exclusive collection of sports watches.",
    },
    {
      id: 2,
      src: "/videos/2.mp4", // Replace with actual video URLs
      title: "Timex",
      description: "Timeless designs for every occasion.",
    },
    {
      id: 3,
      src: "/videos/3.mp4", // Replace with actual video URLs
      title: "Guess",
      description: "Luxury and style in every detail.",
    },
    {
      id: 4,
      src: "/videos/5.mp4", // Replace with actual video URLs
      title: "Daniel Wellington",
      description: "Elegant watches for modern lifestyles.",
    },
  ];

  return (
    <Carousel
      pause="hover"
      className="video-carousel mb-4"
      interval={5000}
      fade
    >
      {videos.map((video) => (
        <Carousel.Item key={video.id}>
          {/* Video Container */}
          <div className="carousel-video-container">
            <video
              src={video.src}
              className="carousel-video"
              autoPlay
              muted
              loop
            />
          </div>

          {/* Overlay Content */}
          <Carousel.Caption className="carousel-caption-container">
            <h2 className="carousel-video-title">{video.title}</h2>
            <p className="carousel-video-description">{video.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default VideoCarousel;
