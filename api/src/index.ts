const app = require('./app.ts');
const config = require('./config/config.ts');

const PORT = config.port || 3001;

app.listen(PORT, () => {
  console.log(`API server started on http://localhost:${PORT}`);
  }
);