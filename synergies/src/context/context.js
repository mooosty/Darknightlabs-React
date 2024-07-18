import React, { createContext, useState, useContext } from "react";
import data from "../data/data.json";

// Create the context
const synCtx = createContext();

// Create a provider component
const SynProvider = ({ children }) => {
  const [dbData, setDBData] = useState(data);


  

  // add synergy function
  const addSynergy = (synergy) => {
    // we receive the beginning of a synergy which is the name, image, and price. We need to autofill some information
    // The synergy.creator is going to be extracted from dbData.user.username
    // the date is going to be the current date in the format of "MM/DD/YYYY"

    const newSynergy = {
      ...synergy,
      key: dbData.synergies.length + 1,
      creator: dbData.user.username,
      date: new Date().toLocaleDateString(),
      angels: ["angel1", "angel2", "angel3"],
    };
    setDBData({
      ...dbData,
      synergies: [...dbData.synergies, newSynergy],
    }); 
    console.log(dbData.synergies)
  };

  const removeSynergy = (id) => {
    // we need to remove the synergy from the list of synergies we will do this based off the id provided from the synergy
    const newSynergies = dbData.synergies.filter((synergy) => synergy.key !== id);
    setDBData({
      ...dbData,
      synergies: newSynergies,
    });
  }

  const updateSynergy = (id, synergy) => {
    // we need to update the synergy from the list of synergies we will do this based off the id provided from the synergy. The id will remain the same but we're going to receive the new synergy object which could have different names, prices, etc
    const newSynergies = dbData.synergies.map((syn) => {
      if (syn.key === id) {
        return synergy;
      }
      return syn;
    });

    setDBData({
      ...dbData,
      synergies: newSynergies,
    });
  }


  return (
    <synCtx.Provider value={{ dbData, setDBData, addSynergy, removeSynergy, updateSynergy }}>
      {children}
    </synCtx.Provider>
  );
};

// Custom hook to use the context
const useSynContext = () => useContext(synCtx);

export { synCtx, SynProvider, useSynContext };
