export async function GET() {
  const { SHOPIFY_API_KEY, SHOPIFY_SCOPES, SHOPIFY_REDIRECT_URI } = process.env;

  const installUrl = `https://accounts.shopify.com/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${encodeURIComponent(
    SHOPIFY_REDIRECT_URI
  )}&response_type=code&grant_options[]=per-user`;

  return Response.redirect(installUrl);
}
