import React from 'react'
import {DropTarget} from "react-dnd"
import Card from "../Card/Card";
import {connect} from "react-redux";
import './MyCards.scss';
import PropTypes from 'prop-types'


const style = {};

class MyCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardFromProps: null,
            cards: null,
            averageOfCardsCost: 0,
            topWinrate: null
        };
        this.deleteCard = this.deleteCard.bind(this);
        this.getCardSetWinRate = this.getCardSetWinRate.bind(this);
        this.mapCards = this.mapCards.bind(this);
    }

    static propTypes = {
        ReduxCards: PropTypes.array
    };

    componentDidMount() {
        if (this.props.ReduxCards[this.props.ComponentIndex].length === 0) {
            let localStorageCards = localStorage.getItem(`localStorageCardsFor_${this.props.ComponentIndex}`);
            if (localStorageCards) {
                for (let i = 0; i < JSON.parse(localStorageCards).length; i++) {
                    this.props.onAddCard(JSON.parse(localStorageCards)[i], this.props.ComponentIndex)
                }
            } else {
                console.log(this.props)
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
        if (prevProps.cards !== this.props.cards ) {
            this.props.onAddCard(this.props.cards[0], this.props.ComponentIndex);
            localStorage.setItem(`localStorageCardsFor_${this.props.ComponentIndex}`, JSON.stringify(this.props.ReduxCards[this.props.ComponentIndex]))
            console.log(this.props)
        }
    }

    componentWillUnmount() {
        localStorage.setItem(`localStorageCardsFor_${this.props.ComponentIndex}`, JSON.stringify(this.props.ReduxCards[this.props.ComponentIndex]))
    }

    deleteCard(index) {
        this.props.onDeleteCard(index, this.props.ComponentIndex)
    }

    getCardSetWinRate = function (e) {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/Application/getCardPackWinrate', true);
        xhr.send("Карты");
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({topWinrate: JSON.parse(xhr.response)});
            }
        }
    };

    averageOfCardsCost() {
        if (this.props.ReduxCards[this.props.ComponentIndex].length !== 0) {
            const costs = this.props.ReduxCards[this.props.ComponentIndex].map((card, index) => {
                return card.card.cost
            });
            console.log(this.props.ReduxCards[this.props.ComponentIndex].map((card, index) => {
                return card.card.cost
            }), "reduce");
            return (costs.reduce((accum, currentValue) => accum + currentValue) / costs.length).toFixed(2);
        }
    }

    mapCards(){
        return (this.props.ReduxCards[this.props.ComponentIndex] != false) ? this.props.ReduxCards[this.props.ComponentIndex].map((card, index) => {
            return (<Card deleteCard={this.deleteCard} cardIndex={index} key={card.dbfId} img={card.img}
                          id={card.cardId} name={card.cardName} cost={card.card.cost}/>)
        }) : "Пусто"
    };

    mapWinrateDecks(){
       return this.state.topWinrate !== null ? this.state.topWinrate.map((post, index) => {
            return (<div className={"winrate_deck"} key={index}><a
                href={post.url}>{post.name}</a> винрейт: {post.winrate}</div>)
        }) : null
    };

    render() {
        const {canDrop, isOver, connectDropTarget} = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = isActive ? "#359c4b61" : 'inherit';

        return (
            <div ref={connectDropTarget} className="MyCards col-12" >
                <span>Моя колода</span>
                <div className="MyCards__result col-12" style={Object.assign({}, style, {backgroundColor})}>
                    {this.mapCards()}
                </div>
                <span>средняя цена карты: {this.averageOfCardsCost()}</span>
                <div className={"pt-5"}>
                    <button className={"my-3"} onClick={this.getCardSetWinRate}>get winrate</button>
                    <div className={"winrate_result"}>
                        {this.mapWinrateDecks()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        ReduxCards: state
    }),
    dispatch => ({
        onAddCard: (card, index) => {
            dispatch({type: `ADD_CARD`, payload: {card: card, index: index}});
        },
        onDeleteCard: (cardIndex, index) => {
            dispatch({type: `DELETE_CARD`, payload: {cardIndex: cardIndex, index: index}})
        }
    })
)(DropTarget('card', {
        drop(props, monitor) {
            props.Drop(monitor.getItem())
        }
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(MyCards))

