import 'server-only';

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    url?: string;
    alt?: string;
  };
  excerpt?: string;
  content?: string;
  tags?: string[];
  status?: string;
  publishedAt?: string;
}

type SanityQueryResponse<T> = {
  result?: T;
};

type SanityTagValue =
  | string
  | {
      title?: string;
      name?: string;
      label?: string;
      value?: string;
    };

type SanityBlogPost = {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  mainImage?: {
    url?: string;
    alt?: string;
    asset?: {
      url?: string;
    };
  };
  excerpt?: string;
  content?: string;
  tags?: SanityTagValue[];
  status?: string;
  publishedAt?: string;
};

const SANITY_PROJECT_ID = 'h3s6cqpv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2023-10-01';
const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

const BLOG_POSTS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current)
  ] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    tags,
    status,
    publishedAt
  }
`;

function normalizeTag(tag: SanityTagValue): string | null {
  if (typeof tag === 'string') {
    const value = tag.trim();
    return value ? value : null;
  }

  const value = (tag.title ?? tag.name ?? tag.label ?? tag.value ?? '').trim();
  return value ? value : null;
}

function normalizeBlogPost(post: SanityBlogPost): BlogPost | null {
  if (!post._id || !post.title || !post.slug?.current) {
    return null;
  }

  const tags = (post.tags ?? [])
    .map(normalizeTag)
    .filter((tag): tag is string => Boolean(tag));

  return {
    _id: post._id,
    title: post.title,
    slug: {
      current: post.slug.current,
    },
    mainImage: post.mainImage
      ? {
          alt: post.mainImage.alt,
          url: post.mainImage.url ?? post.mainImage.asset?.url,
        }
      : undefined,
    excerpt: post.excerpt,
    content: post.content,
    tags,
    status: post.status,
    publishedAt: post.publishedAt,
  };
}

async function fetchFromSanity<T>(query: string): Promise<T> {
  const url = new URL(SANITY_QUERY_URL);
  url.searchParams.set('query', query);

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Sanity blog query failed with status ${response.status}`);
  }

  const data = (await response.json()) as SanityQueryResponse<T>;
  return (data.result ?? []) as T;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await fetchFromSanity<SanityBlogPost[]>(BLOG_POSTS_QUERY);

    return posts
      .map(normalizeBlogPost)
      .filter((post): post is BlogPost => post !== null);
  } catch {
    return [];
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug.current);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug.current === slug) ?? null;
}
