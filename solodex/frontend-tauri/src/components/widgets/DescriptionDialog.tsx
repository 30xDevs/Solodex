import React, { useState } from 'react';

interface NewDialogProps {
  onClose: (data: any) => void;
}

const NewDialog: React.FC<NewDialogProps> = ({ onClose }) => {
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onClose({ description });
  };

  return (
    <div className="new-dialog">
      <h2>Enter Description</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onClose(null)}>Cancel</button>
    </div>
  );
};

export default NewDialog;