export function waitForElement(selector: string, timeoutMs: number = 10000): Promise<HTMLElement|null> {
    return Promise.race([
        new Promise<HTMLElement>(resolve => {
            const element: HTMLElement|null = document.querySelector(selector);
            if (element) {
                return resolve(element);
            }

            const observer = new MutationObserver(mutations => {
                const element: HTMLElement|null = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }),
        new Promise<null>(resolve => setTimeout(resolve, timeoutMs, null)),
    ]);
}