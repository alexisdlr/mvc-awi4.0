import { pool } from "../../../Model/connect.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    //check if user exists
    const select = "SELECT * FROM users where username = ?";
    const [rows] = await pool.query(select, [req.body.username]);
    if (rows.length) return res.status(409).json("User Already exists");
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users (`username`, `email`, `pass`, `name`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPass,
      req.body.name,
    ];
    const [data] = await pool.query(q, [values]);
    res.status(200).send({
      id: data.insertId,
      username: req.body.username,
      name: req.body.name
    });
};

export const login = async (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?'
  const [rows] = await pool.query(q, [req.body.username])
  if(rows.length === 0) return res.status(404).send('user not found')
  console.log(rows)
  
  const checkPass = bcrypt.compareSync(req.body.password, rows[0].pass)
  if (!checkPass) return res.status(400).json('wrong password')

  const {passWord, ...others} = rows[0]
  const token = jwt.sign({id: rows[0].id}, "secretkey")
  res.cookie("accessToken", token, {
    httpOnly: true
  }).status(200).json(others)
};

export const logout = (req, res) => {
  res.clearCookie('accessToken', {
    secure: true,
    sameSite: 'none'
  }).status(200).json('user has been logged out')
};
