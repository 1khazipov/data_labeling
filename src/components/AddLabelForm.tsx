import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import LabelCard from "../models/LabelCard";
import './styles.css';

interface AddLabelFormProps {
    addLabelCard: (newLabelCard: LabelCard) => void;
}

const initState = {
    title: '',
    /* coords */
}

const AddLabelForm: FC<AddLabelFormProps> = ({ addLabelCard }) => {
    const [newLabelCard, setNewLabelCard] = 
        useState<{title:string /* coords */}>(initState);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLabelCard({
            ...newLabelCard,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const { title /* coords */ } = newLabelCard;

        if (title /* && coords */) {
            addLabelCard({
                title,
                /* coords */
                id: Date.now()
            });
        }
        setNewLabelCard(initState);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                type="text"
                placeholder="Название"
                onChange={handleChange}
                value={newLabelCard.title}
            />
            <button type="submit">
                Добавить
            </button>
            <button type="reset">
                Отменить
            </button>
        </form>
    );
}

export default AddLabelForm;