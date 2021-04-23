import React from 'react';
import '../ComponentsCss.scss';
import {Link} from 'react-router-dom';
import './Navigation.scss'

function Navigation() {
    return (
        <ul className="navigation">
            <li className="nav-item"><Link to={"/Home"}>Главная</Link></li>
            <li className="nav-item"><Link to={"/Application"}>Приложение</Link></li>
            <li className="nav-item"><Link to={"/Logg"}>Войти</Link></li>
        </ul>
    );
}

export default Navigation;