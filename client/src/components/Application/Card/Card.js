import React from 'react'
import {DragPreviewImage} from 'react-dnd'
import {DragSource} from "react-dnd"
import PropTypes from 'prop-types'
import './style.scss'

function Card(props) {
    const {isDragging, connectDragSource, connectDragPreview, canDrag} = props;
    let opacity = isDragging ? 0.5 : 1;
    let refType = canDrag ? connectDragSource : null;
    let className = canDrag ? "d-inline-flex" : "d-inline-block";
    let buttonDisplay = canDrag ? "none" : "display";
    let cardColPosition = canDrag ? "col-md-4" : "col-md-6";
    return (
        <>
            <DragPreviewImage connect={connectDragPreview} src={props.img}/>
            <div ref={refType} className={"hs_card " + className + " " + cardColPosition}>
                <button className={"hs_card__button"} style={{display: buttonDisplay}}
                        onClick={props.deleteCard && props.deleteCard.bind(this, props.cardIndex)}>delete
                </button>
                <img style={{opacity: opacity}} src={props.img} alt=""/>
            </div>
        </>
    )
}

Card.propTypes = {
    canDrag: PropTypes.bool,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDragPreview: PropTypes.func
};
export {Card};

export default DragSource('card',
    {
        beginDrag: (props) => ({card: props}),
        endDrag(props, monitor) {
            const item = monitor.getItem();
            const dropResult = monitor.getDropResult();
        },
        canDrag: (props, monitor) => {
            return props.canDrag;
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    })
)(Card);