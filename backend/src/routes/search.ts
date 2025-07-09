import { Router } from 'express';
import { search, getDetails } from '../controllers/searchController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protect all search routes with authentication
router.use(authenticateToken);

router.get('/search', search);
router.get('/details/:type/:id', getDetails);

export default router;