import React, { FC, useState, ChangeEvent, FormEvent, useRef } from "react";
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
    
    const formRef = useRef<HTMLFormElement>(null);

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

    const handleReset = () => {
        setNewLabelCard(initState);
        if (formRef.current) {
            formRef.current.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
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
            <button type="button" onClick={handleReset}>
                Отменить
            </button>
        </form>
    );
}

export default AddLabelForm;
