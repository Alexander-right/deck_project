import React from "react";
import Card from "../Card/Card";
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext, DragDropContextProvider} from "react-dnd";
import DeckChooser from "../DeckChooser/DeckChooser";

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            value: '',
            cards: null,
            cardForMyCards: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.getCardByClass = this.getCardByClass.bind(this);
        this.getCard = this.getCard.bind(this)
    }

    getCardByClass = function (e) {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/Application/getCards', true);
        xhr.send(this.state.value.charAt(0).toUpperCase() + this.state.value.slice(1).toLowerCase());
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({cards: JSON.parse(xhr.responseText)})
            }
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.cards !== this.state.cards) {
            this.setState({
                cards: this.state.cards.sort((a, b) => {
                    return typeof a.img === "string" ? -1 : 1
                })
            });
            this.setState({
                cardsToShow: this.state.cards.map(card => {
                    return (
                        <Card canDrag={true} img={card.img === undefined ? "https://i.imgur.com/3NrKqzF.png" : card.img}
                              cardName={card.name} id={card.dbfId} key={card.dbfId} card={card}/>)
                })
            });
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    };

    getCard = (card) => {
        this.setState({cardForMyCards: [card.card, this.state.counter++]})
    };

    render() {
        return (
            <div className="App">
                <div className="App__search">
                    <input type="text" onChange={this.handleChange} value={this.state.value}
                           placeholder={"Введите расу, класс или фракцию карты"} className={"col-sm-6 col-md-5"}/>
                    <button className="App__button col-sm-2 col-md-1" onClick={this.getCardByClass}>Поиск</button>
                </div>
                <div className="cards-wrapper col-12">
                    <div className="App__result col-7 mt-4">
                        {this.state.cardsToShow}
                    </div>
                    <DeckChooser className={"col-12"} canDrag={false} cards={this.state.cardForMyCards}
                                 Drop={this.getCard}/>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Application)
