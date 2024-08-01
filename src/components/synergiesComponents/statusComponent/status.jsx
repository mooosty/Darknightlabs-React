import React from "react";

function Status({ status, color }) {
  return (
    <div>
      <h1 className={`${color} flex justify-center text-white text-xs font-inter bg-gradient-to-r w-[63px] h-[23px] px-2 py-1 rounded-bl-[10px] rounded-tr-[10px]`}>
        {status}
      </h1>
  </div>
  );
}

export default Status;
