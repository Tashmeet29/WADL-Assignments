// Importing required modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const staticDir = path.join(__dirname, 'static');

// Create a server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    pathname = (pathname === '/') ? '/index.html' : pathname;

    const filePath = path.join(staticDir, pathname);

    // Read the requested file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            // If file found, serve it with appropriate content type
            const contentType = getContentType(filePath);
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
});

// Function to get content type based on file extension
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

// Start the server
const port = process.env.PORT || 3000;
const host = 'localhost';
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
