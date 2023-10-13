import Drawer from "../Drawer/Drawer";
import classes from "./Home.module.css";

const HomeDashboard = () => {
  document.body.style.overflowY = "hidden";

  return (
    <div className={classes.mainNodeWithDrawer}>
      <Drawer />
      <div>Content</div>
    </div>
  );
};

export default HomeDashboard;
