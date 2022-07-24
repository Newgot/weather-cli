#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { printError, printHelp, printSucces } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async(token) => {
    try {
        await saveKeyValue('token', token)
        printSucces('Токоен Сохранен')
    } catch (e) {
        console.log(e);
        printError(e.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp()
    }
    if (args.s) {

    }
    if (args.t) {
        saveToken(args.t)
    }
}

initCLI()