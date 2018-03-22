const path = require('path');
const publicPath = path.resolve(__dirname, '../public');


app.use(express.static(publicPath));
const config = require('./config');
const app = express();


app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});