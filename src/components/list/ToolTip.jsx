import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const ToolTip = ({ content, children }) => {
  return (
    <Tippy content={content} arrow={true}>
      {children}
    </Tippy>
  );
};
export default ToolTip;
