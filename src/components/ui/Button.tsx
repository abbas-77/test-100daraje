import React from "react";
import styles from "@/styles/Button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: Props) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
