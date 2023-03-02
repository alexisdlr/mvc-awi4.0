import { Router } from "express"
import { addComment, getComments } from "../controllers/comments.controller.js"

const router = Router()

router.get('/', getComments)
router.post('/', addComment)

export default router