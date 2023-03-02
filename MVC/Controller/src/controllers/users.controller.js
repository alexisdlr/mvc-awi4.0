import { pool } from "../../../Model/connect.js";


export const getUser = async (req, res) => {
  try {
    const q = 'SELECT  `id`,`name`, `coverPic`, `profilePic`, `city`, `website` from users where id = ?'
    const rows = await pool.query(q, [req.params.userId]);
    console.log(rows)
    return res.status(200).json(rows[0][0])
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getProfile = async (req, res) => {

}