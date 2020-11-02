import { delRow } from "libs/inetd-config"

export default async (req, res) => {
    console.log(`Removing row index: ${req.query.index}`)
    delRow(parseInt(req.query.index))
    res.status(200).end()
}
