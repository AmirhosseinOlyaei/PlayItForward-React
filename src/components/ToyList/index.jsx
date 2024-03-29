// import ToyList.css
import styles from "./ToyList.module.css";
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import ClippedDrawer from "./ClippedDrawer";

const ToyList = () => {
  return (
    <div>
      <ClippedDrawer />
      {/* <PersistentDrawerLeft /> */}
    </div>
  );
};

export default ToyList;
