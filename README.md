# Amagoz (product-amazo)

A client-side product listing/detail app built with React, TypeScript, Redux Toolkit (+ RTK Query) and Tailwind CSS, backed by the [DummyJSON](https://dummyjson.com) products API.

## Tech stack

- **React 19** + **TypeScript**, built with **Vite**


- **Redux Toolkit** for local UI/filter state, **RTK Query** for server state/caching


- **Tailwind CSS v4** for styling (light/dark mode via a `dark` class on `<html>`)


- **React Router 8** for routing, with route-level code splitting


- **React Compiler** (babel plugin) — auto-memoizes components/values at build time, so manual `useMemo`/`useCallback`/`React.memo` are only used where they fix a correctness issue, not for raw perf


- **ESLint** + **Prettier** for linting/formatting

## Setup instructions

**Prerequisites:** Node.js 20+ and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check + production build (outputs to dist/)
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint

# format the codebase with Prettier
npm run format
```

No environment variables or `.env` file are required — the app talks directly to the public `https://dummyjson.com` API (configured in [src/utils/appConfig.ts](src/utils/appConfig.ts)).

### Deploying

The project is set up for **Netlify**: [netlify.toml](netlify.toml) defines the build command (`npm run build`), publish directory (`dist`), the SPA fallback redirect (`/* → /index.html`) required for client-side routing to survive a page refresh/direct link, and baseline security headers (CSP, HSTS, X-Frame-Options, etc.).

## Assumptions made

- **No backend/auth of my own.** DummyJSON is used as-is; the signed-in user shown in the account menu ([DUMMY_USER](src/utils/constants.ts)) is a hardcoded placeholder — there's no real authentication.


- **Cart is decorative.** The cart icon/badge in the header is a static placeholder (always shows `0`); no cart state, persistence, or checkout flow was in scope.


- **Filtering/pagination happen client-side.** The product list is fetched once per query (`limit=0`, i.e. "all products") and then filtered/paginated in the browser ([utilityFunctions.ts](src/utils/utilityFunctions.ts)). This matches DummyJSON's limited server-side filtering (it can't combine category + brand + price range in one query) and keeps the UI snappy for a catalog of this size. It would not scale to a very large catalog without moving filtering server-side.


- **Footer/legal links are placeholders.** `FOOTER_LINK_SECTIONS`, `FOOTER_SOCIAL_LINKS`, and `FOOTER_LEGAL_LINKS` in [constants.ts](src/utils/constants.ts) point at `#` since there are no real destination pages for "Careers", "Privacy Notice", social profiles, etc.


- **Persisted state is limited to what's safe in localStorage:** search history, sidebar open/closed, and accent color. Filters (category/price/brand/page) intentionally reset on reload rather than persisting, since stale filters silently hiding products felt like the wrong default.


- **Single currency/locale (USD, `en`)** — `formatPrice` assumes USD; no i18n was implemented.

## Architectural decisions

- **Feature-colocated folders (`SubComponents`).** Each screen/component owns a `SubComponents/` folder for pieces used only by it (e.g. `FiltersSidebar/SubComponents/BrandFilter.tsx`), while `src/components/` holds genuinely shared, reusable primitives (`Dialog`, `Pagination`, `Tooltip`, `RatingStars`, …). This keeps ownership obvious and avoids a flat "everything is shared" component directory.


- **RTK Query for all server data**, Redux slices only for local/UI state (`filtersSlice`, `uiSlice`, `searchSlice`). RTK Query gives caching, loading/error states, and de-duped requests for free instead of hand-rolled `useEffect` fetching.


- **Debounced filter inputs.** Category/brand checkboxes and the price range are debounced (`FILTERS_DEBOUNCE_MS`, `SEARCH_DEBOUNCE_MS`) before they hit the Redux store/API, so rapid clicking or typing doesn't refilter/refetch on every keystroke.


- **Per-component `ErrorBoundary`.** Rather than one boundary at the app root, most components wrap themselves in `<ErrorBoundary>` so a rendering error in, say, one `ProductCard` doesn't take down the entire grid.


- **Route-level code splitting.** `ProductListing` and `ProductDetail` are lazy-loaded (`src/routes/elements.tsx`) so the initial bundle only ships the app shell; each page downloads its own chunk on navigation.


- **Typed Redux hooks (`useAppSelector`/`useAppDispatch`)** wrap `react-redux`'s hooks with the store's `RootState`/`AppDispatch` so components never need manual state typing, and selectors destructure a single slice (e.g. `useAppSelector((state) => state.filters)`) rather than one `useAppSelector` call per field.


- **Tailwind color tokens centralized** in [colorConstants.ts](src/utils/colorConstants.ts) (`COLORS`) and [accentColorConstants.ts](src/utils/accentColorConstants.ts) (user-selectable accent) instead of literal Tailwind classes scattered through components — makes a11y contrast fixes and theme changes a one-file edit.


- **Accessibility and Core Web Vitals treated as first-class**, not an afterthought bolted on later: modal focus trapping, keyboard-operable dropdown rows, `aria-expanded`/`aria-label`s on icon-only controls, image dimensions to prevent layout shift, lazy-loading below-the-fold images, and eager/high-priority loading for the likely LCP image.

## Improvements if given more time

- **Full ARIA combobox pattern** for the header search (arrow-key navigation between suggestions/history, `role="listbox"`/`role="option"`) instead of the current keyboard-operable-but-simpler button-list approach.


- **Accessible tooltip dismissal.** The current `Tooltip` is a pure-CSS hover component; it isn't dismissible via Escape (WCAG 1.4.13). Fixing this properly means a small JS-driven tooltip (or adopting a library) across every usage site.


- **Cart & checkout**, real authentication, and a wishlist — the obvious next product features given the header already has the UI affordances for them.


- **Virtualized product grid** for very large result sets, instead of relying on `PAGE_SIZE` pagination alone.


- **Server-side filtering/pagination** if/when the catalog grows past what's reasonable to fetch and filter client-side in one request.


- **Automated tests.** There's currently no test suite (unit tests for `utilityFunctions.ts`'s pure functions, component tests for filter/search interactions, and a couple of Playwright/Cypress smoke tests for the golden path would be the priority order).


- **CI pipeline** (typecheck + lint + tests + build) gating merges, rather than relying on manual `npm run build`/`lint` before pushing.


- **Visual regression / Lighthouse CI** to keep the accessibility and performance work in this pass from regressing silently over time.


- **i18n and multi-currency support** if the app needed to serve non-US audiences.
