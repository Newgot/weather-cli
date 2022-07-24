#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSucces } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async(type, token) => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try {
        await saveKeyValue(type, token)
        printSucces('Токоен Сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async(city) => {
    if (!city.length) {
        printError('Не передан город')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSucces(`Город: ${city} сохранен`)
    } catch (e) {
        printError(e.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp()
    }
    if (args.s) {
        saveCity(args.s)
    }
    if (args.w) {
        saveToken(TOKEN_DICTIONARY.weather_token, args.w)
    }
    if (args.g) {
        saveToken(TOKEN_DICTIONARY.geo_token, args.g)
    }
    if (args.k) {
        saveToken(TOKEN_DICTIONARY.geo_secret_key, args.k)

    }
    getWeather()
}

initCLI()