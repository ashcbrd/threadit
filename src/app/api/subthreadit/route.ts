import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubthreaditValidator } from "@/lib/validators/subthreadit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = SubthreaditValidator.parse(body);

    const subthreaditExists = await db.subthreadit.findFirst({
      where: {
        name,
      },
    });

    if (subthreaditExists) {
      return new Response("Subthreadit already exists", { status: 409 });
    }

    const subthreadit = await db.subthreadit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subthreaditId: subthreadit.id,
      },
    });

    return new Response(subthreadit.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create subthreadit", { status: 500 });
  }
}
