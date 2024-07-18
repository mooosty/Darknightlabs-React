import React, { useState } from "react";
import "./AddSynergy.css";
import { useSynContext } from "../../context/context";

export default function AddSynergy({ setAddSynergy }) {
  const [synergyName, setSynergyName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const { addSynergy } = useSynContext();

  const handleAddSynergy = (event) => {
    event.preventDefault();
    addSynergy({ synergyName, image, price });
    setAddSynergy(false);
  }

  return (
    <div className="add-synergy-container">
      <div className="add-synergy-header">
        <h1>Add New Synergy</h1>
        <button className="close-btn" onClick={() => setAddSynergy(false)}>
          X
        </button>
      </div>
      <form className="add-synergy-form">
        <input
          id="synergyName"
          className="add-synergy-form-input"
          value={synergyName}
          type="text"
          required
          placeholder="Synergy Name"
          onChange={(event) => setSynergyName(event.target.value)}
        />
        <div className="add-synergy-img-input"
          onChange={(event) => setImage(event.target.files[0])}
        >
          <label htmlFor="image">Add Image</label>
          <input id="image" type="file" required />
        </div>
        <input
          id="price"
          type="number"
          required
          className="add-synergy-form-input"
          placeholder="Synergy Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit" className="add-synergy-btn"
          onClick={handleAddSynergy}
        >
          Add Synergy
        </button>
      </form>
    </div>
  );
}
