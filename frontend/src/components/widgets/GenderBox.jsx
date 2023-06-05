import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.appliedFilters);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const options = [
    { id: 1, label: "male" },
    { id: 2, label: "female" },
    { id: 3, label: "unisex" },
    { id: 4, label: "clock" },
  ];

  useEffect(() => {
    const gender = appliedFilters.gender || [];
    setSelectedCheckboxes(gender);
  }, [appliedFilters.gender]);

  const handleCheckboxChange = (optionId) => {
    const isChecked = selectedCheckboxes.includes(optionId);
    let updatedCheckboxes;

    if (isChecked) {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== optionId);
    } else {
      updatedCheckboxes = [...selectedCheckboxes, optionId];
    }

    setSelectedCheckboxes(updatedCheckboxes);
    const selectedGender = options
      .filter((option) => updatedCheckboxes.includes(option.id))
      .map((option) => option.label);

    dispatch(setfilters({ gender: selectedGender }));
  };

  return (
    <div>
      {options.map((option) => (
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
