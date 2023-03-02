import { pool } from "../../../Model/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    });
    const q = userId
      ? `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ?`
      : `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUser) WHERE r.followerUser = ? or p.userId = ? ORDER BY p.createdAt DESC`;
    const values = userId ? [userId] : [id, id];
    const [rows] = await pool.query(q, values);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addPosts = async (req, res) => {
  try {
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    });
    const q =
      "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      id,
    ];
    console.log(values);
    const [rows] = await pool.query(q, [values]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};
