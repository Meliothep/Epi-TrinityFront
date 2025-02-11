import { cn } from "./utils";

// Common class patterns
export const styles = {
    // Layout
    container: "container mx-auto px-4 py-8",
    section: "space-y-6",
    grid: {
        default: "grid gap-6",
        responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    },
    
    // Components
    card: {
        root: "rounded-lg border bg-card text-card-foreground shadow-sm",
        header: "p-6 border-b",
        content: "p-6",
        footer: "p-6 border-t",
    },
    
    // Interactive elements
    button: {
        base: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        icon: "h-10 w-10 p-0",
        iconLeft: "mr-2 -ml-1",
        iconRight: "ml-2 -mr-1",
    },
    
    // Form elements
    input: {
        root: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    },
    
    // Utility classes
    flex: {
        center: "flex items-center justify-center",
        between: "flex items-center justify-between",
        start: "flex items-center justify-start",
        end: "flex items-center justify-end",
    },
    
    // Animation classes
    animation: {
        bounce: "animate-bounce",
        spin: "animate-spin",
        pulse: "animate-pulse",
    }
} as const;

// Helper function to combine component styles
export function getStyles(component: keyof typeof styles, ...modifiers: string[]) {
    const baseStyle = styles[component];
    if (typeof baseStyle === 'string') {
        return cn(baseStyle, ...modifiers);
    }
    return baseStyle;
} 