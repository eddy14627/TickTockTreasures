import React, { useState } from "react";
import { Range } from "react-range";
import { useDispatch } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const RangeSliderWithTwoPointers = () => {
  const [values, setValues] = useState([0, 40000]);
  const dispatch = useDispatch();

  const handleChange = (newValues) => {
    setValues(newValues);
    dispatch(setfilters({ price: newValues }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
      <Range
        values={values}
        min={0}
        max={40000}
        step={1}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              background: "#ddd",
              borderRadius: "3px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#4287f5", // Set the marker color to blue
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
              outline: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab",
              border: "2px solid #fff",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RangeSliderWithTwoPointers;
