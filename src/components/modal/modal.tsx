import s from "./modal.module.css";
import closeIcon from "../../images/closeIcon.png";
import { ReactNode, useEffect, useId } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";

interface Props {
    close: () => void;
    children: ReactNode;
    title: string;
    confirm?: boolean;
}

const modalRoot = typeof document !== "undefined"
    ? document.getElementById("modals")
    : null;

function cn(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function Modal({
                                  close,
                                  title,
                                  children,
                                  confirm = false,
                              }: Props) {
    const titleId = useId();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [close]);

    if (!modalRoot) return null;

    return createPortal(
        (
            <ModalOverlay close={close}>
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    className={cn(
                        s.modal,
                        confirm ? "pt-30 pb-30" : "pt-10 pr-10 pl-10 pb-15"
                    )}
                >
                    <header className={cn(s.modal__header, confirm && s.modal__header_confirm)}>
                        <h1
                            id={titleId}
                            className={confirm ? cn(s.modal__confirm, "text text_type_digits-large")
                                : "text text_type_main-large"}
                        >
                            {title}
                        </h1>

                        <button
                            type="button"
                            onClick={close}
                            aria-label="Закрыть модальное окно"
                            className={cn(s.modal__btn, confirm && s.modal__btn_confirm)}
                        >
                            <img className={s.modal__close} src={closeIcon} alt="закрыть" />
                        </button>
                    </header>

                    {children}
                </section>
            </ModalOverlay>
        ),
        modalRoot
    );
}
