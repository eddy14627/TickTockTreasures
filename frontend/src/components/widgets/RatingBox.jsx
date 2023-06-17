import React from "react";
import { MdStar, MdStarBorder } from "react-icons/md";
import "../../utils/extra_css.css";

const RatingFilter = ({ value = [1], onChange = true }) => {
  const handleCheckboxChange = (event) => {
    const rating = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (onChange) {
      if (isChecked) {
        onChange([...value, rating]);
      } else {
        onChange(value.filter((selectedRating) => selectedRating !== rating));
      }
    }
  };

  const handleClick = (rating) => {
    if (onChange) {
      const isChecked = value.includes(rating);
      if (isChecked) {
        onChange(value.filter((selectedRating) => selectedRating !== rating));
      } else {
        onChange([...value, rating]);
      }
    }
  };

  return (
    <div className="rating-filter">
      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            value="1"
            checked={value.includes(1)}
            onChange={handleCheckboxChange}
          />
          1 star
        </label>
        <label>
          <input
            type="checkbox"
            value="2"
            checked={value.includes(2)}
            onChange={handleCheckboxChange}
          />
          2 stars
        </label>
        <label>
          <input
            type="checkbox"
            value="3"
            checked={value.includes(3)}
            onChange={handleCheckboxChange}
          />
          3 stars
        </label>
        <label>
          <input
            type="checkbox"
            value="4"
            checked={value.includes(4)}
            onChange={handleCheckboxChange}
          />
          4 stars
        </label>
        <label>
          <input
            type="checkbox"
            value="5"
            checked={value.includes(5)}
            onChange={handleCheckboxChange}
          />
          5 stars
        </label>
      </div>
      <div className="stars">
        <span
          className={`star ${value.includes(1) ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          {value.includes(1) ? (
            <MdStar className="active-star" />
          ) : (
            <MdStarBorder className="inactive-star" />
          )}
        </span>
        <span
          className={`star ${value.includes(2) ? "active" : ""}`}
          onClick={() => handleClick(2)}
        >
          {value.includes(2) ? (
            <MdStar className="active-star" />
          ) : (
            <MdStarBorder className="inactive-star" />
          )}
        </span>
        <span
          className={`star ${value.includes(3) ? "active" : ""}`}
          onClick={() => handleClick(3)}
        >
          {value.includes(3) ? (
            <MdStar className="active-star" />
          ) : (
            <MdStarBorder className="inactive-star" />
          )}
        </span>
        <span
          className={`star ${value.includes(4) ? "active" : ""}`}
          onClick={() => handleClick(4)}
        >
          {value.includes(4) ? (
            <MdStar className="active-star" />
          ) : (
            <MdStarBorder className="inactive-star" />
          )}
        </span>
        <span
          className={`star ${value.includes(5) ? "active" : ""}`}
          onClick={() => handleClick(5)}
        >
          {value.includes(5) ? (
            <MdStar className="active-star" />
          ) : (
            <MdStarBorder className="inactive-star" />
          )}
        </span>
      </div>
    </div>
  );
};

export default RatingFilter;
