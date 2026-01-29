# Alert Component – Implementation Plan

## 1. Overview

Implement a single **Alert** component that:
- Renders all content internally from props (heading + icon, copy, CTA, close).
- Uses **BEM** for all styles.
- Is **closable from itself** (internal visibility state; no React Context).
- Exposes a **clear, minimal API**.
- Uses **modern React** (function component, hooks).
- Matches the **Figma design**: light red background, orange border, dark red text and CTA, X in top-right.
- Uses **hex colours only** (no `rgba`/`rgb` where avoidable).
- Uses **pixels (px)** preferably for spacing, sizing, and typography.
- Defines **container padding** (16px) and **vertical rhythm** via margin-bottom of each element.
- Uses **TypeScript `type`** over `interface` where possible for props and config shapes.

---

## 2. Design Reference (from screenshot)

**Colours:** Use **hex only** (no `rgba` or `rgb`).

| Element | Spec |
|--------|------|
| **Container** | Rounded corners, light red/pink background `#FFF5F5`, thin orange border `#E89678`. Padding **16px** (see §2.1). |
| **Heading** | Bold, dark red/maroon `#B43232`. Mandatory icon (circle with checkmark) to the left of text, small gap. |
| **Body copy** | Regular weight, smaller than heading, same dark red `#B43232`. Multi-line; spacing follows vertical rhythm. |
| **CTA button** | Dark red/orange `#C84632`, rounded, white text and icon `#FFFFFF`. Icon left of label (“View more”). |
| **Close** | “X” in top-right, same dark red `#B43232`, ample padding from edges. |

### 2.1 Container padding

- **Padding** of the main container (`.alert`): **16px** on all sides (use `px`).
- Ensure the close button (top-right) sits within this inset: position it with `top: 16px`, `right: 16px` (or equivalent) so it aligns with the content padding.

### 2.2 Vertical rhythm (margin-bottom)

- **Vertical rhythm** is based on **margin-bottom** of each element (use `px`):
  - **Heading** (`.alert__heading`): **margin-bottom 6px**.
  - **Copy** (`.alert__copy`): **margin-bottom 12px**.
  - **CTA** (`.alert__cta`): **no margin-bottom**.

---

## 3. Component Structure (visual)

```
┌─────────────────────────────────────────────────────────────┐
│ [Icon]  Alert heading                                   [×]  │  ← heading + close
│         Aww yeah, you successfully read this important...   │  ← copy
│         [Icon] View more                                    │  ← CTA
└─────────────────────────────────────────────────────────────┘
```

- **Heading:** icon (required) + text, horizontal layout.
- **Copy:** paragraph under heading.
- **CTA:** button with icon + label under copy.
- **Close:** X button, top-right, absolute or flex so it doesn’t affect flow.

---

## 4. API (Alert props)

Single component, no context. All configuration via props. Define all prop and config shapes with **`type`** (not `interface`).

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `heading` | `{ icon: ReactNode; children: ReactNode }` | Yes | Heading icon (left) and text. |
| `copy` | `ReactNode` | Yes | Body text under heading. |
| `cta` | `{ icon: ReactNode; children: ReactNode; onClick?: () => void; href?: string }` | No | CTA icon + label; button or link. |
| `onClose` | `() => void` | No | Called when user clicks close (for parent to react, e.g. analytics). |

**Closable from itself:** When the user clicks the X, the Alert hides itself using internal state (`useState`). Optionally call `onClose()` so the parent can react. No context needed.

**Usage example:**

```tsx
<Alert
  heading={{ icon: <CheckIcon />, children: "Alert heading" }}
  copy="Aww yeah, you successfully read this important alert message..."
  cta={{ icon: <DotIcon />, children: "View more", onClick: () => {} }}
  onClose={() => {}}
/>
```

---

## 5. Internal behaviour

- **Visibility:** `const [visible, setVisible] = useState(true)`. On close click: `setVisible(false)` and `onClose?.()`. When `!visible`, return `null` (component unmounts itself from the tree visually).
- **Structure:** One component file that renders block + elements. Subcomponents (e.g. heading row, copy, CTA, close) can be small internal components or inline JSX; no context, no compound API.
- **Modern React:** Function component, `useState`, optional `useCallback` for handlers if needed.

---

## 6. BEM class plan

**Block:** `alert`

| Element | BEM class | Notes |
|---------|-----------|--------|
| Root | `.alert` | Block; padding, border, background, border-radius. |
| Heading row | `.alert__heading` | Flex row: icon + text. |
| Heading icon | `.alert__heading-icon` | Wrapper for mandatory left icon. |
| Copy | `.alert__copy` | Body text; margin below heading. |
| CTA | `.alert__cta` | Button or anchor. |
| CTA icon | `.alert__cta-icon` | Icon inside CTA. |
| Close | `.alert__close` | Button, position top-right (e.g. absolute). |

No modifiers for now. Colours (hex only), units (px preferably), container padding 16px (§2.1), and vertical rhythm via margin-bottom (§2.2) go in these classes.

---

## 7. File structure (minimal)

```
src/components/Alert/
├── Alert.tsx           # Single component: state, markup, BEM classes
├── Alert.module.css    # BEM styles (block + elements)
└── index.ts            # export Alert + types
```

One main component file, one CSS module, one barrel. No context, no separate context file.

---

## 8. Implementation order

1. **Alert.tsx**
   - Define props and config shapes with **`type`** (not `interface`). Props: `heading`, `copy`, `cta?`, `onClose?`.
   - `useState(true)` for visibility; on close: set false + `onClose?.()`; if not visible return `null`.
   - Markup: root `.alert`, then heading (icon + children), copy, optional CTA, close button. Use BEM class names from CSS module.
   - Close button: `aria-label="Close alert"`, click handler.

2. **Alert.module.css**
   - **Units:** use **pixels (px)** preferably for spacing, sizing, typography.
   - **Colours:** hex only (no `rgba`/`rgb`); use design reference values (§2).
   - **Container:** `.alert` — background, border (hex), border-radius, **padding: 16px** (§2.1), position relative.
   - **Vertical rhythm:** `.alert__heading` margin-bottom 6px; `.alert__copy` margin-bottom 12px; `.alert__cta` no margin-bottom (§2.2).
   - `.alert__heading`, `.alert__heading-icon`: flex, gap (px), font weight, hex colour.
   - `.alert__copy`: margin-bottom 12px, font size (px), hex colour.
   - `.alert__cta`, `.alert__cta-icon`: button/link styles (hex, px), hover/focus.
   - `.alert__close`: position absolute top 16px right 16px, size (px), hex colour, hover/focus.

3. **index.ts**
   - Export `Alert` and public types (`AlertProps`, `AlertHeadingConfig`, `AlertCTAConfig` or equivalent).

4. **App (or story)**
   - One example with heading, copy, CTA, and close to verify design and self-close behaviour.

---

## 9. Summary

- **Single component**, clear props API.
- **BEM** only; class names on container and elements as above.
- **No context**; closable via internal `useState` and optional `onClose`.
- **Modern React**: function component, hooks.
- **Simple**: one component file, one CSS module, one barrel.
- **Design**: light red container, orange border, dark red text and CTA, X top-right, matching the Figma screenshot.
- **Colours**: use **hex only** (no `rgba`/`rgb` where avoidable).
- **Units**: use **pixels (px)** preferably for styles.
- **Container padding**: **16px** on all sides; close button at top 16px, right 16px (§2.1).
- **Vertical rhythm**: heading margin-bottom 6px, copy margin-bottom 12px, CTA no margin-bottom (§2.2).
- **TypeScript**: use **`type`** over `interface` where possible.
