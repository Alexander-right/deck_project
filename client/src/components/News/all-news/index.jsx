import React from 'react';

export default (props) => {
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgb(97, 67, 38)',
        }}>
            <h3>Последние обновления по игре</h3>
            <p>Здесь вы можете прочитать про последние обновление в игре, о новых добавленных фукнциях и прочем</p>
            {props.articles}
        </div>
    )
}

