# @aioz/cross-ui — Shared UI Kit

Cross-platform component library built with **Tamagui** — one source of truth for both **React Native / Expo** and **React / Next.js**.

---

## 📦 Repo Structure

```
cross-ui/                       ← this repo (cloned as a submodule inside consumer apps)
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/     ← Button, Text, Input, Card, Badge, Avatar, Divider…
│       │   ├── tokens/         ← Design tokens + Tamagui config
│       │   └── index.ts        ← Single barrel export
│       ├── package.json        ← name: "@aioz/cross-ui"
│       └── tsup.config.ts      ← builds CJS + ESM + .d.ts
└── package.json                ← pnpm workspace root
```

---

## 🚀 Adding to a consumer repo (as submodule)

### Prerequisites

- **Node.js** ≥ 18 (20 recommended)
- **pnpm** ≥ 8 — required to install and build inside the submodule

---

### Step 1 — Add the submodule

From the **root of your consumer repo**:

```bash
git submodule add https://github.com/aioz-network/cross-ui.git packages/cross-ui
git submodule update --init --recursive
```

---

### Step 2 — Build the submodule

```bash
cd packages/cross-ui
pnpm install
pnpm build
cd ../..
```

> Run `pnpm dev` instead of `pnpm build` if you want **watch mode** while editing components.

**React Native 0.81+:** do not add `@types/react-native` — there is no matching `@types` release on npm for 0.81. TypeScript types ship inside the `react-native` package; `packages/ui` lists `react-native` under `devDependencies` so `pnpm install` at the submodule root (this repo) resolves correctly.

---

### Step 3 — Link to your consumer app

Add `@aioz/cross-ui` to your consumer app's `package.json` manually:

```json
{
  "dependencies": {
    "@aioz/cross-ui": "file:./packages/cross-ui/packages/ui"
  }
}
```

Then run install from the **consumer root** to create the symlink in `node_modules`:

```bash
# pnpm
pnpm install

# yarn
yarn install

# npm
npm install
```

> This step is required — without it the consumer cannot resolve `@aioz/cross-ui` even if the submodule is built.

---

### Step 4 — Wrap your app with UIProvider

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

### Step 5 — Run your consumer app

Use your app's normal commands from the **consumer root**:

- **Expo / React Native:** `npx expo start`, `pnpm android`, `pnpm ios`
- **Next.js / Vite:** `pnpm dev`, `npm run dev`

---

### IDE — Go to component source (Ctrl+click / ⌘+click)

`package.json` của `@aioz/cross-ui` khai báo điều kiện **`development`** trong `exports`: TypeScript sẽ resolve type từ **`src/`** thay vì chỉ `dist/*.d.ts`, nên Cursor / VS Code nhảy thẳng vào component gốc.

Trong **`tsconfig.json` của app consumer**, thêm:

```json
{
  "compilerOptions": {
    "customConditions": ["development"]
  }
}
```

Metro / Webpack / Vite vẫn dùng nhánh `import` / `require` → **`dist`** (không đọc `development`). Gói npm cũng ship kèm thư mục **`src`** (xem `files` trong `packages/ui/package.json`).

---

### Cloning a repo that already has this submodule

```bash
# Option A — clone with submodules in one step
git clone --recurse-submodules <consumer-repo-url>

# Option B — already cloned, init submodule after
git submodule update --init --recursive
```

Then build and link:

```bash
# 1. Build the submodule
cd packages/cross-ui && pnpm install && pnpm build && cd ../..

# 2. Install from consumer root to create the symlink
pnpm install   # or yarn / npm
```

---

### Troubleshooting

| Issue                                 | What to try                                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Cannot find module '@aioz/cross-ui'` | Make sure `file:./packages/cross-ui/packages/ui` is in `dependencies`, then run `pnpm install` from consumer root |
| Errors from `dist/` or missing types  | `cd packages/cross-ui && pnpm install && pnpm build`                                                              |
| `pnpm: command not found`             | `corepack enable && corepack prepare pnpm@10.8.0 --activate`                                                      |
| Submodule folder empty                | `git submodule update --init --recursive` from consumer root                                                      |
| Stale components after editing        | `cd packages/cross-ui && pnpm build` (or keep `pnpm dev` running)                                                 |

---

## 🔄 Keeping submodule up to date

```bash
cd packages/cross-ui
git pull origin main
pnpm install   # if deps changed
pnpm build
cd ../..
git add packages/cross-ui
git commit -m "chore: update cross-ui submodule"
```

Or in one line from consumer root:

```bash
git submodule update --remote packages/cross-ui
cd packages/cross-ui && pnpm install && pnpm build && cd ../..
```

---

## 🧩 Usage

```tsx
import { Button, Text, Input, Card, Badge, Avatar, Divider } from '@aioz/cross-ui'

// Button
<Button variant="primary" size="md" onPress={() => {}}>Get Started</Button>
<Button variant="outline" disabled>Disabled</Button>

// Text
<Text variant="h1">Hello World</Text>
<Text variant="body" muted>Secondary text</Text>

// Input
<Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
<Input label="Password" errorText="Password is required" secureTextEntry />

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

tokens.space.$4 // → 16
tokens.color.primary600 // → '#2563eb'
tokens.radius.$3 // → 8
```

---

## ➕ Adding new components

1. Create `packages/ui/src/components/MyComponent.tsx`
2. Export from `packages/ui/src/index.ts`
3. Run `pnpm build` inside `packages/cross-ui`
4. Push to `main` — consumer repos update via `git submodule update --remote`

---

## 🛠 Standalone development

```bash
pnpm install
pnpm dev          # watch mode
pnpm build        # production build
pnpm typecheck
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
