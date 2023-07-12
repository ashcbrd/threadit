import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubthreaditSubscriptionValidator } from "@/lib/validators/subthreadit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { subthreaditId } = SubthreaditSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subthreaditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You are not subscribed to this subthreadit.", {
        status: 400,
      });
    }

    // check if user is the creator of subthreadit

    const subthreadit = await db.subthreadit.findFirst({
      where: {
        id: subthreaditId,
        creatorId: session.user.id,
      },
    });

    if (subthreadit) {
      return new Response("You can't unsubscribe from your own subthreadit", {
        status: 400,
      });
    }

    await db.subscription.delete({
      where: {
        userId_subthreaditId: {
          subthreaditId,
          userId: session.user.id,
        },
      },
    });

    return new Response(subthreaditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }

    return new Response("Could not unsubscribe, please try again later.", {
      status: 500,
    });
  }
}
