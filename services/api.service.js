import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

export const getWeather = async() => {
    const city = await getKeyValue(TOKEN_DICTIONARY.city)
    if (!city) {
        throw new Error('Не задан город, задайте его через команду -s [CITY]')
    }
    const { lat, lon } = await getCoors(city)
    if (!lat && !lon) {
        throw new Error('Неправильно задан город, задайте его через команду -s [CITY]')
    }
    const token = await getKeyValue(TOKEN_DICTIONARY.weather_token)
    if (!token) {
        throw new Error('Не задан API-ключ, задайте его через команду -w [WEATHER_APY_KEY]')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    })
    console.log(data);
}

const getCoors = async(city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.geo_token)
    const secret = await getKeyValue(TOKEN_DICTIONARY.geo_secret_key)
    if (!token) {
        throw new Error('Не задан API-ключ, задайте его через команду -g [GEO_APY_KEY]')
    }
    if (!secret) {
        throw new Error('Не задан SECRET-ключ, задайте его через команду -w [GEO_SECRET_KEY]')
    }

    const { data } = await axios({
        method: 'post',
        url: 'https://cleaner.dadata.ru/api/v1/clean/address',
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
            "X-Secret": secret
        },
        data: JSON.stringify([city])
    })

    return {
        lat: data[0].geo_lat,
        lon: data[0].geo_lon
    }
}