import React from 'react';

import { University } from './Universities.mobx-store';
import styles from './UniversityCard.module.css';

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <article key={university.id} className={styles.card}>
      <p className={styles.city}>
        {university.city}, {university.state}
      </p>
      <h3 className={styles.name}>{university.name}</h3>
      {/*  Assuming the protocol here */}
      <a href={`https://${university.url}`} target="_blank" rel="noreferrer" className={styles.link}>
        {university.url}
      </a>
    </article>
  );
};

export default UniversityCard;
