import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Order {
    id: string;
    namaLengkap: string;
    nomorTelepon: string;
    jumlahPesanan: number;
    metodePengambilan: 'delivery' | 'pickup';
    alamat: string;
    catatan: string;
    waktuPesan: string;
}

const orders: Order[] = [];

const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function parseBody(req: http.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', reject);
    });
}

function sendJSON(res: http.ServerResponse, statusCode: number, data: any): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function serveStaticFile(res: http.ServerResponse, filePath: string): void {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

function validateOrder(data: any): string[] {
    const errors: string[] = [];
    
    if (!data.namaLengkap || typeof data.namaLengkap !== 'string' || data.namaLengkap.trim() === '') {
        errors.push('Nama lengkap harus diisi');
    }
    
    if (!data.nomorTelepon || typeof data.nomorTelepon !== 'string' || data.nomorTelepon.length < 10) {
        errors.push('Nomor telepon tidak valid');
    }
    
    if (!data.jumlahPesanan || typeof data.jumlahPesanan !== 'number' || data.jumlahPesanan < 1) {
        errors.push('Jumlah pesanan minimal 1');
    }
    
    if (!data.metodePengambilan || !['delivery', 'pickup'].includes(data.metodePengambilan)) {
        errors.push('Metode pengambilan tidak valid');
    }
    
    if (data.metodePengambilan === 'delivery' && (!data.alamat || data.alamat.trim() === '')) {
        errors.push('Alamat harus diisi untuk delivery');
    }
    
    return errors;
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const pathname = url.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (pathname === '/api/orders') {
        if (req.method === 'GET') {
            const sortedOrders = [...orders].sort((a, b) => 
                new Date(b.waktuPesan).getTime() - new Date(a.waktuPesan).getTime()
            );
            sendJSON(res, 200, sortedOrders);
            return;
        }
        
        if (req.method === 'POST') {
            try {
                const data = await parseBody(req);
                const errors = validateOrder(data);
                
                if (errors.length > 0) {
                    sendJSON(res, 400, { message: errors[0], errors });
                    return;
                }
                
                const order: Order = {
                    id: crypto.randomUUID(),
                    namaLengkap: data.namaLengkap.trim(),
                    nomorTelepon: data.nomorTelepon.trim(),
                    jumlahPesanan: data.jumlahPesanan,
                    metodePengambilan: data.metodePengambilan,
                    alamat: data.alamat ? data.alamat.trim() : '',
                    catatan: data.catatan ? data.catatan.trim() : '',
                    waktuPesan: new Date().toISOString()
                };
                
                orders.push(order);
                sendJSON(res, 201, order);
            } catch (e) {
                sendJSON(res, 400, { message: 'Invalid JSON' });
            }
            return;
        }
    }

    const publicDir = path.join(__dirname, '..', 'public');
    let filePath = path.join(publicDir, pathname);
    
    if (pathname === '/adminkerupuk' || pathname === '/adminkerupuk/') {
        filePath = path.join(publicDir, 'admin.html');
    } else if (pathname === '/' || pathname === '') {
        filePath = path.join(publicDir, 'index.html');
    } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    serveStaticFile(res, filePath);
});

const PORT = process.env.PORT || 5000;
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
