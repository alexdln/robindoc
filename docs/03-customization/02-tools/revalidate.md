# Revalidation and Caching

Robindoc uses in-memory caching to optimize performance by storing parsed documentation structure and avoiding redundant parsing and data requesting operations.

## How Caching Works

When you call `initializeRobindoc`, it creates an in-memory cache of your documentation structure. This cache includes:

- Parsed page structure (`pages` object)
- Navigation tree (`tree` object)
- All metadata and configuration

The cache persists for the lifetime of your application process, meaning:

- **In traditional SSR / build step**: The cache is shared across all requests within the same Node.js process
- **In serverless environments**: Each function invocation may have its own cache, depending on your platform's execution model

## Cache Option

The `cache` option controls whether the in-memory cache should be used across requests:

```tsx filename="app/docs/robindoc.ts" tab="TypeScript" switcher clone="jsx|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData, revalidate } =
  initializeRobindoc(
    {
      configuration: {
        sourceRoot: "../docs",
        basePath: "/docs",
      },
      items: "auto",
    },
    {
      cache: true,
    },
  );
```

### `cache: true` (Recommended)

When enabled, the parsed structure is cached in memory after the first load. Subsequent calls to `Page`, `Sidebar`, `getMetadata`, `getPageData`, and other utilities reuse the cached data without re-parsing and re-loading the structure.

### `cache: false`

When disabled (default), the structure is re-parsed on every request. However, **important**: even with `cache: false`, Robindoc still optimizes parsing within a single request cycle. If multiple components (e.g., `Page` and `Sidebar`) are rendered in the same request, they will share the parsed structure during that request processing.

> **Note**: In serverless environments (AWS Lambda, Vercel Functions, etc.), the cache behavior may be less important since each invocation might be a fresh process. However, some platforms do reuse warm instances, so caching can still provide benefits.

## Manual Revalidation

Even with caching enabled, you can manually trigger a cache refresh using the `revalidate` function returned from `initializeRobindoc`:

```tsx filename="app/docs/robindoc.ts" tab="TypeScript" switcher clone="jsx|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, revalidate } = initializeRobindoc(
  {
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
    },
    items: "auto",
  },
  {
    cache: true,
  },
);
```

### Using Revalidate

The `revalidate` function accepts an optional `background` parameter:

```tsx
// Synchronous revalidation (waits for completion)
await revalidate();

// Background revalidation (doesn't block)
await revalidate(true);
```

### When to Revalidate

#### 1. On-Demand Revalidation API Route

Create an API endpoint to trigger revalidation when your documentation changes:

```tsx filename="app/api/revalidate-docs/route.ts" tab="TypeScript" switcher clone="jsx|JavaScript|app/api/revalidate-docs/route.js"
import { revalidate } from "@/app/docs/robindoc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Verify the request is authorized (e.g., webhook secret)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Revalidate the cache
  await revalidate();

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

#### 2. Webhook Integration

Connect this to your Git provider's webhook to automatically revalidate when documentation is updated:

```tsx filename="app/api/webhook/github/route.ts" tab="TypeScript"
import { revalidate } from "@/app/docs/robindoc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  // Verify webhook signature (GitHub example)
  // ... verification logic ...

  // Revalidate on push to main branch
  if (payload.ref === "refs/heads/main") {
    await revalidate(true); // Background revalidation
  }

  return NextResponse.json({ received: true });
}
```

#### 3. Scheduled Revalidation

For documentation that updates on a schedule:

```tsx filename="app/api/cron/revalidate/route.ts" tab="TypeScript"
import { revalidate } from "@/app/docs/robindoc";
import { NextResponse } from "next/server";

export async function GET() {
  // Verify cron secret
  if (process.env.CRON_SECRET !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await revalidate(true); // Background revalidation
  return NextResponse.json({ revalidated: true });
}
```

#### 4. Development Hot Reload

In development, you might want to disable caching or set up automatic revalidation:

```tsx filename="app/docs/robindoc.ts" tab="TypeScript"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, revalidate } = initializeRobindoc(
  {
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
    },
    items: "auto",
  },
  {
    // Disable cache in development for real-time updates
    cache: process.env.NODE_ENV === "production",
  },
);
```

## Best Practices

### 1. Enable Caching in Production

```tsx
{
  cache: process.env.NODE_ENV === "production",
}
```

### 2. Use Background Revalidation for Webhooks

When handling webhooks or scheduled tasks, use background revalidation to avoid blocking:

```tsx
await revalidate(true); // Non-blocking
```
