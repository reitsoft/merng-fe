import React from "react";
import { Popup } from "semantic-ui-react";

const CustomPopup = ({ content, children }) => {
  return (
    <Popup
      inverted
      mouseEnterDelay={1000}
      content={content}
      trigger={children}
    />
  );
};

export default CustomPopup;
