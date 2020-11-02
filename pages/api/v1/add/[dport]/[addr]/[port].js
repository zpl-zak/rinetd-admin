import { addRow } from "libs/inetd-config"

export default async (req, res) => {
    const row = `0.0.0.0 ${req.query.dport} ${req.query.addr} ${req.query.port}`
    console.log(`Adding row: ${row}`)
    addRow(row)
    res.status(200).end()
}
