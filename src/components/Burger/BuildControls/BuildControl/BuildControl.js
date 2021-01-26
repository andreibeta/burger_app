import React from 'react';
const buildControl = (props) => (
    <div className="BuildControl">
        <div className="BuildControl__Label">{props.label}</div>
        <button 
        className="BuildControl__Less" 
        onClick={props.removed}
        disabled={props.disabled}>Less</button>
        <button 
        className="BuildControl__More" 
        onClick={props.added}
        disabled={props.disabledMore}
        >More</button>
    </div>
)

export default buildControl;