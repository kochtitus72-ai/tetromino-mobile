import { getAllPosts } from "@/lib/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

// This tells Next.js which pages to pre-render
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const fullPath = path.join(process.cwd(), "content/posts", `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return (
        <article className="max-w-2xl mx-auto p-8 prose lg:prose-xl">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">{data.title}</h1>
                <p className="text-gray-500 mt-2">{data.date}</p>
            </header>
            <div className="text-gray-800 leading-relaxed">
                {/* This renders the Markdown text as HTML */}
                <MDXRemote source={content} />
            </div>
            <footer className="mt-12 border-t pt-6">
                <a href="/blog" className="text-blue-500 hover:underline">
                    ← Back to Blog
                </a>
            </footer>
        </article>
    );
}
