import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setfilters } from "../../slices/filterSlice";

const Rating = ({ reset = false, resetfun }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);
  const appliedFilters = useSelector((state) => state.appliedFilters);
  //   console.log(appliedFilters);

  const handleCheckboxChange = (rating) => {
    setValues((prevValues) => {
      if (prevValues.includes(rating)) {
        return prevValues.filter((value) => value !== rating);
      } else {
        return [...prevValues, rating];
      }
    });
    console.log(values);
  };

  useEffect(() => {
    setValues([]);
    dispatch(setfilters({ rating: [] }));
    resetfun(false);
  }, [reset]);

  useEffect(() => {
    dispatch(setfilters({ rating: values }));
  }, [values, dispatch]);

  // ...

  useEffect(() => {
    const reqRating =
      appliedFilters.find((obj) => obj.hasOwnProperty("rating"))?.rating || [];
    console.log(reqRating);
    setValues(reqRating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const StarIcon = i <= count ? FaStar : FaRegStar;
      stars.push(<StarIcon key={i} />);
    }
    return stars;
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <>
      {ratings.map((rating) => (
        <Form.Check
          key={rating}
          type="checkbox"
          id={`rating${rating}`}
          label={renderStars(rating)}
          checked={values.includes(rating)}
          onChange={() => handleCheckboxChange(rating)}
        />
      ))}
    </>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
