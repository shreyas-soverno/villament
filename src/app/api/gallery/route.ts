import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Walk a directory tree under `baseDir`. This is defensive: it catches individual
// read errors, protects against deep recursion, and ensures returned paths are
// strictly inside the images root.
async function walkDir(
  baseDir: string,
  dir: string,
  out: string[],
  depth = 0,
  maxDepth = 12
) {
  if (depth > maxDepth) return;

  const full = path.join(baseDir, dir);
  let entries: fs.Dirent[];
  try {
    entries = await fs.promises.readdir(full, { withFileTypes: true });
  } catch (err) {
    // Log and skip this directory if it cannot be read
    console.warn(`gallery: cannot read directory ${full}:`, String(err));
    return;
  }

  for (const e of entries) {
    try {
      if (e.isDirectory()) {
        await walkDir(baseDir, path.join(dir, e.name), out, depth + 1, maxDepth);
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (!IMAGE_EXTENSIONS.includes(ext)) continue;

        // Construct absolute file path and ensure it's inside baseDir
        const fileFull = path.join(baseDir, dir, e.name);
        const relToBase = path.relative(baseDir, fileFull);
        if (relToBase.startsWith('..')) {
          console.warn('gallery: skipping file outside images root', fileFull);
          continue;
        }

        // Normalize to posix for URL paths
        const relPosix = relToBase.split(path.sep).join('/');
        out.push('/images/' + relPosix);
      }
    } catch (err) {
      console.warn(`gallery: skipping entry ${e.name} in ${full}:`, String(err));
      continue;
    }
  }
}

export async function GET() {
  try {
    const imagesRoot = path.join(process.cwd(), 'public', 'images');

    // Guard: if the images directory doesn't exist, return an empty groups list
    if (!fs.existsSync(imagesRoot)) {
      return NextResponse.json({ groups: [] });
    }

    const top = await fs.promises.readdir(imagesRoot, { withFileTypes: true });

    const groups: Array<{ name: string; images: string[] }> = [];

    for (const entry of top) {
      if (!entry.isDirectory()) continue;
      const groupName = entry.name;
      const collected: string[] = [];
      // walk nested folders and collect image paths relative to public/images
      try {
        await walkDir(imagesRoot, groupName, collected);
      } catch (err) {
        console.warn(`gallery: failed to walk group ${groupName}:`, String(err));
      }

      if (collected.length > 0) {
        groups.push({ name: groupName, images: collected });
      }
    }

    // Fallback: if there are no top-level directories, try to collect images directly in imagesRoot
    if (groups.length === 0) {
      const collected: string[] = [];
      try {
        const entries = await fs.promises.readdir(imagesRoot, { withFileTypes: true });
        for (const e of entries) {
          if (e.isFile() && IMAGE_EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
            collected.push('/images/' + e.name);
          }
        }
      } catch (err) {
        console.warn('gallery: could not read images root for fallback:', String(err));
      }

      if (collected.length > 0) groups.push({ name: 'Gallery', images: collected });
    }

    return NextResponse.json({ groups });
  } catch (err) {
    // Fail gracefully: log and return empty groups instead of a hard error status.
    console.error('Error reading gallery images (unexpected):', err);
    return NextResponse.json({ groups: [] });
  }
}
