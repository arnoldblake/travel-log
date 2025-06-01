import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/dashboard")) {
    const session = await auth.api.getSession(event);
    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
