# Welcome to Your Documentation Site

This is your new documentation site built with RobinDoc. Everything is already set up and ready to go!

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000/docs](http://localhost:3000/docs) to see your documentation.

### 3. Add Your Content

Edit the Markdown files in the `content/` directory. Each file automatically becomes a page:

- `content/README.md` → `/docs`
- `content/how-it-works.md` → `/docs/how-it-works`

## Project Structure

```
your-app/
├── content/                   # Your documentation files
│   ├── README.md              # Documentation homepage content
│   └── how-it-works.md        # Example page
├── src/
│   └── app/
│       ├── layout.tsx         # Root layout (Header/Footer)
│       ├── docs/
│       │   ├── robindoc.ts    # RobinDoc configuration
│       │   ├── layout.tsx     # Docs layout (Sidebar)
│       │   └── [[...segments]]/
│       │       └── page.tsx   # Dynamic route handler
│       └── globals.css        # Global styles
└── package.json
```

## Customization

### Update Header & Footer

Edit `src/app/layout.tsx` to customize your header logo and footer:

```tsx
<Header logo={<>Your Brand</>} />
<Footer copyright="© 2026 Your Company" />
```

### Change Documentation Path

Edit `src/app/docs/robindoc.ts` to change the base path:

```tsx
basePath: "/your-path",  // Change from "/docs" to your preferred path
```

### Add More Pages

Simply add new Markdown files to the `content/` directory. They'll automatically appear in the sidebar and be accessible via URL.

### Customize Styles

Edit `src/app/globals.css` to add your own styles or override RobinDoc's theme variables.

## Building for Production

```bash
npm run build
npm start
```

## Learn More

- Read [How It Works](./how-it-works.md) to understand the app structure
- Visit the [RobinDoc documentation](https://robindoc.com/docs) for advanced features
- Check out [configuration options](https://robindoc.com/docs/02-structure) for custom setups

## Need Help?

- Check the [RobinDoc documentation](https://robindoc.com/docs)
- Review the [example implementations](https://github.com/your-org/robindoc/tree/main/examples)
- Open an issue on [GitHub](https://github.com/your-org/robindoc/issues)

Happy documenting! 🚀
