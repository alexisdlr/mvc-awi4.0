import { pool } from "../../../Model/connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req, res) => {
  try {
    const q = "SELECT followerUser from relationships where followedUser = ?";
    const [rows] = await pool.query(q, [req.query.followedUser]);
    return res.status(200).json(rows.map(relationship => relationship.followerUser));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const followUser = async (req, res) => {
  try {
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    });
    const q = "INSERT INTO relationships (`followerUser`, `followedUser`) values (?, ?)";
    const [rows] = await pool.query(q, [id, req.body.userId]);
    return res.status(200).json('following',rows.insertId);
  } catch (error) {
    res.status(500).json(error);
  }
} 

export const unfollowUser = async (req, res) => {
  try {
    let id;
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).json("not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token invalid");
      id = userInfo.id;
    })
    const q = "DELETE FROM relationships WHERE `followerUser` = ? AND `followedUser` = ?"
    
    const [rows] = await pool.query(q, [ id, req.query.userId]);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
}