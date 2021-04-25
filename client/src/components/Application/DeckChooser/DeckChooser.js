import React from "react"
import {Link} from "react-router-dom"
import {Route} from 'react-router'
import MyCards from "../MyCards/MyCards";
import {connect} from "react-redux";
import * as actionTypes from './../../../Redux/actionTypes'
import PropTypes from 'prop-types'
import './style.scss'

export class DeckChooser extends React.Component {

    static propTypes = {
        Decks: PropTypes.array
    };

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            deckLinks: this.props.Decks.map((link, index) => {
                return (
                    <li key={"LinkForMyCards" + (index + 1)} className={"nav-item"}><Link
                        to={"/Application/deck_" + (index + 1)}>{index + 1}</Link></li>)
            }),
            mapDeckRoutes: this.props.Decks.map((route, index) => {
                return (<Route key={"RouteForMyCards_" + (index + 1)} path={"/Application/deck_" + (index + 1)}
                               render={(props) => <MyCards key={"MyCards_" + (index + 1)} ComponentIndex={index}
                                                           cards={this.props.cards}
                                                           canDrag={false}
                                                           Drop={this.props.Drop}/>}/>)
            })
        };
        this.addDeck = this.addDeck.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            this.setState({
                deckLinks: this.props.Decks.map((link, index) => {
                    return (
                        <li key={"deck_" + index + 1} className={"nav-item"}><Link to={"/Application/deck_" + (index + 1)}>{index + 1}</Link>
                        </li>)
                }),
                mapDeckRoutes: this.props.Decks.map((route, index) => {
                    return (<Route key={"deck_" + index + 1} path={"/Application/deck_" + (index + 1)}
                                   render={(props) => <MyCards ComponentIndex={index} cards={this.props.cards}
                                                               canDrag={false}
                                                               Drop={this.props.Drop}/>}/>)
                })
            })
        }
    }

    addDeck() {
        this.props.AddDeck();
    }

    render() {
        return (
            <div className={"col-5 mt-4"}>
                <ul className={"deck__navigation"}>
                    {this.state.deckLinks}
                    <li className={"nav-item__add-button"} onClick={this.addDeck}>+</li>
                </ul>
                <div className={"deck-wrapper"}>
                    {this.state.mapDeckRoutes}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Decks: state.cards
    }
};
const mapdispatchToProps = (dispatch) => ({
    AddDeck: () => dispatch({type: actionTypes.ADDDECK})
});

export default connect(mapStateToProps, mapdispatchToProps)(DeckChooser)

