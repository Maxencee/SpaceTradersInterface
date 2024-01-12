import React, { useState } from "react";

const HiddenContent = ({ content }) => {
    let [visible, setVisible] = useState(false)
    return (
        <span className="hidden-content" style={{ color: visible ? "#fff" : "#2b2b2b" }} onClick={() => setVisible(!visible)}>{content}</span>
      )
}

export default HiddenContent;