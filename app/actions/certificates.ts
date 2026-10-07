'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CertificateInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, 'Title required'),
  issuer: z.string().min(2, 'Issuer required'),
  status: z.enum(['completed', 'in_progress']),
  issue_date: z.string().optional().nullable(),
  credential_url: z.string().url().optional().nullable().or(z.literal('')),
  image_url: z.string().url('A valid image URL is required'),
  category: z.enum(['AI', 'Cybersecurity', 'IT Support', 'Data', 'Marketing']),
  display_order: z.coerce.number().int().default(0),
});

export async function upsertCertificate(data: z.infer<typeof CertificateInput>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const payload = CertificateInput.parse(data);

  const { error } = await supabase.from('certificates').upsert({
    ...(payload.id ? { id: payload.id } : {}),
    title: payload.title,
    issuer: payload.issuer,
    status: payload.status,
    issue_date: payload.status === 'completed' ? (payload.issue_date || null) : null,
    credential_url: payload.credential_url || null,
    image_url: payload.image_url,
    category: payload.category,
    display_order: payload.display_order,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/certificates');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/certificates');
  revalidatePath('/admin');
  return { success: true };
}
