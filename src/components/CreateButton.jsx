import React from "react";
import { Link } from "react-router-dom";
import pencil from "../images/pencil.svg";

const CreateButton = ({ to }) => (
  <div className="sticky bottom-4 flex justify-end items-center mx-4">
    <Link to={to}>
      <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
        <img className="w-5 h-5" src={pencil} alt="write-post-button" />
      </div>
    </Link>
  </div>
);

export default CreateButton;
