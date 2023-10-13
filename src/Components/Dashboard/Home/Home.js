import Drawer from "../Drawer/Drawer";
import Landing from "../Landing/Landing";
import classes from "./Home.module.css";

const HomeDashboard = () => {
  return (
    <div className={classes.mainNodeWithDrawer}>
      <div>
        <Drawer />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          marginLeft: 250,
          paddingBottom: 100,
        }}>
        <Landing />
      </div>
    </div>
  );
};

export default HomeDashboard;
