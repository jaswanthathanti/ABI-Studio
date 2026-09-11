const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function process() {
  const heroPath = path.join(__dirname, '../public/assets/hero-studio-clean.jpg');
  const equipDir = path.join(__dirname, '../public/assets/equipment');
  const studioDir = path.join(__dirname, '../public/assets/studio');

  if (!fs.existsSync(equipDir)) fs.mkdirSync(equipDir, { recursive: true });
  if (!fs.existsSync(studioDir)) fs.mkdirSync(studioDir, { recursive: true });

  // 1. Drone: Center top (x: 520, y: 100, w: 336, h: 200)
  await sharp(heroPath)
    .extract({ left: 500, top: 90, width: 376, height: 220 })
    .resize(600, 600, {
      fit: 'contain',
      background: { r: 5, g: 10, b: 18, alpha: 1 }
    })
    .toFile(path.join(equipDir, 'equip-drone.jpg'));
  console.log('Created equip-drone.jpg');

  // 2. Gimbal: Left pedestal (x: 230, y: 340, w: 180, h: 280)
  await sharp(heroPath)
    .extract({ left: 240, top: 340, width: 190, height: 280 })
    .resize(600, 600, {
      fit: 'contain',
      background: { r: 5, g: 10, b: 18, alpha: 1 }
    })
    .toFile(path.join(equipDir, 'equip-gimbal.jpg'));
  console.log('Created equip-gimbal.jpg');

  // 3. DSLR: Mirrorless camera on pedestal (x: 350, y: 390, w: 250, h: 250)
  await sharp(heroPath)
    .extract({ left: 350, top: 390, width: 250, height: 250 })
    .resize(600, 600, {
      fit: 'cover'
    })
    .toFile(path.join(equipDir, 'equip-dslr.jpg'));
  console.log('Created equip-dslr.jpg');

  // 4. Lenses: Upright master lenses (x: 540, y: 410, w: 280, h: 280)
  await sharp(heroPath)
    .extract({ left: 540, top: 410, width: 280, height: 280 })
    .resize(600, 600, {
      fit: 'cover'
    })
    .toFile(path.join(equipDir, 'equip-lenses.jpg'));
  console.log('Created equip-lenses.jpg');

  // 5. Lighting: Overhead Halo ring light (x: 440, y: 40, w: 500, h: 260)
  await sharp(heroPath)
    .extract({ left: 440, top: 40, width: 500, height: 260 })
    .resize(600, 600, {
      fit: 'contain',
      background: { r: 5, g: 10, b: 18, alpha: 1 }
    })
    .toFile(path.join(equipDir, 'equip-lighting.jpg'));
  console.log('Created equip-lighting.jpg');

  // 6. About Studio: Panoramic studio view
  await sharp(path.join(__dirname, '../public/assets/services/service-studio.jpg'))
    .resize(1600, 900, { fit: 'cover' })
    .toFile(path.join(studioDir, 'about-studio.jpg'));
  console.log('Created about-studio.jpg');
}

process().catch(console.error);
