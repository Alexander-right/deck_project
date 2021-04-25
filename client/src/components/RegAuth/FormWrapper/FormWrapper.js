import React from 'react';
import Form from '../Form/Form'
import { Route, Redirect } from "react-router-dom";
import auth from "../Auth/Auth";
import {connect} from "react-redux";

class LogRegister extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            this.props.auth.authenticated
                ? <div>
                    {`Вы зашли под логином: ${this.props.auth.login}`}
                    <button style={{marginLeft: '16px'}} onClick={this.props.LogOut}>Выход</button>
                  </div>
                : <div>
                    <Form forButton={"Авторизироваться"} type={"authorization"}/>
                    <Form forButton={"Зарегистрироваться"} type={"register"}/>
                  </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    LogOut: () => dispatch({type: 'LOG_OUT'})
});

export default connect(mapStateToProps, mapDispatchToProps)(LogRegister);
