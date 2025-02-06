import fs from 'fs';
import path from 'path';
import {Base64Image} from "app/src-electron/type";
import axios from "axios";

export function mkdirRecursive(dir: string) {
  if (!fs.existsSync(dir)) {
    mkdirRecursive(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

export function bufferToBase64Image(buffer: Buffer, type: string) {
  return `data:image/${type};base64,${buffer.toString('base64')}`;
}

export function base64ToFile(base64: string, filePath: string) {
  mkdirRecursive(path.dirname(filePath));
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filePath, dataBuffer);
}

export async function loadBase64ImageFromURL(url: string, filename: string): Promise<Base64Image> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  const type = path.extname(filename).replace('.', '');
  bufferToBase64Image(buffer, type);
  return {
    value: bufferToBase64Image(buffer, type),
    type: type,
    filename: filename
  }
}
