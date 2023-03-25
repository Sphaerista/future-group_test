/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookItem.module.css";

type BookItemProps = {
  id: string;
  image: string;
  title: string;
  categories: string[];
  authors: string[];
};

const BookItem: React.FC<BookItemProps> = ({
  id,
  image,
  title,
  categories,
  authors,
}) => {
  const navigate = useNavigate();

  // check this div <></>
  return (
    <div className={styles.bookItem}>
      <img
        src={image}
        onClick={() => {
          navigate(`/book/${id}`);
        }}
      />
      <div className={styles.bookInfo}>
        <div className={styles.title}>{title}</div>
        {categories && <div>Категория: {categories}</div>}
        {authors && <div>Автор: {authors}</div>}
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          navigate(`/book/${id}`);
        }}
      >
        More info
      </button>
    </div>
  );
};

export default BookItem;
