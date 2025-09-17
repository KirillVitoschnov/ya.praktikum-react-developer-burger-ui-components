import s from "./order-details.module.css";
import done from "../../images/done.png";

interface Props {
    orderId?: number | string;
    statusText?: string;
    descriptionText?: string;
}

export default function OrderDetails({
                                         orderId,
                                         statusText = "Ваш заказ начали готовить",
                                         descriptionText = "Дождитесь готовности на орбитальной станции",
                                     }: Props) {
    return (
        <div className={s.order} role="status" aria-live="polite">
            <p className="text text_type_main-medium mt-8 mb-15">
                идентификатор заказа
            </p>

            {orderId ? (
                <p className={`${s.order__id} text text_type_digits-large mb-8`}>
                    {orderId}
                </p>
            ) : (
                <p className={`${s.order__loading} text text_type_main-default mb-8`}>
                    Загрузка...
                </p>
            )}

            <img
                src={done}
                alt="Заказ начали готовить"
                className={`${s.order__img} mb-15`}
            />

            <p className="text text_type_main-default mb-2">{statusText}</p>
            <p className="text text_type_main-default text_color_inactive">
                {descriptionText}
            </p>
        </div>
    );
}
