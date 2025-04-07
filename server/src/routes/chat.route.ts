import { Router } from 'express';
import { validateRequest } from '../middlewares/validation.middleware';
import * as chatController from '../controllers/chat.controller';
import { createChatSchema, getChatsParamSchema } from '../request/chat.request';
import { ValidationSource } from '../utils/common-schema';

const router = Router();

router.post(
    '/',
    validateRequest(createChatSchema, ValidationSource.BODY),
    chatController.createChat
);

router.get('/:userId',
    validateRequest(getChatsParamSchema, ValidationSource.PARAMS),
    chatController.getChats);

export default router;
