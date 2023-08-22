import React from 'react';
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className: string;
}

const StaggerContainer: React.FC<Props> = ({ children, className }: Props) => {
    return (
        <motion.div className={className}
            variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1 }
            }}
            initial="hidden"
            animate="visible"
            transition={{
                delayChildren: 0.2,
                staggerChildren: 0.3
            }}
        >
            {children}
        </motion.div>
    )
}

export default StaggerContainer