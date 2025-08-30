import {registerUser} from '../controllers/users.controllers.js'
import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'

const router = Router();

router.route('/register').post(
    upload.fields([
        { 
            name: "avatar",
            maxCount: 1
         },{
            name:"coverImage",
            maxCount:1
         }
    ]),
    registerUser)

export {
    router,
}