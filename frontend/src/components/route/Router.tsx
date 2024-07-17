import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pay from "../view/Payment/Pay";
import Error from "../view/Payment/Error";
import Success from "../view/Payment/Success";

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/pay" element={<Pay />}></Route>
          <Route path="/error" element={<Error />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
