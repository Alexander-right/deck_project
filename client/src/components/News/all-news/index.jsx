import React from 'react';

export default (props) => {
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {props.articles}
        </div>
    )
}

