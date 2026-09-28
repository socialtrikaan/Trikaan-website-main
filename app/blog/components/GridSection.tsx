import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import type { Post } from "@/lib/blog";

// Figma GridSection (node 1:2732): 3-col card grid + "Load More" button.
export default function GridSection({ posts }: { posts: Post[] }) {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-12">
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                author={post.author.name}
                href={`/blog/${post.slug}`}
                image={post.coverImage}
              />
            </StaggerItem>
          ))}
        </Stagger>
        {/* ponytail: static button , all posts already render, no pagination needed for 7 posts */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className="rounded-[26px] border-[1.5px] border-ink px-7 py-3.5 font-geist text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Load More Articles
          </button>
        </div>
      </Container>
    </section>
  );
}
