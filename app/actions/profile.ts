'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function uploadProfilePhoto(prevState: any, formData: FormData) {
  try {
    const file = formData.get('photo') as File;
    if (!file || file.size === 0) {
      return { error: 'Please choose an image file to upload.' };
    }

    // Validate image type
    if (!file.type.startsWith('image/')) {
      return { error: 'Only image files (JPG, PNG, WebP) are allowed.' };
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return { error: 'Image size exceeds 10MB limit.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
    await fs.mkdir(publicAssetsDir, { recursive: true });

    const targetPath = path.join(publicAssetsDir, 'profile.jpg');
    await fs.writeFile(targetPath, buffer);

    revalidatePath('/');
    revalidatePath('/admin');

    return { 
      success: true, 
      message: 'Profile photo successfully updated!',
      timestamp: Date.now() 
    };
  } catch (err: any) {
    return { error: err.message || 'Failed to save profile photo.' };
  }
}

export async function resetProfilePhoto() {
  try {
    const targetPath = path.join(process.cwd(), 'public', 'assets', 'profile.jpg');
    await fs.unlink(targetPath).catch(() => {});
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to reset photo.' };
  }
}
