import BillContext from '@/utils/BillContext'
import { useContext, useState } from 'react'
import styles from '@/styles/Betaal.module.css'
import {RiArrowDownSLine} from 'react-icons/ri'
import {AiOutlineClose} from 'react-icons/ai'
import { displayAmount, currencies, currencySymbol } from './DisplayBill'
import Link from 'next/link'
import nanoid from '@/utils/IdGenerator'



export default function Betaal() {
    const {bill, setBill} = useContext(BillContext)
    const [isOpen, setIsOpen] = useState(false)
    const [toggleModal, setToggleModal] = useState(false)
    const [participant, setParticipant] = useState(null)

    const currentCurrency = currencySymbol[currencies.indexOf(bill.currency)]
    
    const Modal = () => {
        if(participant){
            return (
                <div id={styles.modal}>
                    <div id={styles.modalContent}>
                        <AiOutlineClose className={styles.closeModal} onClick={() => setToggleModal(false)}/>
                        <div className={styles.modalElement}>
                            <div className={styles.bigger}>Te betalen voor <b>{participant.name}</b>:</div>
                            <div>{currentCurrency + displayAmount(participant.amount)}</div>
                            <div className={styles.betaalMet}>Betaal met:</div>
                            <div className={styles.payImages}>
                                <Link href={`/pay/ideal?name=${participant.name}&amount=${participant.amount}&paymentId=${nanoid()}`}><img src='ideal-logo-1024.png'/></Link>
                                <Link href={`/pay/paypal?name=${participant.name}&amount=${participant.amount}&paymentId=${nanoid()}`}><img src='pp_cc_mark_37x23.jpg'/></Link>
                            </div>
                        </div>
                    </div>
                   
                </div>
            )
        }
    }

    const handleClick = (part) =>{
        setParticipant(part)
        setToggleModal(true)
    }

    return (
        <div className={styles.container}>
            {(bill.participants && Number.isInteger(bill.bedrag)) && (
            <div className={styles.toggleDiv}>
                <button className={styles.betaalToggle} onClick={() => setIsOpen(!isOpen)}>Betalen<RiArrowDownSLine/></button>
                {isOpen && (
                    <div className={styles.betaalDiv}>
                        <div className={styles.betaalWrapper}>
                            <div className={styles.betaalTitle}>Voor wie wil je betalen?</div>
                            {bill.participants?.map(participant => (
                            <button key={participant.key} className={styles.betaalButton} onClick={(e) => handleClick(participant)}>
                                {participant.name}
                            </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            )}
            {toggleModal && <Modal/>}
        </div>
    )
}
