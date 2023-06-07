import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/Bill.module.css'
import BillContext from '@/utils/BillContext'
import {AiOutlinePlus} from 'react-icons/ai'
import CurrencyInput from 'react-currency-input-field';

const currencies = ['EUR', 'USD', 'GBP']

export default function AddBill() {
    const [nameInput, setNameInput] = useState("")
    const {bill, setBill} = useContext(BillContext)
    const [personCount, setPersonCount] = useState(0)


    // Add new participants
    const handleClick = (e) =>{
        e.preventDefault()
        if(!nameInput == ""){
            bill.participants ? setBill({...bill, participants: bill.participants.concat([{name: nameInput, key:personCount, share: 1}]), totalShare: bill.totalShare + 1}) : 
            setBill({
                ...bill,
                participants: [{name: nameInput, key: personCount, share:1}],
                totalShare: 1
            })
            setPersonCount(personCount + 1)
            setNameInput("")
        }
        else{
            document.getElementsByName('addPerson')[0].focus()
        }
    }
  return (
    <div className={styles.container}>
        <form id={styles.amountForm} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='name'>Uitgave naam</label>
            <input name='name' type='text' onChange={(e) => setBill({...bill, title: e.target.value})}/>

            <label htmlFor='amount'>Totale uitgave</label>
            <div className={styles.flexFormDiv}>
                <CurrencyInput
                id={styles.currencyInput}
                placeholder='0,00'
                decimalSeparator=','
                groupSeparator=' '
                onValueChange={(value) => setBill({...bill,bedrag: Math.round(value?.replace(',', '.') * 100)})}/>
                <select defaultValue="EUR" id={styles.currencySelect} onChange={(e) => setBill({...bill, currency: e.target.value})}>
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>

        </form>
        <form id={styles.personForm} onSubmit={(e) => e.preventDefault()}>
            <label>Deelnemers toevoegen: </label>
            <div className={styles.flexFormDiv}>
                <input id={styles.newParticipantName} value={nameInput} onChange={(e) => setNameInput(e.target.value)} name='addPerson' type='text'/>
                <AiOutlinePlus type='submit' id={styles.addPersonButton} onClick={handleClick}/>
            </div>
        </form>
    </div>
  )
}
