import React from 'react';
import pencil from '../images/pencil.svg';

const CreateButton = ({ handleCreateMode }) => (
  <div
    className="sticky bottom-4 flex justify-end items-center mx-2"
    onClick={handleCreateMode}
  >
    <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
      <img className="w-5 h-5" src={pencil} alt="write-post-button" />
    </div>
  </div>
);

export default CreateButton;
