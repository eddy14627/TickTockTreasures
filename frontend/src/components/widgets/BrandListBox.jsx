import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useGetAvailableBrandNameQuery } from "../../slices/filterApiSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const CheckboxGroup = () => {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.appliedFilters);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const options = [];
  const { data } = useGetAvailableBrandNameQuery();

  if (data) {
    for (let i = 0; i < data.brandNameList.length; i++) {
      options.push({ id: i, label: data.brandNameList[i] });
    }
  }

  useEffect(() => {
    const brand =
      appliedFilters.find((obj) => obj.hasOwnProperty("brand"))?.brand || [];

    const selectedbrandIds = brand.map((selectedLabel) => {
      const option = options.find((opt) => opt.label === selectedLabel);
      return option ? option.id : null;
    });

    setSelectedCheckboxes(selectedbrandIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, options]);

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
    const selectedBrands = selectedCheckboxes.map((id) => options[id]?.label);
    const currentSelectedBrands =
      appliedFilters.find((obj) => obj.hasOwnProperty("brand"))?.brand || [];

    if (
      JSON.stringify(selectedBrands) !== JSON.stringify(currentSelectedBrands)
    ) {
      dispatch(setfilters({ brand: selectedBrands }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCheckboxes, appliedFilters, dispatch, options]);

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
