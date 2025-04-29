import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  return (
    <AnimatePresence>
      <div
        className="fixed z-[9999] top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm flex justify-center items-center"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 30,
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
