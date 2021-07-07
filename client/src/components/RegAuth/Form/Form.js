import React, {Component} from 'react';
import { connect } from "react-redux";
//import '../../ComponentsCss.scss';
import PropTypes from 'prop-types'
import auth from './../Auth/Auth.js';
import './style.css';
import * as actionTypes from "../../../Redux/actionTypes";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.SendRequest = this.SendRequest.bind(this);
        this.HandleChange = this.HandleChange.bind(this)
    }

    SendRequest(e){
        e.preventDefault();
        const type = this.props.type;
        const authDispatch = this.props.Auth;
        const setLogin = this.props.SetLogin;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/api/v1/${this.props.type}`, true);
        console.log(this.props.type);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;

            if (this.status !== 200) {
                alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
                return;
            }
            if (type === 'authorization') {
                try {
                    console.log(JSON.parse(xhr.response))
                    document.cookie = "token=" + JSON.parse(xhr.responseText).token;
                    console.log(document.cookie);
                    setLogin(JSON.parse(xhr.response).login)
                    authDispatch()
                } catch (err) {
                    console.error(err)
                }
            }

        };
        let data = JSON.stringify({"login": this.state.login, "password": this.state.password});
        xhr.send(data);
    };

    HandleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.SendRequest} className="wrapper-form">
                <input type="text" name={'login'} placeholder={"login"} value={this.state.login}
                       onChange={this.HandleChange} className={this.props.type + "__login"}/>
                <input type="text" name={'password'} placeholder={"password"} value={this.state.password}
                       onChange={this.HandleChange} className={this.props.type + "__password"}/>
               <div><div className={'button'} onClick={this.SendRequest}>{this.props.forButton}</div></div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Decks: state.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    Auth: () => dispatch({type: 'AUTH'}),
    SetLogin: (login) => dispatch({ type: 'SET_LOGIN', payload: login})
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
    forButton: PropTypes.string,
    type: PropTypes.string,
};
