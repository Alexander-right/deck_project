import React from "react";
import {Route, Redirect} from "react-router-dom";
import auth from "../RegAuth/Auth/Auth";
import DeckChooser from "../Application/DeckChooser/DeckChooser";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => auth.isAuthenticated() === true
                ? <DeckChooser/>
                : <Redirect to="/Logg"/>
            }/>
    );
};
