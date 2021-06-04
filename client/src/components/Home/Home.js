import React, { useEffect } from 'react';

export const Home = () => {
    useEffect(() => {
        fetch('https://playhearthstone.com/ru-ru/api/blog/articleList/?page=1&pageSize=12&tagsList[]=patch')
            .then(data => data.json())
            .then(data => console.log(data))
    });

    return <div>
        <h1>Домашняя страница</h1>
        <span>
            Данное приложение является учебным.
        </span>
    </div>
};
