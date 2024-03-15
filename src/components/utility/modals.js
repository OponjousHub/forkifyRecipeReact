import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";

const Modals = ({ children, open }) => {
  const dialog = useRef();

  useEffect(() => {
    const dialogValue = dialog.current;
    if (open) {
      dialogValue.showModal();
    } else {
      dialogValue.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={classes.dialog}>
      {children}
    </dialog>,
    document.getElementById("modall")
  );
};

export default Modals;
