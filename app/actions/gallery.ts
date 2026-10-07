'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const GalleryInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, 'Title required'),
  event_name: z.string().min(2, 'Event name required'),
  image_url: z.string().url('Image URL required'),
  date: z.string().min(4, 'Date required'),
  display_order: z.coerce.number().int().default(0),
});

export async function upsertGalleryPhoto(data: z.infer<typeof GalleryInput>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const payload = GalleryInput.parse(data);

  const { error } = await supabase.from('gallery_photos').upsert({
    ...(payload.id ? { id: payload.id } : {}),
    title: payload.title,
    event_name: payload.event_name,
    image_url: payload.image_url,
    date: payload.date,
    display_order: payload.display_order,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/gallery');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteGalleryPhoto(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/gallery');
  revalidatePath('/admin');
  return { success: true };
}
