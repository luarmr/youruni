import React, { FC } from 'react';

import styles from './SkipToMainContent.module.css';

interface SkipToMainContentProps {
  mainContentId: string;
}

const SkipToMainContentReactComponent: FC<SkipToMainContentProps> = ({ mainContentId }) => {
  return (
    <a href={`#${mainContentId}`} className={styles.skipToMainContent}>
      Skip to main content
    </a>
  );
};

export default SkipToMainContentReactComponent;
