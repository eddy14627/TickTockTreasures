import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const RangeSliderWithTwoPointers = () => {
  const [values, setValues] = useState([0, 40000]);
  const appliedFilters = useSelector((state) => state.appliedFilters);
  const dispatch = useDispatch();

  const handleChange = (newValues) => {
    setValues(newValues);
    dispatch(setfilters({ price: newValues }));
  };

  useEffect(() => {
    dispatch(setfilters({ price: values }));
  }, [values, dispatch]);

  useEffect(() => {
    const price = appliedFilters.find((obj) => obj.hasOwnProperty("price"))
      ?.price || [0, 40000];
    setValues(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span>&#8377;{values[0]}</span>
        <span>&#8377;{values[1]}</span>
      </div>
      <Range
        values={values}
        min={0}
        max={40000}
        step={50}
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
              backgroundColor: "#4287f5",
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
