'use client';

import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/app/data/home';
import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

export default function ProcessFlow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const arrowVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        type: 'spring',
        stiffness: 200,
      },
    },
    hover: {
      x: [0, 5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-background to-primary/5 p-8 md:p-12 border border-primary/10"
    >
      {/* Animated background decoration */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.h3
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center font-sans bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
      >
        Simple 3-Step Process
      </motion.h3>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 relative">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center w-full relative"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col items-center text-center w-full group cursor-pointer relative">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredIndex === index ? 0.6 : 0,
                  scale: hoveredIndex === index ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Step number badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  rotate: hoveredIndex === index ? 0 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {index + 1}
              </motion.div>

              {/* Icon container */}
              <motion.div
                className={`w-24 h-24 rounded-2xl ${step.color} flex items-center justify-center mb-6 border-2 border-white/20 relative overflow-hidden`}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  rotateX: 5,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <step.icon className={`w-12 h-12 ${step.iconColor} relative z-10`} />
              </motion.div>

              {/* Title with underline animation */}
              <motion.h4 className="font-bold text-foreground text-xl mb-3 font-sans relative">
                {step.title}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.h4>

              <motion.p
                className="text-muted-foreground text-sm max-w-[220px] leading-relaxed"
                animate={{
                  y: hoveredIndex === index ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {step.description}
              </motion.p>

              {/* Connecting line for mobile */}
              {index < processSteps.length - 1 && (
                <motion.div
                  className="md:hidden w-12 h-0.5 bg-gradient-to-r from-primary/20 to-primary/5 my-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.2 }}
                />
              )}
            </div>

            {/* Desktop arrow connector */}
            {index < processSteps.length - 1 && (
              <motion.div
                variants={arrowVariants}
                animate="visible"
                whileHover="hover"
                className="hidden md:flex items-center justify-center w-16 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-md" />
                <ArrowRight className="w-7 h-7 text-primary/40 relative z-10" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-2 mt-12 md:hidden"
      >
        {processSteps.map((_, idx) => (
          <motion.div
            key={idx}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{
              scale: hoveredIndex === idx ? 1.5 : 1,
              backgroundColor: hoveredIndex === idx ? 'rgb(59,130,246)' : 'rgba(59,130,246,0.3)',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}