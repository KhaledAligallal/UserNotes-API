import{Router}from 'express';
import * as no from './Notes,controller.js'

const   router = Router()


router.get('/addnote',no.addNote)
router.get('/get',no.getAllNotes)
router.delete('/deletenote/:id/:user_id',no.Delete)
router.put('/updatenote/:id/:user_id',no.update)
router.get('/get_2',no.getAllNotesWithOwner)
export default router