import { addRow } from "libs/inetd-config"

export default async (req, res) => {
    const isUDP = req.query.udp === "true" ? '/udp' : ''
    const row = `0.0.0.0 ${req.query.dport}${isUDP} ${req.query.addr} ${req.query.port}${isUDP}`
    console.log(`Adding row: ${row}`)
    addRow(row)
    res.status(200).end()
}
