import { Router } from "express"
import { followUser, getRelationships, unfollowUser } from "../controllers/relationship.controller.js"

const router = Router()

router.get('/', getRelationships)
router.post('/', followUser)
router.delete('/', unfollowUser)

export default router