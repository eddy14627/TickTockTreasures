import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = ({ reset = false, resetfun }) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.appliedFilters);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const options = [
    { id: 1, label: "lux" },
    { id: 2, label: "smart" },
    { id: 3, label: "casual" },
    { id: 4, label: "sports" },
  ];

  useEffect(() => {
    setSelectedCheckboxes([]);
    dispatch(setfilters({ watchType: [] }));
    resetfun(false);
  }, [reset]);

  useEffect(() => {
    const watchType =
      appliedFilters.find((obj) => obj.hasOwnProperty("watchType"))
        ?.watchType || [];

    const selectedwatchTypeIds = watchType.map((selectedLabel) => {
      const option = options.find((opt) => opt.label === selectedLabel);
      return option ? option.id : null;
    });

    setSelectedCheckboxes(selectedwatchTypeIds);
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
    const selectedwatchType = options
      .filter((option) => updatedCheckboxes.includes(option.id))
      .map((option) => option.label);

    dispatch(setfilters({ watchType: selectedwatchType }));
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
