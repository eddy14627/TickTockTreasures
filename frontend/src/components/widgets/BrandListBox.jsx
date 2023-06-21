import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = ({ options }) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.appliedFilters);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    const brand =
      appliedFilters.find((obj) => obj.hasOwnProperty("brand"))?.brand || [];

    const selectedbrandIds = brand.map((selectedLabel) => {
      const option = options.find((opt) => opt.label === selectedLabel);
      return option ? option.id : null;
    });

    setSelectedCheckboxes(selectedbrandIds.filter((id) => id !== null));
  }, [options]);

  const handleCheckboxChange = (optionId) => {
    const isChecked = selectedCheckboxes.includes(optionId);

    if (isChecked) {
      setSelectedCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((id) => id !== optionId)
      );
    } else {
      setSelectedCheckboxes((prevCheckboxes) => [...prevCheckboxes, optionId]);
    }
  };

  useEffect(() => {
    const selectedBrands = selectedCheckboxes.map(
      (id) => options[id]?.label || ""
    );

    dispatch(setfilters({ brand: selectedBrands }));
  }, [selectedCheckboxes, dispatch, options]);

  return (
    <div>
      {options.map((option, id) => (
        <Form.Check
          key={option.id}
          type="checkbox"
          label={option.label}
          checked={selectedCheckboxes.includes(option.id)}
          onChange={() => handleCheckboxChange(option.id)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
