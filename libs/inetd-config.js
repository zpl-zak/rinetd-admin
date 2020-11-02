const fs = require('fs')
const util = require('util')

const exec = util.promisify(require('child_process').exec)

const loadConfig = async () => {
    const file = require("cfg")['config-path']
    console.log(`Reading config at: ${file}`)

    try {
        return await fs.readFileSync(file, 'utf8').split('\n')
    } catch (e) {
        console.log(`Config: ${file} does not exist, creating one...`)
        await saveConfig([])
        return []
    }
}

const saveConfig = async rows => {
    const file = require("cfg")['config-path']
    const hook = require("cfg")['on-save-hook']
    console.log(`Storing config at: ${file}`)

    await fs.writeFileSync(file, rows.filter(x => x.trim().length > 0).join('\n'))

    if (hook !== null) {
        console.log(`Executing hook: ${hook}`)
        const out = await exec(hook)
        console.log(out)
    }
}

const addRow = async row => {
    const cfg = await loadConfig()
    cfg.push(row)
    await saveConfig(cfg)
}

const delRow = async index => {
    const cfg = await loadConfig()
    await saveConfig(cfg.filter((_, i) => i != index))
}

const listRows = async () => {
    return (await loadConfig()).map(x => {
        const fields = x.split(' ')
        if (fields.length < 2) return null

        return {
            addr: fields[2],
            dport: fields[1],
            port: fields[3]
        }
    }).filter(x => x)
}

module.exports = {
    addRow,
    delRow,
    listRows
}