import styles from "./compound-item-modal.module.css";

interface Props {
    name: string;
    value: string | number;
}

export default function CompoundItemModal({ name, value }: Props) {
    return (
        <div className={styles.item}>
            <p className={`${styles.item__name} text text_type_main-default text_color_inactive mb-2`}>
                {name}
            </p>
            <span className={`${styles.item__value} text text_type_digits-default text_color_inactive`}>
        {value}
      </span>
        </div>
    );
}
