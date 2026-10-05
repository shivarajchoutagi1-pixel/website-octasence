'use client';

import DOMPurify from 'dompurify';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { type RefObject, useEffect, useRef, useState } from 'react';

import type { BlogPost } from './data/sanityBlogPosts';

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readTime(content?: string) {
  if (!content) return '2 min read';
  const textOnly = content.replace(/<[^>]+>/g, ' ');
  const words = textOnly.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function sanitizeHtml(content?: string) {
  if (!content) return '';
  return DOMPurify.sanitize(content);
}

const TAG_PALETTE = [
  { bg: 'bg-blue-500/12 border-blue-500/28', text: 'text-blue-400' },
  { bg: 'bg-indigo-500/12 border-indigo-500/28', text: 'text-indigo-400' },
  { bg: 'bg-cyan-500/12 border-cyan-500/28', text: 'text-cyan-400' },
  { bg: 'bg-violet-500/12 border-violet-500/28', text: 'text-violet-400' },
];

function tagColor(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) {
    h = (h * 31 + tag.charCodeAt(i)) % TAG_PALETTE.length;
  }
  return TAG_PALETTE[h];
}

function AmbientCanvas({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const lines = Array.from({ length: 10 }, () => ({
      y: Math.random(),
      drift: 0.00005 + Math.random() * 0.00015,
      freq: 0.08 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.025 + Math.random() * 0.05,
      width: 0.3 + Math.random() * 0.9,
    }));

    const draw = (ts: number) => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const t = ts * 0.001;

      lines.forEach((line) => {
        const alpha =
          (Math.sin(t * line.freq + line.phase) * 0.5 + 0.5) * line.alpha;
        const y = ((line.y + t * line.drift) % 1) * height;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#4f7fff';
        ctx.lineWidth = line.width;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.restore();
      });

      for (let p = 0; p < 25; p++) {
        const px = (Math.sin(t * 0.25 + p * 2.4) * 0.5 + 0.5) * width;
        const py = (Math.cos(t * 0.18 + p * 1.7) * 0.5 + 0.5) * height;
        const pa = (Math.sin(t * 0.4 + p) * 0.5 + 0.5) * 0.12;
        const pr = 0.8 + Math.sin(t * 0.35 + p * 0.9) * 0.6;
        ctx.save();
        ctx.globalAlpha = pa;
        ctx.fillStyle = '#4f7fff';
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
    />
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link href={`/blogs/${post.slug.current}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.07,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] cursor-pointer transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.055]"
      >
        <div className="h-px w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />

        {post.mainImage?.url ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.mainImage.url}
              alt={post.mainImage.alt || post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/80 to-transparent" />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-500/8 via-indigo-500/6 to-transparent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              className="h-12 w-12 text-blue-500/20"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
        )}

        <div className="p-6">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => {
                const color = tagColor(tag);
                return (
                  <span
                    key={tag}
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color.bg} ${color.text}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <h2
            className="mb-2 line-clamp-2 text-[17px] font-semibold leading-snug text-white transition-colors group-hover:text-blue-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="text-[11px] text-white/30">
              {formatDate(post.publishedAt)}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/30">
                {readTime(post.content)}
              </span>
              <div className="flex items-center gap-1 text-[12px] font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                Read
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function getRelatedPosts(posts: BlogPost[], currentPost: BlogPost, limit = 3) {
  const currentTags = new Set(currentPost.tags ?? []);

  return posts
    .filter((post) => post._id !== currentPost._id)
    .map((post) => ({
      post,
      score: (post.tags ?? []).filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const aDate = a.post.publishedAt
        ? new Date(a.post.publishedAt).getTime()
        : 0;
      const bDate = b.post.publishedAt
        ? new Date(b.post.publishedAt).getTime()
        : 0;
      return bDate - aDate;
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

function RelatedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] text-left transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05]"
    >
      {post.mainImage?.url ? (
        <div className="relative h-40 overflow-hidden">
          <img
            src={post.mainImage.url}
            alt={post.mainImage.alt || post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/85 via-[#0d1520]/20 to-transparent" />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-500/10 via-indigo-500/8 to-transparent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            className="h-12 w-12 text-blue-500/20"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      )}

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(post.tags ?? []).slice(0, 2).map((tag) => {
            const color = tagColor(tag);
            return (
              <span
                key={tag}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color.bg} ${color.text}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <h3
          className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-blue-200"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/55">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-white/[0.07] pt-4 text-[11px] text-white/30">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{readTime(post.content)}</span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug.current}`} className="col-span-full block">
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] transition-all duration-300 hover:border-blue-500/30 md:flex-row"
      >
        <div className="absolute left-0 top-0 z-10 h-px w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />

        <div className="relative h-60 flex-shrink-0 overflow-hidden md:h-auto md:w-2/5">
          {post.mainImage?.url ? (
            <>
              <img
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1520]/60" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/12 via-indigo-500/8 to-transparent">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                className="h-16 w-16 text-blue-500/20"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center p-8">
          <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-blue-400">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Featured
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => {
                const color = tagColor(tag);
                return (
                  <span
                    key={tag}
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color.bg} ${color.text}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <h2
            className="mb-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-blue-200 md:text-3xl"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/55">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4">
            <span className="text-[12px] text-white/30">
              {formatDate(post.publishedAt)}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[12px] text-white/30">
              {readTime(post.content)}
            </span>
            <div className="ml-auto flex items-center gap-1.5 text-sm font-medium text-blue-400">
              Read article
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function PostDetail({
  post,
  posts,
}: {
  post: BlogPost | null;
  posts: BlogPost[];
}) {
  const relatedPosts = post ? getRelatedPosts(posts, post) : [];

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <Link
        href="/blogs"
        className="group mb-10 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      {!post ? (
        <p className="text-white/40">Post not found.</p>
      ) : (
        <>
          {post.mainImage?.url && (
            <div className="relative mb-10 h-72 overflow-hidden rounded-2xl">
              <img
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/70 to-transparent" />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const color = tagColor(tag);
                return (
                  <span
                    key={tag}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${color.bg} ${color.text}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <h1
            className="mb-5 text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-6xl"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {post.title}
          </h1>

          <div className="mb-8 flex items-center gap-4 border-b border-white/[0.07] pb-8">
            <span className="text-[12px] text-white/35">
              {formatDate(post.publishedAt)}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[12px] text-white/35">
              {readTime(post.content)}
            </span>
          </div>

          {post.excerpt && (
            <p
              className="mb-10 border-l-2 border-blue-500/40 pl-5 text-xl leading-[1.9] text-white/72 md:text-[1.45rem]"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}
            >
              {post.excerpt}
            </p>
          )}

          {post.content && (
            <div
              className="blog-article prose prose-invert max-w-none text-white/70 prose-headings:text-white prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-2xl prose-p:text-[18px] prose-p:leading-[2] prose-strong:text-white md:prose-lg"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.content),
              }}
            />
          )}

          <div className="mt-16 border-t border-white/[0.07] pt-10">
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-10 bg-blue-500/40" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300">
                    Related Blogs
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <RelatedBlogCard key={relatedPost._id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-white/13 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}

function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState<string>('All');

  const allTags = [
    'All',
    ...Array.from(new Set(posts.flatMap((post) => post.tags ?? []))),
  ];
  const filtered =
    activeTag === 'All'
      ? posts
      : posts.filter((post) => post.tags?.includes(activeTag));
  const [featured, ...rest] = filtered;

  return (
    <>
      {allTags.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-200 ${
                activeTag === tag
                  ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                  : 'border-white/[0.08] bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}

      {filtered.length === 0 && (
        <div className="py-24 text-center text-sm text-white/30">
          No posts found.
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured && <FeaturedCard post={featured} />}

          {rest.map((post, index) => (
            <BlogCard key={post._id} post={post} index={index + 1} />
          ))}
        </div>
      )}
    </>
  );
}

export default function BlogsPageClient({
  posts,
  selectedSlug,
}: {
  posts: BlogPost[];
  selectedSlug?: string;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const selectedPost = selectedSlug
    ? (posts.find((post) => post.slug.current === selectedSlug) ?? null)
    : null;

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-x-hidden bg-[#0c1018] selection:bg-blue-500 selection:text-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      <main className="relative">
        <section className="relative overflow-hidden pb-16 pt-8 md:pb-20 md:pt-12">
          <AmbientCanvas containerRef={pageRef as RefObject<HTMLDivElement>} />

          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 6 }, (_, index) => (
              <motion.div
                key={index}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                style={{ top: `${15 + index * 12}%`, width: '15%', opacity: 0 }}
                animate={{ left: ['-15%', '115%'], opacity: [0, 0.3, 0.3, 0] }}
                transition={{
                  duration: 6 + (index % 3) * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 2.1,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/28 bg-blue-500/12 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-blue-400">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Insights & Updates
              </div>

              <h1
                className="mb-6 text-4xl font-black leading-[1.02] tracking-[-0.01em] sm:text-5xl md:text-6xl"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <span className="text-white">The </span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  Octasence Journal
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-white/55">
                Expert analysis, case studies, and engineering insights from the
                frontiers of structural health monitoring.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <section
          className="relative z-10 py-16"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(79,127,255,0.06), transparent 60%), #0d1520',
          }}
        >
          <div className="container mx-auto max-w-6xl px-6">
            <AnimatePresence mode="wait">
              {selectedSlug ? (
                <PostDetail key="detail" post={selectedPost} posts={posts} />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogList posts={posts} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;600;700;800;900&display=swap');
        body {
          font-family: 'Outfit', sans-serif;
        }
        .blog-article {
          font-family: 'Fraunces', serif;
        }
        .blog-article p {
          color: rgba(255, 255, 255, 0.76);
          letter-spacing: 0.002em;
        }
        .blog-article h2,
        .blog-article h3,
        .blog-article h4 {
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.02em;
        }
        .blog-article ul,
        .blog-article ol {
          font-size: 1.05rem;
          line-height: 1.95;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
