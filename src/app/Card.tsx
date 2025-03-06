import { CardData } from "@/types"
import { useEffect, useState } from "react";
import CardSvg from "./CardSvg";

interface CardProps {
    isSelected: boolean;
    isDiscard: boolean;
    cardData: CardData;
    order: number;
    isHintCard: boolean;
    onCardClick: (cardData: CardData, isSelected: boolean) => void
}

export default function Card({isSelected, order, isDiscard, isHintCard, cardData, onCardClick}: CardProps) {
    const [leftPosition, setLeftPosition] = useState('100%')

    useEffect(() => {
        const leftPositionFormula = `${100 * (order % 4)}px`
        setTimeout(() => setLeftPosition(leftPositionFormula), 5)
    }, [order])

    const parentStyle = {
        transition: "top 1s, left 1s",
        top: `${150 * Math.floor(order/4)}px`,
        left: leftPosition
    }

    const getBackgroundClass = () => {
        if (isSelected) {
            return "bg-zinc-400"
        }
        if (isHintCard) {
            return "bg-yellow-200"
        }
        return "bg-white"
    }
    const opacityClass = isDiscard ? "opacity-0" : "opacity-100"

    return (
        <div className="absolute" style={parentStyle}>
            <div className={`${opacityClass} ${getBackgroundClass()} transition transition-opacity duration-[1s] border-2 border-zinc-400 rounded-lg`} id={cardData.id} onClick={() => onCardClick(cardData, isSelected)}>
                <CardSvg {...cardData} />
            </div>
        </div>
    )
}