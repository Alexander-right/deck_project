import React  from 'react';
import { connect } from "react-redux";
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter  } from 'react-router-dom'
import { Route } from 'react-router';
import auth from './components/RegAuth/Auth/Auth'
import {Home} from './components/Home/Home'
import LogRegister from './components/RegAuth/FormWrapper/FormWrapper'
import DeckManager from "./components/Application/InputAndCardTable/Application";
import unAuth from "./components/Application/InputAndCardTable/unauth"
import {Chat} from "./components/Chat/Chat";
import NewsContainer from './components/News'
import NewsMore from './components/News/news-more-component'

class App extends React.Component{
    componentDidMount(){
        const authDispatch = this.props.Auth;
        const authSetLogin = this.props.SetLogin;
        function getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        const token = getCookie("token");

        if (!token) {
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/tokenvalidate', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState !== 4) return;

            if (this.status !== 200) {
                alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                return;
            }

            try {
                JSON.parse(xhr.response);
                authSetLogin(JSON.parse(xhr.response).login);
                authDispatch();
            } catch (err) {
                console.error(err)
            }
        };
        const data = JSON.stringify({ "token": token});
        xhr.send(data);
    }

    get component() {
        return this.props.login.authenticated ? DeckManager : unAuth;
    }

    render() {
        console.log(this.props.login)

        return(
                <BrowserRouter>
                    <div className="App">
                            <Navigation/>
                            <div className={'content-home'}>
                                <Route path="/Home" component={Home}/>
                                <Route path="/Logg" component={LogRegister}/>
                                <Route path="/Application" component={this.component}/>
                                <Route path={"/Chat"} component={Chat} />
                                <Route exact path={["/news", "/news/:id"]} component={NewsContainer}/>
                            </div>
                            <div className={'footer'}></div>
                    </div>
                </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    Auth: () => dispatch({type: 'AUTH'}),
    SetLogin: (login) => dispatch({ type: 'SET_LOGIN', payload: login})
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
