import { homedir } from 'os'
import { join, basename, dirname } from 'path'
import { promises } from 'fs'
import fsExists from 'fs.promises.exists'

const filePath = join(homedir(), 'weather-data.json')


export const saveKeyValue = async(key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }
    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async(key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
        return data[key]
    }
    return null
}

const isExist = async(path) => {
    return await fsExists(path)
}