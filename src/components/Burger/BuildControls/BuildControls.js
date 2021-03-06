import React from 'react';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'},
];
//disabled ={props.disabled[ctrl]} we want to disable only one of control type using this way with props.disabled[ctrl]
const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=> props.ingredientRemoved(ctrl.type)}
            disabled ={props.disabled[ctrl.type]}
            disabledMore={props.disabledMore[ctrl.type]}
             />
        ))}
        <button 
        className="OrderButton"
        disabled={!props.purchaseable}
        onClick={props.order}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;