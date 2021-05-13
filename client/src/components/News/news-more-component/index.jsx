import React from 'react'
import {Link} from 'react-router-dom';

export default (props) => {
    const author = props.content && props.content.author;
    const title = props.content && props.content.title;
    const img = props.content && props.content.urlToImage;
    const description = props.content && props.content.description;
    const url = props.content && props.content.url;

    return(
        <div style={{maxWidth: 500, margin: '0 auto'}}>
            <Link to={`./../news`}>назад</Link>
            <br/>
            <h3>{title}</h3>
            author: {author}
            <br/>
            {description}
            <span style={{marginTop: 24, display: 'block'}}>
                Полная статья <a href={url} target={'_blank'}>тут</a>
            </span>
            <img style={{width: '100%', marginTop: 24}} alt={'title image'} src={img}/>
        </div>
    )
}
