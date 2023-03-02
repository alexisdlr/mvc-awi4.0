import { pool } from "../../../Model/connect.js";
import moment from 'moment'
import jwt from 'jsonwebtoken'
export const getComments = async (req, res) => {
  try {
    const q = `SELECT c.*, u.id as userId, name, profilePic FROM comments AS c JOIN users as u ON (u.id = c.userId) where c.postId = ? ORDER BY c.createdAt DESC`;
    const [rows] = await pool.query(q, [req.query.postId]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const addComment = async (req, res) => {
  try {
    let id 
    const token = req.cookies.accessToken
    if(!token) return res.status(500).json('not logged in')
  
    jwt.verify(token, 'secretkey', (err, userInfo) => {
      if(err) return res.status(403).json('token invalid')
      id = userInfo.id
    } )
    const q = "INSERT INTO comments (`desc`, `createdAt`, `postId`,`userId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.body.postId,
      id
    ]
    const [rows] = await pool.query(q, [values]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
}

