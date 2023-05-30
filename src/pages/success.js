import Link from "next/link";
import styles from "@/styles/Payment.module.css"

export default function success() {
  return (
    <div className={styles.container}>
        <div className={styles.successWrapper}>
            <div>Je hebt met success betaald!</div>
            <Link href='/'>Terug naar het begin</Link>
        </div>

    </div>
  )
}
