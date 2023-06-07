import AddBill from '@/components/bill/AddBill'
import DisplayBill from '@/components/bill/DisplayBill'
import styles from '@/styles/Home.module.css'


export default function Home() {

  return (

    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.leftDiv}>
            <AddBill/>
          </div>
          <div className={styles.rightDiv}>
            <DisplayBill/>
          </div>
        </div>
      </div>
    </div>  

  )
}
