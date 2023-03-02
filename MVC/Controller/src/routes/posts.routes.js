import { Router } from "express"
import { getPosts, addPosts } from "../controllers/posts.controller.js"

const router = Router()

router.get('/', getPosts)
router.post('/', addPosts)


export default router