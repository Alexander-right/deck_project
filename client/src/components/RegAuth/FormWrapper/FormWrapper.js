import React from 'react';
import Form from '../Form/Form'
import { Route, Redirect } from "react-router-dom";
import auth from "../Auth/Auth";

let buttonLogOut = () => {
    auth.logout();
};
export const LogRegister = ({component: Component, ...rest}) =>{
        return(
            <Route
                {...rest}
                render={(props) => auth.isAuthenticated() === true
                    ?   <div>Логин
                            <button onClick={buttonLogOut}>Выход</button>
                        </div>
                    :   <div>
                            <Form forButton={"Авторизироваться"} type={"authorization"}/>
                            <Form forButton={"Зарегистрироваться"} type={"register"}/>
                        </div>
                }
            />
        );
};
