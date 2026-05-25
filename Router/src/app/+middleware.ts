export const unstable_settings = {
  matcher: {
    // Only run on GET requests
    methods: ["GET"],
    // Only run on API routes and specific paths
    patterns: ["/api/[...path]", "/admin/[...path]"],
  },
};

export default function middleware(request: any) {
  const token = request.headers.get("authorization");
  console.log(`Middleware executed for: ${request.url}`);

  if (token) {
    return new Response("Authorized", { status: 200 });
  } else {
    return Response.redirect(new URL("/onboarding", request.url));
  }
}
