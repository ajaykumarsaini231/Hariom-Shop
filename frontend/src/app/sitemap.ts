import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scaleupweb.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage sabse upar
    },
    {
      url: `${baseUrl}/services`, // Services page (High Ranking ke liye zaroori)
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, 
    },
    {
      url: `${baseUrl}/projects`, // Check karein: project ya projects?
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}