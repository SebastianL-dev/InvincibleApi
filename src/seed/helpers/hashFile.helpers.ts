// utils/hashFile.ts
import fs from "fs";
import crypto from "crypto";

/**
 *
 * @param filePath
 */
/**
 * Generates a hash for the contents of a file
 * to detect when updates it.
 *
 * @param {string} filePath - The path to the file whose hash is to be generated.
 * @returns {string} The hash of the file's contents as a hexadecimal string.
 */
export function getFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  return hashSum.digest("hex");
}
