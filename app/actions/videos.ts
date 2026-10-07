'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const VideoInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, 'Title required'),
  event_name: z.string().min(2, 'Event required'),
  youtube_url_or_id: z.string().min(5, 'YouTube URL/ID required'),
  date: z.string().min(4, 'Date required'),
  description: z.string().default(''),
});

export async function upsertVideo(data: z.infer<typeof VideoInput>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const payload = VideoInput.parse(data);

  const { error } = await supabase.from('videos').upsert({
    ...(payload.id ? { id: payload.id } : {}),
    title: payload.title,
    event_name: payload.event_name,
    youtube_url_or_id: payload.youtube_url_or_id,
    date: payload.date,
    description: payload.description,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/videos');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteVideo(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/videos');
  revalidatePath('/admin');
  return { success: true };
}
