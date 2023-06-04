import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = () => {
  const dispatch = useDispatch();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedWatchType, setSelectedWatchType] = useState([]);

  const options = [
    { id: 1, label: "smart" },
    { id: 2, label: "casual" },
    { id: 3, label: "luxuary" },
  ];

  const handleCheckboxChange = (optionId) => {
    const isChecked = selectedCheckboxes.includes(optionId);

    if (isChecked) {
      setSelectedWatchType(
        selectedWatchType.filter((wt) => wt !== options[optionId - 1].label)
      );
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== optionId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, optionId]);
      setSelectedWatchType([...selectedWatchType, options[optionId - 1].label]);
    }
  };

  useEffect(() => {
    dispatch(setfilters({ watchType: selectedWatchType }));
  }, [selectedWatchType]);

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
