import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/5571996171605?text=Olá!%20Minha%20empresa%20precisa%20se%20adequar%20às%20NRs.%20Quero%20saber%20como%20vocês%20podem%20me%20ajudar.", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        className="mr-4 bg-white text-secondary px-4 py-2 rounded-xl shadow-lg font-medium text-sm pointer-events-none border border-border"
      >
        Falar com Especialista
      </motion.div>
      
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgb(37,211,102,0.6)] transition-shadow"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.button>
    </div>
  );
}
