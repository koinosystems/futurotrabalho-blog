import { Hono } from "hono";

import type { BlogBindings } from "../environment";

export const healthRoute = new Hono<{ Bindings: BlogBindings }>();

healthRoute.get("/", async (c) => {
  try {
    await c.env.BLOG_DB.prepare("SELECT 1").first();
    return c.json({
      status: "OK",
      service: "futurotrabalho-blog",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        status: "DEGRADED",
        service: "futurotrabalho-blog",
        error: String(error),
      },
      503,
    );
  }
});
