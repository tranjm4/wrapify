import React from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

const Velocity = ({ children }: Props) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 500,
        stiffness: 200
    })

    const velocityFactor = useTransform(smoothVelocity, [1, 1000], [1, 5], {
        clamp: false
    })
    

    return (
        <motion.div style={{ scale: velocityFactor }}>
            {children}
        </motion.div>

    )
}

export default Velocity