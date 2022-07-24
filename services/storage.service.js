import { homedir } from 'os'
import { join, basename, dirname } from 'path'
import { promises } from 'fs'
import fsExists from 'fs.promises.exists'

const filePath = join(homedir(), 'weather-data.json')

export const TOKEN_DICTIONARY = {
    weather_token: 'weather_token',
    geo_token: 'geo_token',
    geo_secret_key: 'geo_secret_key',
    city: 'city'
}

export const saveKeyValue = async(key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }
    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async(key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        const data = JSON.parse(file)
        return data[key]
    }
    return null
}

const isExist = async(path) => {
    return await fsExists(path)
}