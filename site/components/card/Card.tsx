import Image from 'next/image';
import styles from './Card.module.css'; // Corrigido aqui!

export default function Card({ title, imageUrl }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={title} // Corrigido aqui!
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>Descrição</p>
      </div>
    </div>
  );
}
