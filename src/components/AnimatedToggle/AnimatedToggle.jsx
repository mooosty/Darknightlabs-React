'use client'

import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function AnimatedToggle({ isCollapsed, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative h-8 w-8 rounded-lg bg-[#242623] p-1.5 overflow-hidden transition-colors hover:bg-[#2f2e2a] focus:outline-none"
      style={{
        position: 'absolute',
        right: '-12px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
      aria-pressed={isCollapsed}
    >
      <motion.div
        animate={{
          x: isCollapsed ? 'calc(100% - 100%)' : '0%',
          width: isCollapsed ? '80%' : '40%'
        }}
        initial={{
          x: '0%',
          width: '40%'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="absolute top-1.5 h-[16px] rounded-md bg-[#f5efdb]"
      />
    </button>
  )
}

AnimatedToggle.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
} 