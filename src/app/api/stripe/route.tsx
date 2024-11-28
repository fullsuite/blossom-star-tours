/**
 * This is just an example of API router handler
 * For more information please check this docs:
 * https://nextjs.org/docs/app/building-your-application/routing/router-handlers
 */

import { supabase } from '@/client/supabaseClient'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://<domain>/category/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  // const product = await res.json()

  try {
    const sig = request.headers.get('stripe-signature')!
    const payload = request.body!.toString()

    let event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET!)
    } catch (err) {
      console.log(err)
    }

    // Handle the event
    console.log(event.type)

    switch (event.type) {
      case 'invoice.paid':
        // const bookingId = event.data.object.metadata.bookingId

        // const { data: bookingsData, error } = await supabase
        //   .from('bookings') // Replace 'bookings' with your actual table name
        //   .update({ status: 2 }) // Update the status field
        //   .eq('id', parseInt(bookingId))

        break
      case 'payment_intent.succeeded':
        const session = event.data.object
        const email = session.metadata.email

        const { data: existingUser, error } = await supabase
          .from('users') // Replace 'users' with your actual table name
          .select('*') // Select all columns (or specify specific columns, e.g., 'id, email, name')
          .eq('email', email) // Filter where email matches
          .single() // Ensures a single result is returned

        if (!existingUser) {
          const customer = await stripe.customers.create({
            email,
          })

          const { data, error } = await supabase
            .from('users') // Replace 'users' with your actual table name
            .insert([
              {
                email: email,
                customerIdStripe: customer.id,
              },
            ]) // Insert expects an array of objects
        }

        const updatePaymentIntent = await stripe.paymentIntents.update(session.id, {
          customer: existingUser.customerIdStripe,
        })
        console.log(updatePaymentIntent)

        break

      case 'checkout.session.completed':
        console.log(event)

        break

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json("Success")
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }

}

export async function POST() {
  // const res = await fetch('https://<domain>/category', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // })

  // const data = await res.json()

  return NextResponse.json({ success: true })
}