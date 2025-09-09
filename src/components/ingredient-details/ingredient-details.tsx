import CompoundItemModal from "../../features/compound-item-modal/compound-item-modal";
import s from "./ingredient-details.module.css";

interface Props {
    image: string;
    proteins: number;
    calories: number;
    fat: number;
    carbohydrates: number;
    name: string;
}

export default function IngredientDetails({
                                              image,
                                              proteins,
                                              calories,
                                              fat,
                                              carbohydrates,
                                              name,
                                          }: Props) {
    const compoundItems = [
        { id: 1, name: "Калории, ккал", value: calories },
        { id: 2, name: "Белки, г", value: proteins },
        { id: 3, name: "Жиры, г", value: fat },
        { id: 4, name: "Углеводы, г", value: carbohydrates },
    ];

    return (
        <div className={s.details}>
            <img
                src={image}
                alt="ингредиент"
                className={`${s.details__img} mb-4`}
            />
            <p className={`text text_type_main-medium mb-8 ${s.details__name}`}>
                {name}
            </p>

            <div className={s.details__compound}>
                {compoundItems.map(({ id, name, value }) => (
                    <CompoundItemModal key={id} name={name} value={value} />
                ))}
            </div>
        </div>
    );
}
