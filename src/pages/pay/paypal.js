import styles from "@/styles/Payment.module.css"
import { useRouter } from "next/router";

export default function paypal(props) {
    //doe iets met de props uiteraard
    const router = useRouter()

    const handleClick = () => {
        router.push('/success')
    }
  return (
    <div className={styles.container}>
        <button className={styles.betaalButton} onClick={handleClick}>Betaal</button>
    </div>
  )
}


export async function getServerSideProps(context) {
    if(context.query.name && context.query.paymentId && context.query.amount){
        return{
            props: {
                name: context.query.name,
                amount: context.query.amount,
                paymentId: context.query.paymentId
            }
        }
    }

    else{
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}