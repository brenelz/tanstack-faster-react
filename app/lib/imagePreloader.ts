import { createIsomorphicFn } from "@tanstack/react-start";

export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // First try native preload
        if (typeof document !== 'undefined') {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        }

        // Then load image
        const img = new Image();
        img.fetchPriority = 'high';
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
    });
}

export const preloadImageIds = createIsomorphicFn().client((ids: number[], size: number) => {
    return Promise.all(
        ids.map((id) =>
            preloadImage(`https://picsum.photos/id/${id}/${size}`)
        )
    );
});