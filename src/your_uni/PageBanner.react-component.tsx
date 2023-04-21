import React from 'react';

import styles from './PageBanner.module.css';

const PageBanner: React.FC = () => {
  /* I know I know what is the point of hardcode this here... but since I cut corner with the header... let's finish this on time */
  const mainTitle = 'Find the university that’s right for you.';
  const description = 'Tenetur ex explicabo et illo. Recusandae fugit eius voluptatem. Voluptas atque autem totam.';

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{mainTitle}</h2>
      <p className={styles.description} lang="la">
        {description}
      </p>
    </div>
  );
};

export default PageBanner;
