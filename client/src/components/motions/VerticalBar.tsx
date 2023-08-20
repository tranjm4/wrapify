import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
    className: string;
}

const VerticalBar = ({ className }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <div ref={ref} className="h-full flex items-center">
            <motion.div
                variants={{
                    hidden: { height: 0 },
                    visible: { height: "100%" }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
                className={className}
            >
            </motion.div>
        </div>
    )
}

export default VerticalBar