import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { TOGGLE } from "./UIReducer";

const Toggle = ({ toggleSwitch }) => {
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{ui.toggle?"true":null}</div>
      <input
        type="checkbox"
        value={ui.toggle}
        onChange={() => dispatch({ type: TOGGLE })}
      />
    </div>
  );
};

export default Toggle;
