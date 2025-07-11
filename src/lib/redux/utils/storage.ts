import React from 'react';

// SSR-safe storage utility
export const storage = {
    setItem: (key: string, value: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    },

    getItem: (key: string): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },

    removeItem: (key: string) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    },

    clear: () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
};

// Hook for client-side storage operations
export const useClientStorage = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}; 