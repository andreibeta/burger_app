import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render(){
    return(
        <Aux>
            <Toolbar 
            isAuth ={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
            isAuth ={this.props.isAuthenticated} 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null
    }
}

export default connect(mapStateToProps)(Layout);