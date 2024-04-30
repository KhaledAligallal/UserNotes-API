import{Router}from 'express';
import * as uc from './user,controller.js'

const   router = Router()
router.get('/',uc.getAllUsers)
router.post('/add',uc.signUp)
router.post('/signin',uc.signIn)
router.put('/update/:id',uc.update)
router.delete('/delete/:id',uc.Delete)
router.get('/search_1',uc.search_1)
router.get('/search_2',uc.search_2)
router.get('/search_3',uc.search_3)
router.get('/search_4',uc.search_4)
export default router 