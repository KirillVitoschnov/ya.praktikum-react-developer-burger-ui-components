import {ReactNode} from "react"
import s from "./modal-overlay.module.css"

interface Props {
    children: ReactNode
    close: () => void
}

export default function ModalOverlay({children, close}: Props) {
    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).classList.toString().includes("modal__overlay")) {
            close();
        }
    }

    return (
        <div className={s.modal__overlay} onClick={closeModal}>
            {children}
        </div>
    )
}
