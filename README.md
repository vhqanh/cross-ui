# @aioz/cross-ui — Shared UI Kit

Cross-platform component library built with **Tamagui** — one source of truth for both **React Native / Expo** and **React / Next.js**.

---

## 📦 Repo Structure

```
ui-kit/                         ← this repo (use as git submodule)
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/     ← Button, Text, Input, Card, Badge, Avatar, Divider…
│       │   ├── tokens/         ← Design tokens + Tamagui config
│       │   └── index.ts        ← Single barrel export
│       ├── package.json        ← name: "@aioz/cross-ui"
│       └── tsup.config.ts      ← builds CJS + ESM + .d.ts
├── scripts/
│   └── setup.js                ← one-command setup for consumer repos
└── package.json                ← pnpm workspace root
```

---

## 🚀 Adding to a consumer repo (as submodule)

### Step 1 — Add the submodule

```bash
# From inside your consumer repo (mobile or web)
git submodule add https://github.com/my-org/ui-kit.git ui
git submodule update --init --recursive
```

### Step 2 — Run the setup script

```bash
node ui/scripts/setup.js
```

This script:

1. Installs all required peer dependencies (`tamagui`, `@tamagui/core`, `react`, etc.)
2. Adds `"@aioz/cross-ui": "file:./ui/packages/ui"` to your `package.json`
3. Runs install (pnpm / yarn / npm) to link the local package

### Step 3 — Wrap your app with UIProvider

**React Native / Expo** (`App.tsx`):

```tsx
import { UIProvider } from '@aioz/cross-ui'

export default function App() {
  return (
    <UIProvider>
      <RootNavigator />
    </UIProvider>
  )
}
```

**Next.js** (`app/layout.tsx` or `pages/_app.tsx`):

```tsx
import { UIProvider } from '@aioz/cross-ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  )
}
```

---

## 🧩 Usage

```tsx
import { Button, Text, Input, Card, Badge, Avatar, Divider } from '@aioz/cross-ui'

// Button
<Button variant="primary" size="md" onPress={() => {}}>
  Get Started
</Button>

<Button variant="outline" disabled>
  Disabled
</Button>

// Text
<Text variant="h1">Hello World</Text>
<Text variant="body" muted>Secondary text</Text>

// Input
<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

<Input
  label="Password"
  errorText="Password is required"
  secureTextEntry
/>

// Card
<Card variant="elevated" padded="lg" hoverable>
  <Text variant="h3">Card Title</Text>
</Card>

// Badge
<Badge variant="primary" dot>Active</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="danger">Failed</Badge>

// Avatar
<Avatar src="https://..." fallback="John Doe" size="lg" />
<Avatar fallback="AB" size="md" shape="square" />

// Divider
<Divider />
<Divider label="OR" />
```

---

## 🎨 Design Tokens

```tsx
import { tokens } from '@aioz/cross-ui/tokens'

// Use directly in inline styles or extend the Tamagui config
tokens.space.$4 // → 16
tokens.color.primary600 // → '#2563eb'
tokens.radius.$3 // → 8
```

---

## 🔄 Keeping submodule up to date

```bash
# In consumer repo
cd ui
git pull origin main
cd ..
git add ui
git commit -m "chore: update ui-kit submodule"
```

Or use the Git shortcut from the root:

```bash
git submodule update --remote ui
```

---

## ➕ Adding new components

1. Create `packages/ui/src/components/MyComponent.tsx`
2. Export it from `packages/ui/src/index.ts`
3. Run `pnpm build` to compile
4. Push to `main` — consumer repos update via `git submodule update --remote`

---

## 🛠 Local development of the kit itself

```bash
pnpm install
pnpm dev          # watch mode — rebuilds on file changes
pnpm typecheck    # TypeScript check
pnpm build        # production build
```

---

## 📋 Component Checklist

| Component  | Variants                                       | Mobile | Web |
| ---------- | ---------------------------------------------- | ------ | --- |
| Button     | primary · secondary · outline · ghost · danger | ✅     | ✅  |
| Text       | h1–h4 · body · label · caption · code          | ✅     | ✅  |
| Input      | size · error · helper                          | ✅     | ✅  |
| Card       | default · elevated · flat · ghost              | ✅     | ✅  |
| Badge      | default · primary · success · warning · danger | ✅     | ✅  |
| Avatar     | circle · square, xs–xl                         | ✅     | ✅  |
| Divider    | plain · labeled                                | ✅     | ✅  |
| UIProvider | theme · defaultTheme                           | ✅     | ✅  |

---

## 📄 License

MIT — © AIOZ
