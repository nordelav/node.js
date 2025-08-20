let posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post One' },
  { id: 3, title: 'Post One' },
  { id: 4, title: 'Post One' },

]

export const getPosts = (req, res, next) => {
  console.log(req.query);

  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit))
  } else {
    res.status(200).json(posts)
  }
};

export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  const post = posts.find((item) => item.id === id)
  if (!post) {
    const error = new Error(`A post with ${id} id not found`);
    return next(error);
  } else {

    res.status(200).json(post);
  }
};

export const createPost = (req, res, next) => {
  console.log(req.body);
  const id = new Date().toString();
  const newPost = {
    id: id,
    title: req.body.title
  }

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);

  }

  posts.push(newPost);
  res.status(201).json(posts);
}

export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // res.status(404).json({ msg: `A post with ${id} id not found` });
    const error = new Error(`A post with ${id} id not found`);
    return next(error);

  } else {

    post.title = req.body.title;
    res.status(200).json(posts);
  }
};

export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  //  console.log(post);
  if (!post) {
    // res.status(404).json({ msg: `A post with ${id} id not found` });
    const error = new Error(`A post with ${id} id not found`);
    return next(error);

  } else {
    posts = posts.filter((post) => post.id !== id)
    res.status(200).json(posts);
  }
}





