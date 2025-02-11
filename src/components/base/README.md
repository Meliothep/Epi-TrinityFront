# Component Name

Brief description of what the component does and when to use it.

## Usage

```tsx
import { ComponentName } from '@/components/ComponentName';

function Example() {
  return (
    <ComponentName
      prop1="value"
      prop2={123}
      onEvent={() => console.log('event fired')}
    />
  );
}
```

## Props

| Name    | Type         | Default     | Description                   |
| ------- | ------------ | ----------- | ----------------------------- |
| prop1   | `string`     | `undefined` | Description of prop1          |
| prop2   | `number`     | `0`         | Description of prop2          |
| onEvent | `() => void` | `undefined` | Called when something happens |

## Examples

### Basic Usage

```tsx
<ComponentName prop1="value" />
```

### With All Props

```tsx
<ComponentName
  prop1="value"
  prop2={123}
  onEvent={() => console.log('event fired')}
/>
```

## Best Practices

1. Do use the component for...
2. Don't use the component for...
3. Consider using X instead when...

## Related Components

- [RelatedComponent1]
- [RelatedComponent2]

## Implementation Notes

Any important implementation details or gotchas that other developers should know about.

## Changelog

| Version | Changes                |
| ------- | ---------------------- |
| 1.0.0   | Initial implementation |
| 1.1.0   | Added prop2            |