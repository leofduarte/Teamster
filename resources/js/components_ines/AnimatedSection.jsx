import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const AnimatedSection = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,  // Inicia a animação quando 10% do elemento estiver visível
      });
    
      useEffect(() => {
        if (inView) {
          // Lógica adicional que precisa ser executada quando o elemento está visível
        }
      }, [inView]);

  return (
    <div ref={ref} className="section">
       <motion.div
        initial={{ opacity: 0, y: 50, rotate: 0 }} // Estado inicial: fora da tela e sem rotação
        animate={inView ? { opacity: 1, y: 0, rotate: 360 } : {}} // Animação: visível e girando
        transition={{ duration: 1 }} // Duração da animação
      >
        <img src="/assets/images/triangle.svg" alt="Animated Element" />
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
