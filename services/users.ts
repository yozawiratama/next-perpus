import squel from 'squel';
import bcrypt from 'bcrypt';
import { query } from '../lib/db'

const UserService = () => {

    const get = async () => {
        const results = await query(
            squel.select()
                .from("users")
                .toString()
        )
        return results;
    };

    const getOne = async (id) => {
        const results = await query(
            squel.select()
                .from("users")
                .where(`id = ?`, id)
                .limit(1)
                .toString()
        )

        return results.length > 0? results[0] : null;
    };

    const getOneByEmail = async (email) => {
        const results = await query(
            squel.select()
                .from("users")
                .where(`email = ?`, email)
                .limit(1)
                .toString()
        )

        return results.length > 0? results[0] : null;
    };

    return {
        get,
        getOne,
        getOneByEmail
    }

}

export default UserService;