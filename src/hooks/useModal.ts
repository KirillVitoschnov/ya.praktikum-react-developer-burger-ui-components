import { useState, useCallback, useEffect, useRef } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    const open = useCallback(() => {
        lastActiveElement.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, close]);

    useEffect(() => {
        if (!isOpen && lastActiveElement.current) {
            lastActiveElement.current.focus?.();
            lastActiveElement.current = null;
        }
    }, [isOpen]);

    return { isOpen, open, close };
};
