import Header from "./Header";
import styles from '@/styles/Layout.module.css'
import { Meta } from "./Meta";
import { BillContextProvider } from "@/utils/BillContext";
 
export default function Layout({ children }) {
  return (
    <>
    <Meta/>
    <div className={styles.mainContainer}>
      <Header />
      <BillContextProvider>
        {children}
      </BillContextProvider>
    </div>
    </>
  );
}