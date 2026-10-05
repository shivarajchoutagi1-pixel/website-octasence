import { notFound } from 'next/navigation';

import BlogsPageClient from '../BlogsPageClient';
import {
  getBlogPostBySlug,
  getBlogPosts,
} from '../data/sanityBlogPosts';

export const revalidate = 300;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [posts, post] = await Promise.all([
    getBlogPosts(),
    getBlogPostBySlug(slug),
  ]);

  if (!post) notFound();

  return <BlogsPageClient posts={posts} selectedSlug={slug} />;
}
