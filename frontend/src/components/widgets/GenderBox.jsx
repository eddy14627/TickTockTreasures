import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = ({ reset = false, resetfun }) => {
  // console.log(reset);
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.appliedFilters);
  // console.log(appliedFilters[0].gender);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const options = [
    { id: 1, label: "male" },
    { id: 2, label: "female" },
    { id: 3, label: "unisex" },
    { id: 4, label: "clock" },
  ];

  useEffect(() => {
    if (reset) {
      setSelectedCheckboxes([]);
      dispatch(setfilters({ gender: [] }));
      resetfun(false);
    }
  }, [reset]);

  useEffect(() => {
    const gender =
      appliedFilters.find((obj) => obj.hasOwnProperty("gender"))?.gender || [];

    const selectedGenderIds = gender.map((selectedLabel) => {
      const option = options.find((opt) => opt.label === selectedLabel);
      return option ? option.id : null;
    });

    setSelectedCheckboxes(selectedGenderIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
