/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./Breadcrum.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME
      <MdOutlineArrowForwardIos /> SHOP <MdOutlineArrowForwardIos />{" "}
      {product.category} <MdOutlineArrowForwardIos /> {product.name}
    </div>
  );
};

export default Breadcrum;
