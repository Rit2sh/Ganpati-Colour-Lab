import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects /admin with HTTP Basic Auth using ADMIN_USER / ADMIN_PASSWORD.
 * If either variable is missing the admin area is disabled (404), never open.
 * Replace with a full session system (e.g. Auth.js + the AdminUser table)
 * before giving access to more than one person.
 */
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse("Not found", { status: 404 });

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(":");
      if (u === user && rest.join(":") === pass) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        res.headers.set("Cache-Control", "no-store");
        return res;
      }
    } catch {
      /* fall through to 401 */
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Ganpati Colour Lab Admin", charset="UTF-8"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
