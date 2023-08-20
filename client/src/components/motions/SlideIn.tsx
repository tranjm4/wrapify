import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className: string;
}


const SlideIn = ({ children, className }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <div ref={ref} className="relative overflow-hidden h-fit w-full">
            <motion.div
                variants={{
                    hidden: { opacity: 0.2, translateX: "-100%" },
                    visible: { opacity: 1, translateX: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1.5, delay: 0.25, ease: "easeInOut" }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default SlideIn;