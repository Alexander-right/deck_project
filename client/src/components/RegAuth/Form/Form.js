import React, {Component} from 'react';
//import '../../ComponentsCss.scss';
import PropTypes from 'prop-types'
import auth from './../Auth/Auth.js';


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
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3001/' + this.props.type, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;

            if (this.status !== 200) {
                alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
                return;
            }
            if (this.props.type === 'authorization') { auth.login() }
            document.cookie = "token=" + xhr.responseText;
            console.log(document.cookie);
        };
        let data = JSON.stringify({"login": this.state.login, "password": this.state.password});
        xhr.send(data);
       // xhr.setRequestHeader("Cookie", xhr.responseText);
    };

    HandleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.SendRequest} className="Authorization">
                <input type="text" name={'login'} placeholder={"login"} value={this.state.login}
                       onChange={this.HandleChange} className={this.props.type + "__login"}/>
                <input type="text" name={'password'} placeholder={"password"} value={this.state.password}
                       onChange={this.HandleChange} className={this.props.type + "__password"}/>
                <button>{this.props.forButton}</button>
            </form>
        );
    }
}

export default Form;

Form.propTypes = {
    forButton: PropTypes.string,
    type: PropTypes.string,
};