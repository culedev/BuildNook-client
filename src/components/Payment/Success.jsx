import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { patchPayment } from '../../services/transaction.services'
import SimpleBackdrop from '../SimpleBackdrop'

const Success = (props) => {
    const [isFetching, setIsFetching] = useState(true)
    const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      );
    const paymentIntent = new URLSearchParams(window.location.search).get(
        'payment_intent'
      );

    const navigate = useNavigate()
    useEffect(() => {
        completePayment()
    },[])
    
    const completePayment = async () => {
        try {
            await patchPayment({client: clientSecret, payment: paymentIntent})
            setIsFetching(false)
        } catch (error) {
            navigate("/error")
        }
    }

    if(isFetching){
      return <SimpleBackdrop />
    }

  return (
    <div>
    
      <Button>Continue Shopping</Button>
    
    </div>
  )
}

export default Success