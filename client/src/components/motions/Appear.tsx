import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className: string;
}

const Appear = ({ children, className }: Props) => {
    const ref = useRef(null);
    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 50,
        mass: 2
    };
    
    const mainControls = useAnimation()
    const isInView = useInView(ref, { once: true });
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <div ref={ref} className="h-fit w-full">
            <motion.div
                variants={{
                    hidden: { opacity: 0, translateY: "40%" },
                    visible: { opacity: 1, translateY: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={spring}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Appear