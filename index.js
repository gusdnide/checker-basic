const fs = require('fs');
const { Signale } = require('signale');
const { PromisePool } = require('@supercharge/promise-pool');

const {check} = require('./checker');
const Config = require('./config.json');

const Debug = new Signale({
    scope: Config.name,
    config: {
        displayTimestamp: true
    }
})


fs.readFile('./lista.txt', {
    encoding: 'utf-8'
}, async (error, data) => {
    if (error) {
        return Debug.error(error);
    }

    let mask = /\d{11}\|\d{6}/

    let list = data.split('\n').filter(e => mask.test(e)).map(e => {
        let [cpf, senha] = mask.exec(e)[0].split('|');
        return {
            cpf,
            senha
        }
    });

    await PromisePool
        .withConcurrency(Config.bots)
        .for(list)
        .handleError((error, bot) => {
            Debug.error(`Erro ao executar o bot `, bot, error.message);
        })
        .process(check)
})