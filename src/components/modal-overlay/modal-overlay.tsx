import { ReactNode, MouseEvent } from "react";
import s from "./modal-overlay.module.css";

interface Props {
    children: ReactNode;
    close: () => void;
}

export default function ModalOverlay({ children, close }: Props) {
    const closeModal = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    return (
        <div
            className={s.modal__overlay}
            onClick={closeModal}
            role="presentation"
            aria-hidden="true"
        >
            {children}
        </div>
    );
}
