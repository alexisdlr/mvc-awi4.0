import { Router } from "express"
import { dislikePost, getLikes, likePost } from "../controllers/likes.controller.js"

const router = Router()

router.get('/', getLikes)
router.post('/', likePost)
router.delete('/', dislikePost)

export default router