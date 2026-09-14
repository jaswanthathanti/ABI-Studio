import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.3"/>
    </linearGradient>
  </defs>

  <!-- Background Base with subtle border -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="108" fill="none" stroke="url(#borderGrad)" stroke-width="12"/>

  <!-- Viewfinder 4 Corner Brackets -->
  <g stroke="url(#cyanGrad)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Top-Left -->
    <path d="M 116 186 V 144 C 116 128 128 116 144 116 H 186"/>
    <!-- Top-Right -->
    <path d="M 326 116 H 368 C 384 116 396 128 396 144 V 186"/>
    <!-- Bottom-Right -->
    <path d="M 396 326 V 368 C 396 384 384 396 368 396 H 326"/>
    <!-- Bottom-Left -->
    <path d="M 186 396 H 144 C 128 396 116 384 116 368 V 326"/>
  </g>

  <!-- Central Camera Lens Aperture -->
  <circle cx="256" cy="256" r="76" stroke="url(#cyanGrad)" stroke-width="30" fill="none"/>
  <circle cx="256" cy="256" r="34" fill="url(#cyanGrad)"/>

  <!-- Glowing Focus Accent Dot -->
  <circle cx="356" cy="156" r="14" fill="#00e5ff"/>
</svg>`;

async function createIco(pngBuffers) {
  const count = pngBuffers.length;
  let offset = 6 + count * 16;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(count, 4); // count

  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width === 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height === 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    offset += item.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  const publicDir = path.resolve('public');
  
  // 1. Write favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('Created public/favicon.svg');

  // 2. Generate PNGs using sharp
  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  const svgBuffer = Buffer.from(svgContent);

  for (const s of sizes) {
    const outPath = path.join(publicDir, s.name);
    await sharp(svgBuffer)
      .resize(s.size, s.size)
      .png()
      .toFile(outPath);
    console.log(`Created public/${s.name}`);
  }

  // 3. Generate favicon.ico containing 16x16, 32x32, 48x48 PNG frames
  const icoSizes = [16, 32, 48];
  const icoFrames = [];
  for (const size of icoSizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    icoFrames.push({ width: size, height: size, buffer: buf });
  }

  const icoBuffer = await createIco(icoFrames);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created public/favicon.ico with 16x16, 32x32, 48x48 layers');
}

run().catch(console.error);
