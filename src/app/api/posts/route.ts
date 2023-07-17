import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subthreadit: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map(
      ({ subthreadit }) => subthreadit.id
    );
  }

  try {
    const { limit, page, subthreaditName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subthreaditName: z.string().nullish().optional(),
      })
      .parse({
        subthreaditName: url.searchParams.get("subthreaditName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    if (subthreaditName) {
      whereClause = {
        subthreadit: {
          name: subthreaditName,
        },
      };
    } else if (session) {
      whereClause = {
        subthreadit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subthreadit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
