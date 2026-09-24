// Script to generate high-resolution PNG icons for PWA install compliance
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, r, g, b, isMaskable = false) {
  // Create a raw RGBA buffer
  const buffer = Buffer.alloc(width * height * 4);
  const cx = width / 2;
  const cy = height / 2;
  const outerR = width * 0.42;
  const innerR = width * 0.28;
  const safeMargin = isMaskable ? 0.35 : 0.44;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep dark blue cyberpunk background (#03071e to #0d1b4b)
      let red = Math.floor(3 + (y / height) * 10);
      let green = Math.floor(7 + (y / height) * 20);
      let blue = Math.floor(30 + (y / height) * 45);
      let alpha = 255;

      // Outer ring
      if (Math.abs(dist - outerR) < width * 0.015) {
        red = 79; green = 195; blue = 247;
      }
      // Inner circle core
      else if (dist < innerR) {
        red = 14; green = 28; blue = 75;
        // Waveform bars in center
        const relX = (x - cx) / (innerR * 0.7);
        const relY = Math.abs(y - cy) / (innerR * 0.7);
        if (Math.abs(relX) < 0.7 && relY < 0.6) {
          const barIndex = Math.floor((relX + 0.7) * 5);
          const barHeights = [0.25, 0.45, 0.6, 0.5, 0.3];
          if (relY < (barHeights[barIndex] || 0.2)) {
            red = 167; green = 139; blue = 250;
          }
        }
      }

      buffer[idx] = red;
      buffer[idx + 1] = green;
      buffer[idx + 2] = blue;
      buffer[idx + 3] = alpha;
    }
  }

  // Format minimal uncompressed PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT chunk with scanline filter bytes
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  let scanlineOffset = 0;
  for (let y = 0; y < height; y++) {
    scanlines[scanlineOffset++] = 0; // Filter: None
    buffer.copy(scanlines, scanlineOffset, y * width * 4, (y + 1) * width * 4);
    scanlineOffset += width * 4;
  }

  const deflated = zlib.deflateSync(scanlines);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(12 + length);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeInt32BE(crc, 8 + length);
  return chunk;
}

// Simple CRC32 implementation
function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    for (let j = 0; j < 8; j++) {
      const bit = (byte ^ crc) & 1;
      crc = (crc >>> 1) ^ (bit ? 0xEDB88320 : 0);
      byte >>>= 1;
    }
  }
  return (crc ^ -1) | 0;
}

const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, 79, 195, 247));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, 79, 195, 247));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, 79, 195, 247, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, 79, 195, 247));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPNG(64, 64, 79, 195, 247));

console.log('PNG PWA icons generated successfully in public/');
