import React from "react";

const Viewport = ({ history }) => {
    console.log(history)
    return (
        <>
            <div className="viewport-container">
               { history.map((e, k) => {
                if(e === "") return;
                return (
                    <>
                        <div key={k}>{e}</div>
                    </>
                )
               }) }
            </div>
        </>
      )
}

export default Viewport;