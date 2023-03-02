import { pool } from "../../../Model/connect.js";
export const getSearchResults = async (req,res) => {
  try {
    const q = 'SELECT * FROM users where name = ?'
    const [rows] = await pool.query(q, [req.query.name])
    return res.status(200).json(rows)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
