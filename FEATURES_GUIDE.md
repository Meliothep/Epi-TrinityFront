## 🎭 Animation System

Trinity uses the `tailwindcss-motion` plugin to provide a robust and accessible animation system. This plugin automatically handles reduced motion preferences and provides a comprehensive set of utilities for creating smooth, performant animations.

### Base Animations

```typescript
// Opacity animations
"motion-opacity-in-0"  // Fade in from transparent
"motion-opacity-out-0" // Fade out to transparent

// Translation animations
"motion-translate-y-in-100"  // Slide up from below
"motion-translate-y-out-100" // Slide down and out
"motion-translate-x-in-100"  // Slide in from right
"motion-translate-x-out-100" // Slide out to right

// Scale animations
"motion-scale-in-75"  // Scale up from 75%
"motion-scale-out-75" // Scale down to 75%

// Rotation animations
"motion-rotate-in-180"  // Rotate in 180 degrees
"motion-rotate-out-180" // Rotate out 180 degrees
```

### Animation Presets

```typescript
// Common animation patterns
"motion-preset-pulse-sm"  // Subtle pulse animation
"motion-preset-bounce"    // Bouncy animation
"motion-preset-slide-up"  // Slide up and fade in
```

### Modifiers

1. **Duration**
```typescript
"motion-duration-200" // Fast
"motion-duration-300" // Normal
"motion-duration-500" // Slow
```

2. **Delay**
```typescript
"motion-delay-100" // Short delay
"motion-delay-300" // Medium delay
"motion-delay-500" // Long delay
```

3. **Easing**
```typescript
// Spring physics
"motion-ease-spring-smooth"  // Smooth spring
"motion-ease-spring-bouncy"  // Bouncy spring
"motion-ease-spring-snappy"  // Snappy spring

// Standard easing
"motion-ease-in-quart"
```

4. **Loop**
```typescript
"motion-translate-y-loop-25"     // Infinite loop
"motion-translate-y-loop-25/reset" // Loop with reset
"motion-loop-twice"              // Loop twice
```

### Property-Specific Modifiers

```typescript
// Apply different timing to different properties
"motion-duration-300/translate motion-translate-y-in-100" // 300ms for translation
"motion-duration-500/opacity motion-opacity-in-0"         // 500ms for opacity

// Apply different delays to different properties
"motion-delay-500/rotate motion-rotate-in-180" // 500ms delay for rotation
"motion-opacity-in-0"                          // Immediate fade
```

### Common Use Cases

1. **Modal/Dialog**
```typescript
const Modal = () => (
  <div class={cn(
    // Backdrop
    "fixed inset-0 bg-background/80 backdrop-blur-sm",
    "motion-opacity-in-0 motion-duration-200"
  )}>
    <div class={cn(
      // Content
      "fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6",
      "motion-translate-x-in-100 motion-duration-300 motion-ease-spring-smooth"
    )}>
      {/* Modal content */}
    </div>
  </div>
)
```

2. **List Items with Staggered Animation**
```typescript
const List = () => (
  <For each={items}>
    {(item, index) => (
      <div class={cn(
        "motion-preset-slide-up",
        { style: { "--motion-delay": `${index() * 100}ms` } }
      )}>
        {item}
      </div>
    )}
  </For>
)
```

3. **Interactive Elements**
```typescript
const Button = () => (
  <button class={cn(
    "rounded-lg px-4 py-2 bg-primary text-primary-foreground",
    "motion-preset-pulse-sm motion-ease-spring-smooth"
  )}>
    Click me
  </button>
)
```

4. **Loading States**
```typescript
const LoadingStates = () => (
  <div>
    {/* Skeleton */}
    <div class="motion-preset-pulse-sm h-4 w-24 bg-muted rounded" />
    
    {/* Spinner */}
    <div class="motion-rotate-loop-360 w-5 h-5 border-2 border-primary rounded-full" />
    
    {/* Shimmer */}
    <div class="motion-translate-x-loop-100 relative overflow-hidden" />
  </div>
)
```

### Best Practices

1. **Performance**
- Use transform-based animations (`translate`, `scale`, `rotate`) instead of layout properties
- Avoid animating layout properties like `width`, `height`, or `margin`
- Use hardware-accelerated properties (`transform`, `opacity`) for smooth animations

2. **Accessibility**
- The plugin automatically handles reduced motion preferences
- No need for manual `motion-safe:` prefixes
- Provide meaningful alternatives for users with reduced motion

3. **Timing Guidelines**
- Entry animations: 300-500ms
- Exit animations: 200-300ms
- Hover states: 200ms
- Loading states: Use presets

4. **Animation Composition**
- Combine multiple properties for complex animations
- Use property-specific modifiers for fine-grained control
- Layer animations with different delays for natural movement

### Examples in Trinity

1. **Shopping Cart**
```typescript
// Cart panel slide in
"motion-translate-x-in-100 motion-duration-300 motion-ease-spring-smooth"

// Cart items stagger
"motion-preset-slide-up"

// Add to cart button feedback
"motion-preset-pulse-sm motion-ease-spring-smooth"
```

2. **Product Gallery**
```typescript
// Image hover
"motion-scale-in-95 motion-duration-200"

// Loading skeleton
"motion-preset-pulse-sm"

// Gallery navigation
"motion-translate-x-in-100 motion-ease-spring-smooth"
```

3. **Form Feedback**
```typescript
// Success message
"motion-preset-slide-up motion-duration-300"

// Error shake
"motion-preset-bounce motion-ease-spring-snappy"

// Loading spinner
"motion-rotate-loop-360"
``` 