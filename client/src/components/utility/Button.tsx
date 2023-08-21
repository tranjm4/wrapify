import React from 'react'

interface Props {
    children: React.ReactNode;
    handleClick: () => void;
    index: number;
    currentIndex: number;
}

const Button: React.FC<Props> = ({ children, handleClick, index, currentIndex }: Props) => {
    return (
        <button onClick={() => handleClick()} className="w-[100px] py-3 rounded-none 
            first:rounded-l-md last:rounded-r-md border-0
            transition duration-300"
            style={{
                backgroundColor: (index === currentIndex) ? "white" : "#22c55e",
                color: (index === currentIndex) ? "black" : "white",
            }}>
            <p className="text-sm whitespace-nowrap">
                {children}
            </p>
        </button>
    )
}

export default Button;