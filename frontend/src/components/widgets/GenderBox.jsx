import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = () => {
  const dispatch = useDispatch();
  const Gen = useSelector((state) => state.appliedFilters.gender);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    (Gen &&
      Gen.map((gen) => {
        if (gen === "male") return 1;
        else if (gen === "female") return 2;
        else if (gen === "unisex") return 3;
        else return 4;
      })) ||
      []
  );
  const [selectedGender, setSelectedGender] = useState(Gen || []);
  const options = [
    { id: 1, label: "male" },
    { id: 2, label: "female" },
    { id: 3, label: "unisex" },
    { id: 4, label: "clock" },
  ];

  const handleCheckboxChange = (optionId) => {
    const isChecked = selectedCheckboxes.includes(optionId);

    if (isChecked) {
      setSelectedGender(
        selectedGender.filter((gen) => gen !== options[optionId - 1].label)
      );
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== optionId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, optionId]);
      setSelectedGender([...selectedGender, options[optionId - 1].label]);
    }
  };

  useEffect(() => {
    dispatch(setfilters({ gender: selectedGender }));
  }, [selectedGender]);

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
