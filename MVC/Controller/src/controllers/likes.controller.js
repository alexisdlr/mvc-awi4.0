import { pool } from "../../../Model/connect.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  try {
    const q = "SELECT userId from likes where postId = ?";
    const [rows] = await pool.query(q, [req.query.postId]);
    return res.status(200).json(rows.map(like => like.userId));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  try {
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    });
    const q = "INSERT INTO likes (`postId`, `userId`) values (?, ?)";
    const [rows] = await pool.query(q, [req.body.postId, id]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
} 

export const dislikePost = async (req, res) => {
  console.log('works')
  try {
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    })
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"
    
    const [rows] = await pool.query(q, [ id, req.query.postId]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
}