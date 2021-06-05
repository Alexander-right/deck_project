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
                    <h3 style={{color: 'rgb(97, 67, 38)', marginBottom: '48px'}}>Зарегистрируйтесь или авторизируйтесь в приложении</h3>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Form forButton={"Авторизироваться"} type={"authorization"}/>
                        <Form forButton={"Зарегистрироваться"} type={"register"}/>
                    </div>
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
