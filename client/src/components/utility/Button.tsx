import React from 'react'

interface Props {
    children: React.ReactNode;
    handleClick: () => void;
}

const Button: React.FC<Props> = ({ children, handleClick }: Props) => {
    return (
        <button onClick={() => handleClick()} className="w-[100px] py-3 bg-primary rounded-none 
            first:rounded-l-md last:rounded-r-md border-0
            hover:bg-white hover:text-black transition duration-300">
            <p className="text-sm whitespace-nowrap">
                {children}
            </p>
        </button>
    )
}

export default Button;