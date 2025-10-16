"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ title, imageUrl }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={title} fill className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2>{title}</h2>
      </div>
    </motion.div>
  );
}
