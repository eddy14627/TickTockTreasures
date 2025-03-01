import { FaCircleNotch } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      {/* Rotating Icon with Glow */}
      <FaCircleNotch className="spinner-icon" />

      {/* Animated Gradient Loading Text */}
      <p className="loading-text">Loading...</p>

      {/* Expanding Rings Effect */}
      <div className="ring-container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>

      {/* Styling */}
      <style>
        {`
          .loader-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          /* Spinning Icon */
          .spinner-icon {
            font-size: 80px;
            color: #ff6600;
            animation: rotate 1s linear infinite;
            filter: drop-shadow(0 0 5px #ff6600);
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Shimmering Loading Text */
          .loading-text {
            font-size: 20px;
            font-weight: bold;
            margin-top: 10px;
            background: linear-gradient(90deg, #ff6600, #ff3300, #ff6600);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2s infinite alternate;
          }

          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          /* Expanding Rings */
          .ring-container {
            position: relative;
            width: 70px;
            height: 70px;
            margin-top: 10px;
          }

          .ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgba(255, 102, 0, 0.5);
            animation: pulseRing 1.5s infinite ease-in-out;
          }

          .ring:nth-child(2) {
            animation-delay: 0.3s;
          }

          .ring:nth-child(3) {
            animation-delay: 0.6s;
          }

          @keyframes pulseRing {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
