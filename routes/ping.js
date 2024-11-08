import { Router } from 'express';

const pingRouter = Router();

pingRouter.get('/ping', (req, res) => {
  res.send('Pong!');
});

export default pingRouter;
