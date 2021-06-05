import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default (props) => {
    const author = props.content && props.content.author;
    const title = props.content && props.content.title;
    const img = props.content && props.content.urlToImage;
    const description = props.content && props.content.description;
    const url = props.content && props.content.url;
    const content = props.content && props.content.content;
    console.log(content);

    return(
        <div style={{maxWidth: 800, margin: '0 auto'}}>
            <Link to={`./../news`}>назад</Link>
            <br/>
            <h3>{title}</h3>
            author: {author}
            <br/>
            {description}
            <div style={{marginTop: 24, display: 'block'}} dangerouslySetInnerHTML={{__html: content}}>
            </div>
        </div>
    )
}
