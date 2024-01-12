import React from "react";

const ReturnContent = ({ content, type }) => {
    const styles = {
        error: { backgroundColor: "#ff4f4f" },
        info: { backgroundColor: "#57a0ff" },
        success: { backgroundColor: "#339e3f" },
        warn: { backgroundColor: "#d68c15" },
    }

    return (
        <span className="return-content" style={styles[type] ?? ""}>{content}</span>
      )
}

export default ReturnContent;