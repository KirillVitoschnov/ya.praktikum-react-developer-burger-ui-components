import { useState } from "react";

export function useForm<T extends Record<string, any>>(inputValues: T) {
    const [values, setValues] = useState<T>(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}
