import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://grasslanelawnco.com';
  const now = new Date();
  return [
    { url: base, lastModified: now, priority: 1, changeFrequency: 'weekly' },
    { url: `${base}/services`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/about`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/reviews`, lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${base}/contact`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' }
  ];
}
