import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useGetAvailableBrandNameQuery } from "../../slices/filterApiSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = () => {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const options = [];
  const { data } = useGetAvailableBrandNameQuery();
  if (data) {
    for (let i = 0; i < data.brandNameList.length; i++) {
      options.push({ id: i, label: data.brandNameList[i] });
    }
  }

  const handleCheckboxChange = (optionId) => {
    const isChecked = selectedCheckboxes.includes(optionId);

    if (isChecked) {
      setSelectedBrands(
        selectedBrands.filter((wt) => wt !== options[optionId].label)
      );
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== optionId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, optionId]);
      setSelectedBrands([...selectedBrands, options[optionId].label]);
    }
  };

  useEffect(() => {
    dispatch(setfilters({ Brands: selectedBrands }));
  }, [selectedBrands]);
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
