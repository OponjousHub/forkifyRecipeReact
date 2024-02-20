// import ReactDOM from "react-dom";
// import { useRef } from "react";
import AddRecipeForm from "../header/addRecipeForm";
import classes from "./modal.module.css";

export default function Modal({ props }) {
  // const dialog = useRef();
  // dialog.current.showModal();

  // const potalElement = document.getElementById("overlays");
  console.log(props);
  return (
    <dialog className={classes.addform_container}>
      <AddRecipeForm />
      <p>{props}</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

// const Backdrop = () => {
//   return <div className={classes.backdrop}></div>;
// };
// const ModalOverlay = (props) => {
//   return (
//     <div className={classes.modal}>
//       <div className={classes.content}>{props.children}</div>
//     </div>
//   );
// };
// const potalElement = document.getElementById("overlays");

// const Modal = (props) => {
//   return (
//     <Fragment>
//       {ReactDOM.createPortal(<Backdrop />, potalElement)}
//       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>)}
//     </Fragment>
//   );
// };
