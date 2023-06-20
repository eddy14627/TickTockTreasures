import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const RangeSliderWithDifferentStyle = ({ reset = false, resetfun }) => {
  const [values, setValues] = useState([0, 40000]);
  const appliedFilters = useSelector((state) => state.appliedFilters);
  const dispatch = useDispatch();

  const handleChange = (newValues) => {
    setValues(newValues);
    dispatch(setfilters({ price: newValues }));
  };

  useEffect(() => {
    setValues([0, 40000]);
    dispatch(setfilters({ price: [0, 40000] }));
    resetfun(false);
  }, [reset]);

  useEffect(() => {
    dispatch(setfilters({ price: values }));
  }, [values, dispatch]);

  useEffect(() => {
    const price = appliedFilters.find((obj) => obj.hasOwnProperty("price"))
      ?.price || [0, 40000];
    setValues(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>
      <Range
        values={values}
        min={0}
        max={40000}
        step={100}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              borderRadius: "10px",
              background: "#ddd",
              display: "flex",
              alignItems: "center",
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
              height: "40px",
              width: "20px",
              backgroundColor: index === 0 ? "#4287f5" : "#f54242",
              borderRadius: "5px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              outline: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab",
              border: "2px solid #fff",
            }}
          />
        )}
        renderRail={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "10px",
              borderRadius: "5px",
              background: "#ccc",
            }}
          />
        )}
      />
    </div>
  );
};

export default RangeSliderWithDifferentStyle;
