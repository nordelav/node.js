import express from 'express';
import url from 'url';
import path from 'path';
import posts from './routes/posts.js';
import { logger } from './middleware/middleware.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//! body parser

app.use(express.json());

// !For sending form data
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

// !Logger middleware
app.use(logger);


// static folder
app.use(express.static(path.join(__dirname, 'public')));

// router usage
app.use('/api/posts', posts);

// !Total Routes filter

app.use(notFound);
// ! Error Handler
app.use(errorHandler);




// app.get('/', (req, res) => {
//   //   // res.send('Hello World!');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//   //   // res.send('Say about');
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));

// });


app.listen(port, () => console.log(`Server is running on port ${port}`));