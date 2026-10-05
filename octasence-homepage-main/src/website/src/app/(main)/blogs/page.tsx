import BlogsPageClient from './BlogsPageClient';
import { getBlogPosts } from './data/sanityBlogPosts';

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return <BlogsPageClient posts={posts} />;
}
