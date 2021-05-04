import { Fragment } from "react";
import s from "./drawer.module.sass";
function Drawer(props) {
  const { open } = props;

  const handleSidenavClick = (e) => {
    e.stopPropagation();
  };

  const handleMaskClick = (e) => {
    props.onClose();
  };

  return (
    <Fragment>
      <div
        className={`${s.mask} ${open ? s.show : s.hide}`}
        onClick={handleMaskClick}
      />
      <div
        className={`${s.drawer} ${open ? s["slide-in"] : s["slide-out"]}`}
        onClick={handleSidenavClick}
      >
        {props.children}
      </div>
    </Fragment>
  );
}

export default Drawer;
