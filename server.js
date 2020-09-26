const http = require('http');
const app = require('./main');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`🚀 server running @ http://localhost:4000`);
});