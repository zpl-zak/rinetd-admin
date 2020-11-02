import { listRows } from "libs/inetd-config"

export default async (req, res) => {
    console.log(`Indexing config`)
    res.status(200).json(await listRows())
}
