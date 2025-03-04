import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import styles from './AppLayout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User/>
      <SideBar/>
      <Map/>
    </div>
  )
}
