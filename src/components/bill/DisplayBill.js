import React, { useContext, useEffect } from 'react'
import styles from '@/styles/Bill.module.css'
import BillContext from '@/utils/BillContext'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'

export const currencies = ['EUR', 'USD', 'GBP']
export const currencySymbol = ['€', '$', '£']


export default function DisplayBill() {
    const {bill, setBill} = useContext(BillContext)

    // Calculate the new distribution when amount changes, number of participants changes or the share of a person is changed
    useEffect(() => {
        console.log(bill)
        calculateShare()
    }, [bill.bedrag, bill.participants?.length, bill.totalShare])

    const currentCurrency = currencySymbol[currencies.indexOf(bill.currency)]

    const shareDown = (key) => {
        const newList = bill.participants.map((participant) => participant.key === key ? ({...participant, share: participant.share === 1 ? 1 : participant.share - 1}) : participant)
        const share = newList.map((participant) => participant.share).reduce((a,b) => a+b, 0)
        setBill({...bill, participants: newList, totalShare: share})
    }
    const shareUp = (key) => {
        const newList = bill.participants.map((participant) => participant.key === key ? ({...participant, share: participant.share + 1}) : participant)
        const share = newList.map((participant) => participant.share).reduce((a,b) => a+b, 0)
        setBill({...bill, participants: newList, totalShare: share})
    }

    const removePerson = (key) => {
        const newList = bill.participants.filter((participant) => participant.key !== key)
        const share = newList.map((participant) => participant.share).reduce((a,b) => a+b, 0)
        setBill({...bill, participants: newList, totalShare: share})
    }

    // Calculate share evenly. The negative or positive rest amount is distributed over the first few participants.
    const calculateShare = () => {
        if(bill.participants && bill.bedrag){
            if(bill.participants.length > 0){
                const share = bill.bedrag / bill.totalShare
                const newList = bill.participants.map((participant) => ({...participant, amount: Math.floor(share * participant.share)}))
                const amountDivided = newList.map((participant) => participant.amount).reduce((a,b) => a+b, 0)
                const difference = bill.bedrag - amountDivided
                const left = Math.abs(difference)
                setBill({...bill, participants: newList})
                if(difference > 0){
                    for (let i=0; i < left; i++){
                        newList[i].amount += 1
                    }
                }
                if(difference < 0){
                    for (let i=0; i < left; i++){
                        newList[i].amount -= 1
                    }
                }
                setBill({...bill, participants: newList})
            }

        }
    }

  return (
    <>
        {bill.bedrag || bill.participants ? (
        <div className={styles.container}>
            <div className={styles.displayWrapper}>
                <div className={styles.displayTop}>
                    {bill.title ? <h3>Verrekening {bill.title}</h3> : <h3>Naamloze verrekening</h3>}
                </div>
                <div className={styles.displayAmount}>
                    {bill.participants?.length > 1 && <div>{bill.participants.length} deelnemers</div>}
                    {bill.participants?.length === 1 && <div>1 deelnemer</div>}
                    <div>{Number.isInteger(bill.bedrag) && 'Totaal: ' + currentCurrency +  displayAmount(bill.bedrag)}</div>
                </div>
                <div className={styles.resultDiv}>
                    {bill.participants?.map(participant => (
                        <div key={participant.key} className={styles.displayElement}>
                            <div>
                                <div>{participant.name}</div>
                                <div>
                                    {Number.isInteger(bill.bedrag) && currentCurrency + displayAmount(participant.amount)}
                                </div>
                            </div>
                            <div id={styles.shareDiv}>
                                <AiOutlineMinus className={styles.shareButtons} onClick={() => shareDown(participant.key)}/>
                                {participant.share}
                                <AiOutlinePlus className={styles.shareButtons} onClick={() => {
                                    shareUp(participant.key)
                                }}/>
                                <BsTrash3Fill className={styles.removeButton} onClick={() => {
                                    removePerson(participant.key)
                                }}/>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
        ) : (
            <div className={styles.nothingContainer}>Start met het toevoegen van het bedrag en de deelnemers</div>
        ) }
    </>
  )
}

// Display the amount with cent decimals
export const displayAmount = (amount) => {
    return (amount / 100).toFixed(2).replace('.', ',')
}