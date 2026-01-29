# PrAlert

A reusable **Alert** component for React: heading with icon, body copy, optional CTA (button or link), and a close control. Built with TypeScript, BEM styling, and CSS variables.

**[Live preview →](https://peter-popluhar.github.io/pr-alert/)**

---

## Features

- **Dismissible** – Alert hides itself when the user clicks the close (×) button; optional `onAlertClose` callback for side effects.
- **Heading + icon** – Bold heading with a mandatory leading icon (e.g. check-circle).
- **Body copy** – Supporting text below the heading.
- **Optional CTA** – Button or link with icon and label (“View more” style).
- **Accessibility** – `role="alert"`, `aria-label` on close, decorative images with `alt=""`, `:focus-visible` styles, `prefers-reduced-motion` respected.
- **Styling** – BEM classes, CSS variables for colors (in `Alert.module.css`), px-based spacing and vertical rhythm.

---

## Installation

Clone the repo and install dependencies:

```bash
npm install
# or
pnpm install
```

Run locally:

```bash
npm run dev
# or
pnpm run dev
```

---

## Usage

```tsx
import { Alert } from "./components/Alert";

<Alert
  heading="Alert heading"
  copy="Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
  cta={{
    ctaCopy: "View more",
    ctaAction: () => console.log("CTA clicked"),
  }}
  onAlertClose={() => console.log("Alert closed")}
/>
```

### Props

| Prop           | Type              | Required | Description                                      |
|----------------|-------------------|----------|--------------------------------------------------|
| `heading`      | `string`          | Yes      | Heading text (shown next to the heading icon).   |
| `copy`         | `string`          | Yes      | Body text below the heading.                     |
| `cta`          | `AlertCTAProps`   | No       | Optional call-to-action (button or link).        |
| `onAlertClose` | `() => void`      | No       | Called when the user closes the alert.           |

### CTA config (`cta`)

| Property   | Type           | Description                                                                 |
|------------|----------------|-----------------------------------------------------------------------------|
| `ctaCopy`  | `string`       | Button or link label (e.g. "View more").                                    |
| `ctaAction`| `() => void`   | Click handler when CTA is a button (omit when using `href`).               |
| `href`     | `string`       | When set, CTA renders as a link; `ctaAction` is ignored.                   |

**Example – CTA as link:**

```tsx
<Alert
  heading="New feature"
  copy="Check out the docs."
  cta={{ ctaCopy: "Read docs", href: "https://example.com/docs" }}
/>
```

---

## Project structure

```
src/components/Alert/
├── Alert.tsx         # Main component (visibility, layout, close)
├── AlertCTA.tsx      # CTA subcomponent (button or link)
├── Alert.module.css  # BEM styles + CSS variables
└── index.ts          # Public export
```

---

## Styling

Colors are defined as CSS variables in `Alert.module.css`:

- `--alert-border`, `--alert-background`, `--alert-text`
- `--alert-cta-text`, `--alert-cta-bg`, `--alert-cta-bg-hover`
- `--alert-focus`, `--alert-close-color`

Override them (e.g. in your app’s global CSS or a wrapper) to theme the alert. Spacing uses a 16px container padding and vertical rhythm (heading margin-bottom 6px, copy margin-bottom 12px).

---

## Tech stack

- React 19
- TypeScript
- Vite
- CSS Modules, BEM

---

## License

Private. See repository for details.
