import { Router } from "express"
import { getUser, getProfile} from "../controllers/users.controller.js"

const router = Router()

router.get('/find/:userId', getUser)
router.get('/profile', getProfile)


export default router