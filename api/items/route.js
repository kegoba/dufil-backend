import  router from 'express'
import {delete_item,update_item,get_item,get_items,create_item} from "./controller.js"
import { checkAuth, updateMiddleware, createItemMiddleware } from "./middleware.js"

let route = router.Router()





route.post('/add', checkAuth, createItemMiddleware, create_item)
route.put('/update/:id',  checkAuth ,updateMiddleware,update_item)
route.delete('/delete/:id', checkAuth, delete_item)
route.get('/findall'     ,checkAuth, get_items)
route.get('/findone/:id',  checkAuth, get_item)


export default route





 