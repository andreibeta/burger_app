import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    //componentDidMount is the first thing that triggers when the component is RENDERED
    componentDidMount() {
        this.props.onLogout();
    }
    render(){
        return(
            <Redirect to="/"/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);