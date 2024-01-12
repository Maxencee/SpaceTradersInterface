import React from "react";

const GridContent = ({ contents }) => {
    console.log(contents);
    return (
        <>
            <div className="grid-container">
                <div className="fields-container">
                {
                    contents.fields.map((field, k) => {
                        return (<div key={k} className="field-container">{field}</div>)
                    })
                } 
                </div>
                <div className="rows-container">
                {
                    contents.rows.map((row, k) => {
                        return (<div key={k} className="row-container">{row}</div>)
                    })
                }
                </div>
            </div>
        </>
      )
}

export default GridContent;