import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { patchPayment } from '../../services/transaction.services'

const Success = (props) => {
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
            setTimeout(() => {
                navigate("/")
            }, 5000);
        } catch (error) {
            navigate("/error")
        }
    }

  return (
    <div>Success</div>
  )
}

export default Success