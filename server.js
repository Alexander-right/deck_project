const HTTP = require("http");
//const MONGOCLIENT = require("mongodb").MongoClient;
const jwt = require('jsonwebtoken');
const unirest = require("unirest");
const SECRET_KEY = "QsafQAWRIOjh1";
const IMGDATABASE = require('hearthstone-card-images');
const cors = require('cors');
const IMAGES = indexCardImages();
const PUPPETEER = require('puppeteer');
const express = require('express');
const app = express();
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path');

const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const db = new JsonDB(new Config("myDataBase", true, false, '/'));

const usersDBRoute = '/users';

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Set up the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

/*Develop Branch*/
function indexCardImages() {
    let images = {};
    let base = IMGDATABASE.config.base;
    let version = IMGDATABASE.config.version;
    for (let type in IMGDATABASE.cards) {
        for (let id in IMGDATABASE.cards[type]) {
            let url = `${base}/${version}/${type}/${id}.png`;
            images[id] = url;
        }
    }
    return images
}

app.post('/api/v1/Application/getCardPackWinrate', function (request, response) {
    let top5 = [];
    request.on('data', function () {
        console.log("Пошел!")
    }).on('end', function () {
        (async function requsetStat() {
            const browser = await PUPPETEER.launch({
                args: ['--no-sandbox']
            });
            const page = await browser.newPage();
            const pageURL = 'https://hsreplay.net/decks/#sortBy=winrate';
            try {
                await page.goto(pageURL);
            } catch (error) {
                console.log(`Не удалось открыть страницу: ${pageURL} из-за ошибки: ${error}`);
            }
            const postsSelector = '#decks-container > main > div.deck-list-wrapper > section > ul > li:nth-child(n+2):nth-child(-n+6) > a';
            await page.waitForSelector(postsSelector, {timeout: 0});
            const postUrls = await page.$$eval(
                postsSelector, Li => Li.map(a => a.href)
            );
            const winrateSelector = '#decks-container > main > div.deck-list-wrapper > section > ul > li:nth-child(n+2):nth-child(-n+6) > a > div > div:nth-child(2) > span';
            const postWinrate = await page.$$eval(
                winrateSelector, span => span.map(span => span.innerText)
            );
            const nameSelector = "#decks-container > main > div.deck-list-wrapper > section > ul > li:nth-child(n+2):nth-child(-n+6) > a > div > div.col-lg-2.col-md-2.col-sm-2.col-xs-6 > h3";
            const postName = await page.$$eval(
                nameSelector, name => name.map(name => name.innerText)
            );
            top5.push(postUrls, postWinrate, postName);
            let object = [];
            for (let i = 0; i <= 4; i++) {
                object[i] = {};
                object[i].url = postUrls[i];
                object[i].name = postName[i];
                object[i].winrate = postWinrate[i];
            }
            await browser.close();
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(object));
            console.log(`Ответ : ${top5}`)
        })();
    })
});

app.post('/api/v1/Application/getCards', function (request, response) {
    var inputValue = "";
    var searchResult;
    request.on('data', function (chunk) {
        inputValue += chunk.toString('utf8');
    }).on('end', function () {
        switch (inputValue) {
            case 'Warrior':
            case 'Mage':
            case 'Shaman':
            case 'Warlock':
            case 'Priest':
            case 'Rogue':
            case 'Hunter':
            case 'Paladin':
            case 'Druid':
                unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/" + inputValue)
                    .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
                    .header("X-RapidAPI-Key", "bc0537b2d9mshf48b7cac2b51c7ap17b487jsnb51e78cc1f61")
                    .end(function (result) {
                        searchResult = result.body;
                        response.setHeader("Content-Type", "application/json");
                        if (searchResult.error == "404") return;
                        searchResult.map(card => {
                            card.img = IMAGES[card.dbfId];
                        });
                        console.log(searchResult[1]);
                        response.end(JSON.stringify(searchResult))
                    });
                break;
            case 'Alliance':
            case 'Horde':
                unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/factions/" + inputValue)
                    .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
                    .header("X-RapidAPI-Key", "bc0537b2d9mshf48b7cac2b51c7ap17b487jsnb51e78cc1f61")
                    .end(function (result) {
                        searchResult = result.body;
                        response.setHeader("Content-Type", "application/json");
                        if (searchResult.error == "404") return;
                        searchResult.map(card => {
                            card.img = IMAGES[card.dbfId];
                        });

                        console.log(searchResult[1]);

                        response.end(JSON.stringify(searchResult))
                    });
                break;
            case 'Beast':
            case 'Demon':
            case 'Dragon':
            case 'Mech':
            case 'Murloc':
            case 'Pirate':
            case 'Totem':
            case 'Elemental':
                unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/" + inputValue)
                    .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
                    .header("X-RapidAPI-Key", "bc0537b2d9mshf48b7cac2b51c7ap17b487jsnb51e78cc1f61")
                    .end(function (result) {
                        searchResult = result.body;
                        response.setHeader("Content-Type", "application/json");
                        if (searchResult.error == "404") return;
                        searchResult.map(card => {
                            card.img = IMAGES[card.dbfId];
                        });
                        response.end(JSON.stringify(searchResult))
                    });
                break;
        }
    })
});

app.post('/api/v1/register', (request, response) => {
    if (!request.body.login || db.exists(usersDBRoute + request.body.login) || !request.body.password) {
        response.status(400);
        response.send(JSON.stringify('invalid login'))
        return
    }
    const userData = {
      login: request.body.login,
      password: request.body.password,
      token: jwt.sign(request.body.login, SECRET_KEY),
    };
    db.push(usersDBRoute + request.body.login, userData);
    response.end(JSON.stringify(200))
});

app.post('/api/v1/authorization', (request, response) => {
    console.log(request.body)
    if (!request.body.login || !request.body.password) {
        response.status(400);
        response.send(JSON.stringify('invalid login'))
        return;
    }
    const isValid = db.getData(usersDBRoute + request.body.login).password === request.body.password;
    if (isValid) {
        const token = jwt.sign(request.body.login, SECRET_KEY);
        response.end(JSON.stringify({ token, login: request.body.login}));
    }
    response.status(400);
    response.send('invalid password')

});

app.post('/api/v1/tokenvalidate', (request, response) => {
    const token = request.body.token;
    console.log(token)
    if (!token) {
        console.log('!token')
        response.status(400);
        response.end('invalid token');
        return;
    }
    console.log('im here')
    const decoded = jwt.verify(token, SECRET_KEY);
    const isValidUser = db.exists(usersDBRoute + decoded);
    if (!isValidUser) {
        response.status(400);
        response.end('invalid token');
        return;
    }
    response.end(JSON.stringify({ login: decoded }));
});


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`BACK_END_SERVICE_PORT: ${port}`)
});

