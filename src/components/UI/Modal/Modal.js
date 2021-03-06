import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {
   shouldComponentUpdate(nextProps, nextState){
       //we should update the orderSummary only when show modal trigger changes
       return nextProps.show !== this.props.show || nextProps.children !== this.props.children;//this returns true or false, it's a boolean
   }
   componentDidUpdate(){
       console.log('[Modal] updated');
   }
    render(){ 
       return (
    <Aux>
        <Backdrop 
        show={this.props.show}
        clicked={this.props.modalClosed}/>
    <div 
    className="Modal"
    style={{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity:this.props.show ? '1': '0'
    }}>
        {this.props.children}
    </div>
    </Aux>
    );
   }
}

export default Modal;