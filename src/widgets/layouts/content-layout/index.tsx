'use client'

import { PropsWithChildren, useEffect } from "react"
import styles from './styles.module.css';

export const ContentLayout = ({ children, ...props }: PropsWithChildren) => {
    return (
        <div className={styles.content_layout}>
          {children}
        </div>
    );
  };