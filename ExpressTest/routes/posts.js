import e from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js"

const router = e.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/',createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);
  

export default router;
