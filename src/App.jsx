import React from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/buttonBox";
import Button from "./components/Button";
import CalcProvider from "./context/CalcContext";

const App = () => {
  const btnValues = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  return (
    <CalcProvider>
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button btn={btn} key={i} />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
};

export default App;
