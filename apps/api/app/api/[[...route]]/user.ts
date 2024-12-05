import { Hono } from "hono";
import { prisma } from "@repo/db";
import { auth } from "@repo/auth";

const app = new Hono()
   .get("/self", async (c) => {
    const currentUser = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!currentUser) {
      return c.json(
        {
          message: "Not logged in",
          status: 400,
        },
        400,
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.user.id,
      },
    });
    
    return c.json(
      {
        user,
      },
      200,
    );
  })
  .get("/all", async (c) => {
    const cursor = c.req.query("cursor");
    const take = c.req.query("take");
    if (!c.req.url.includes("?cursor=")) {
      return c.redirect("?cursor=");
    }

    const users = await prisma.user.findMany({
      take: parseInt(take!) || 10,
      skip: 1,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });

    const nextCursor = users.length > 0 ? users[users.length - 1].id : null;

    return c.json(
      {
        nextCursor,
        users,
      },
      200,
    );
  })
  .get("/:id", async (c) => {
    const userId = c.req.param("id");
    if (!userId) {
      return c.json({
        message: "user id is required",
        status: 400,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return c.json(
      {
        user,
      },
      200,
    );
  });

export default app;
