import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { name, email, username, phone, password } = req.body
    try {
        if (!name || !email || !username || !phone || !password) {
            return res
                .status(400)
                .json({ message: '`name`, `email`, `username`, `phone`, and `password` are required' })
        }

        const results = await query(
            `
      INSERT INTO users (name, email, username, phone, password)
      VALUES (?, ?, ?, ?, ?)
      `,
            [
                filter.clean(name),
                filter.clean(email),
                filter.clean(username),
                filter.clean(phone),
                filter.clean(password),
            ]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
