import { default as app } from '../src/app';

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API server started on http://localhost:${PORT}`);
  }
);