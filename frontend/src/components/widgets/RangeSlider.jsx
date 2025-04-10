import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const RangeSliderWithDifferentStyle = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState([0, 20000]);
  const appliedFilters = useSelector((state) => state.appliedFilters);

  useEffect(() => {
    const price = appliedFilters.find((obj) => obj.hasOwnProperty("price"))
      ?.price || [0, 20000];
    setValues(price);
  }, [appliedFilters]);

  const handleChange = (newValues) => {
    setValues(newValues);
    dispatch(setfilters({ price: newValues }));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Price Display */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        <span>₹{values[0].toLocaleString()}</span>
        <span>₹{values[1].toLocaleString()}</span>
      </div>

      {/* Range Slider */}
      <Range
        values={values}
        min={0}
        max={20000}
        step={100}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "8px",
              width: "100%",
              borderRadius: "50px",
              background: `linear-gradient(
                to right,
                #ff9a9e ${(values[0] / 20000) * 100}%,
                #fad0c4 ${(values[0] / 20000) * 100}%,
                #fad0c4 ${(values[1] / 20000) * 100}%,
                #ff9a9e ${(values[1] / 20000) * 100}%
              )`,
              position: "relative",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "28px",
              width: "28px",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              border: "3px solid #ff9a9e",
              boxShadow: "0px 4px 10px rgba(255, 154, 158, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ff9a9e",
              }}
            ></span>
          </div>
        )}
      />

      {/* Style for hover and interaction */}
      <style>{`
        .thumb-hover:hover {
          transform: scale(1.1);
          box-shadow: 0px 6px 12px rgba(255, 154, 158, 0.7);
        }
      `}</style>
    </div>
  );
};

export default RangeSliderWithDifferentStyle;
