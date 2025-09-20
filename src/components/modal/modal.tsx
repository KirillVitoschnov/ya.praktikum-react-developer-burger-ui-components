import s from "./modal.module.css"
import {ReactElement, useEffect} from "react"
import ModalOverlay from "../modal-overlay/modal-overlay"
import {createPortal} from "react-dom"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
    close: () => void
    children: ReactElement
    title: string
    confirm?: boolean
}

const modalRoot = document.getElementById("modals");

export default function Modal({
                                  close,
                                  title,
                                  children,
                                  confirm
                              }: Props) {
    useEffect(() => {
        const closeWithKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close()
            }
        }
        window.addEventListener('keydown', closeWithKey)
        return () => window.removeEventListener('keydown', closeWithKey)
    }, [close])

    return createPortal(
        (
            <ModalOverlay close={close}>
                <section className={`${s.modal} ${confirm ? "pt-30 pb-30" : "pt-10 pr-10 pl-10 pb-15"}`}>
                    <header className={`${s.modal__header} ${confirm && s.modal__header_confirm}`}>
                        <h1 className={confirm ? `${s.modal__confirm} text text_type_digits-large` : "text text_type_main-large"}>{title}</h1>
                        <button className={`${s.modal__btn} ${confirm && s.modal__btn_confirm}`}
                                onClick={close}>
                            <CloseIcon type="primary"/>
                        </button>
                    </header>
                    {children}
                </section>
            </ModalOverlay>
        ), modalRoot as HTMLElement
    )
}
