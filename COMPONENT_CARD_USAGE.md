# ComponentCard Usage Guide

## Overview

`ComponentCard` is an Astro component that isolates shadcn/ui components with their required styling (`global.css`) while preventing interference with the rest of the site's styling.

## Why Use ComponentCard?

- **Isolated Styling**: Imports `global.css` only where needed, avoiding conflicts with main site styles
- **Prose Protection**: Uses `not-prose` class to prevent typography plugin from affecting UI components
- **Consistent Preview**: Provides a clean, styled container for showcasing components in MDX pages

## Basic Usage

### In MDX Files

```mdx
---
title: My Component
description: A cool component
type: component
source: /src/components/ui/my-component.tsx
---

import { MyComponent } from "@/components/ui/my-component.tsx";
import ComponentCard from "@/components/ComponentCard.astro";

## Description

Some text about your component...

<ComponentCard title="Component Variants">
  <MyComponent />
  <MyComponent variant="secondary" />
  <MyComponent variant="destructive" />
</ComponentCard>
```

### Props

- `title` (optional): Display a title above the component preview
- `class` (optional): Additional CSS classes to apply to the card wrapper

## Example: Button Component

```mdx
import { Button } from "@/components/ui/button.tsx";
import ComponentCard from "@/components/ComponentCard.astro";

<ComponentCard title="Button Variants">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</ComponentCard>
```

## Styling Architecture

### What's Isolated

1. **global.css** is imported only in `ComponentCard.astro`
2. Layout files (`main.astro`) and page files (`[...slug].astro`) do NOT import `global.css`
3. Each shadcn component inside a `ComponentCard` gets the proper Tailwind theme variables

### What's Not Affected

- Main site typography styles
- Layout styles
- Any styles outside the ComponentCard

## Tips

- Always wrap shadcn/ui components in `ComponentCard` when using them in MDX pages
- The card provides a neutral background that works in both light and dark modes
- Components are centered and spaced evenly within the preview area
- Use the `title` prop to label different component variations
