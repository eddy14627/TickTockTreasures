import React, { useState } from "react";
import { Range } from "react-range";
import { useDispatch } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const RangeSliderWithTwoPointers = () => {
  const [values, setValues] = useState([0, 40000]);
  const dispatch = useDispatch();
  const handleChange = (newValues) => {
    setValues(newValues);
    dispatch(setfilters({ price: values }));
  };

  return (
    <div>
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
              height: "16px",
              width: "16px",
              backgroundColor: "grey", // Set the marker color to grey
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
              outline: "none",
            }}
          />
        )}
      />
    </div>
  );
};

export default RangeSliderWithTwoPointers;
