import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subthreadit = await db.subthreadit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subthreadit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subthreadit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        t/{subthreadit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed
        initialPosts={subthreadit.posts}
        subthreaditName={subthreadit.name}
      />
    </>
  );
};

export default page;
