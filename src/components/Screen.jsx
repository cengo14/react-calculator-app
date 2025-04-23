import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import { Textfit } from "react-textfit";

const Screen = () => {
  const { calc } = useContext(CalcContext);
  return (
    <div className="screen-container">
      <Textfit className="screen" max={70} mode="single">
        {calc.num ? calc.num : calc.res}
      </Textfit>
    </div>
  );
};

export default Screen;
