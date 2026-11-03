declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ADMIN_EMAIL?: string;
    GEMINI_API_KEY?: string;
    BUCKET?: R2Bucket;
  }
}
