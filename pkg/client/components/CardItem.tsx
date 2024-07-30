"use client";

import React from "react";
import styles from "./CardItem.module.css";
import Image from "next/image";

type Props = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export const CardItem = ({ title, message, totalPrice, freeGift }: Props) => (
  <div className={styles.container}>
    <div className={styles.img}>
      <Image
        layout="responsive"
        src="/img/cat.png"
        alt="Picture of a cat"
        width={469}
        height={334}
      />
    </div>

    <div className={styles.textContainer}>
      <h2>{title}</h2>
      <p>{message}</p>
      <p><b>Total price: £{totalPrice}</b></p>

      <div className={styles.btnContainer}>
        <button className={styles.btn}>SEE DETAILS</button>
        <button className={`${styles.btn} ${styles.passive}`}>EDIT DELIVERY</button>
      </div>
    </div>

    {freeGift && <div className={styles.freeGift}>FREE GIFT</div>}
  </div>
);
768