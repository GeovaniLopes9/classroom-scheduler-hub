
import { ScheduleProvider } from "../contexts/ScheduleContext";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <ScheduleProvider>
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Layout />
      </motion.div>
    </ScheduleProvider>
  );
};

export default Index;
