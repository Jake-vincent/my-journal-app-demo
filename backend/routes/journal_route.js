import { Router } from 'express';
import {
  getAllJournals,
  getUserJournals,
  createJournal,
  updateJournal,
  deleteJournal

} from '../controllers/journal_controller.js';
import { verifyAccessToken } from '../modules/authenticator.js';

const router = Router();

router.route('/').post(verifyAccessToken,createJournal);
router.route('/all').get(getAllJournals);
router.route('/').get(verifyAccessToken,getUserJournals);
router.route('/:id').put(updateJournal);
router.route('/:id').delete(deleteJournal);

export default router;