import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputForm from '../../../components/UI/InputForm/InputForm';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as OrderActionCreators from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm: {
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid:false,
                    touched:false,
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid:false,
                    touched:false,
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'zip code'
                    },
                    value:'',
                    validation: {
                        required: true,
                        minLength:5,
                        maxLength:6
                    },
                    valid:false,
                    touched:false,
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid:false,
                    touched:false,
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your email'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid:false,
                    touched:false,
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[{value: 'fastest', displayValue:'Fastest'},
                                {value:'cheapest', displayValue:'Cheapest'}
                    ]
                    },
                    value:'fastest',
                    validation:{},
                    valid: true
                },
        },
        formIsValid: false,
    }
    //submit method
    orderSubmitHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingr,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
        
    }
    checkValidityForm(value, rules){
        let isValid = true;
        if(rules.required){
            //.trim() is a method for removing whitespace at the begining and end
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid;
        }

        return isValid;//TRUE OR FALSE
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //inputIdentifier = [type: email, country, name ...]
        const updatedFormElement= {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidityForm(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //console.log(updatedFormElement);

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;//checks if all the form elements are valid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    
    render(){
        //this is where we converted the state object to an array we can loop trough
        const formElementsArray = [];
        //key=name,street,zip etc...
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderSubmitHandler}>
                    {formElementsArray.map(formElement =>(
                        <InputForm
                               key={formElement.id}
                               elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               invalid = {!formElement.config.valid}
                               shouldValidate = {formElement.config.validation}
                               touched = {formElement.config.touched}
                               changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.purchaseStatus,
        token: state.authentication.token,
        userId: state.authentication.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
    onOrderBurger: (orderData,token) => dispatch(OrderActionCreators.purchaseBurgerBegin(orderData,token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));