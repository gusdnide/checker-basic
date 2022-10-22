const {fetch} = require('./utils');
const httpsProxy = require('https-proxy-agent');
const { Signale } = require('signale');

const Config = require('./config.json');

const Debug = new Signale({
    scope: Config.name,
    config: {
        displayTimestamp: true
    }
})





module.exports  = {
    check : async (info) => {
        // CRIE O TESTADOR AQUI
        Debug.info(info)
    }
}