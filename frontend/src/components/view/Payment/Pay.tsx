import React from "react";
import axios from "axios";

const Pay: React.FC = () => {
  const pay = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/bkash/create",
      {
        amount: "60",
      }
    );
    window.location.href = data.bkashURL;
  };
  return (
    <div>
      <button onClick={pay}>Pay with bkash</button>
    </div>
  );
};

export default Pay;
