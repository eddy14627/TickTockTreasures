import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetFilters } from "../slices/filterSlice";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      /* The trim() method is a built-in JavaScript string
      method that removes whitespace characters from both ends
      of a string. */
      dispatch(resetFilters());
      navigate(`/shop/search/${keyword.trim()}`);
      setKeyword("");
      // setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <div style={{ flex: "auto" }}>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Products..."
          style={{ width: "100%" }}
        ></Form.Control>
      </div>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
