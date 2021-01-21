import React , { Component } from 'react';
import InputForm from '../../components/UI/InputForm/InputForm';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Authentication extends Component {
    state = {
        controls: {
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail address'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid:false,
                touched:false,
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false,
            },
            
        },
        isSignUp: true
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

    inputChangedHandler = (event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            //in our case the email or password is [controlName]
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidityForm(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthentication(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHanlder = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }
    //if we are not building a burger the button will not trigger to redirect
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render(){
         //this is where we converted the state object to an array we can loop trough
         const formElementsArray = [];
         //key=name,street,zip etc...
         for(let key in this.state.controls){
             formElementsArray.push({
                 id:key,
                 config:this.state.controls[key]
             })
         }
         let form = formElementsArray.map(formElement => (
             <InputForm
                
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
         ))

         if(this.props.loading){
             form = <Spinner />
         }

         let errorMessage = null;
         if(this.props.error){
             errorMessage = (
                 <p>{this.props.error.message}</p>
             )
         }
         

         let authRedirect = null;
         if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
         }
        return(
            <div className="Authentication">
                {authRedirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button buttonType ="Success" >SUBMIT</Button>
                </form>
                <Button 
                    clicked = {this.switchAuthModeHanlder}
                    buttonType="Danger">Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuthenticated: state.authentication.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.authentication.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthentication: (email, password, isSignUp) => dispatch(actions.auth(email , password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);