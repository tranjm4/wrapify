import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className: string;
}

const Appear = ({ children, className }: Props) => {
    const ref = useRef(null);
    return (
        <div ref={ref} className="h-fit w-full">
            <motion.div
                whileInView={{ opacity: 1, translateY: 0 }}
                initial={{ opacity: 0.1, translateY: "40%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Appear