import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed z-90000000000 top-0 left-0 w-full h-full bg-black/20 backdrop-blur-xs flex justify-center items-center"
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="menu"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;
