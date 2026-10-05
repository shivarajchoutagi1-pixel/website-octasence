import { put } from '@vercel/blob';
import fs from 'fs';

const file = fs.readFileSync('./london_financial_district.glb'); // adjust path if needed

const blob = await put('london_financial_district.glb', file, {
  access: 'public',
});

console.log("Uploaded URL:", blob.url);