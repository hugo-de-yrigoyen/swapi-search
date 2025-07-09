import { login, verify } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const authRoutes = [
  {
    method: 'POST',
    path: '/login',
    handler: login,
  },
  {
    method: 'GET',
    path: '/verify',
    options: {
      pre: [{ method: authenticateToken }],
    },
    handler: verify,
  },
];

export default authRoutes;