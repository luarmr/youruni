import React from 'react';

import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>YourUni</h1>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <a href="index.htm" className={styles.selected}>
              Product
            </a>
          </li>
          <li>
            <a href="non_exiting.htm">Download</a>
          </li>
          <li>
            <a href="non_exiting2.htm">Pricing</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
