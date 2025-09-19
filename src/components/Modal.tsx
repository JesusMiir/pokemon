import { type ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
};

/*
                IPA (International phonetic alphabet)
    Modal       "modəl"       like a pop up
    Module      "madʒ(j)əl"     code in another file
    Model       "madəl"       has many meanings
*/

function Modal({ children, isOpen, close }: ModalProps) {
  return isOpen ? (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalWindow}>{children}</div>
    </div>
  ) : (
    <></>
  );
}

export default Modal;
