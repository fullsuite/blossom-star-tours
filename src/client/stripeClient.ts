import Stripe from 'stripe'

// Replace these with your Supabase project's details
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY! as string
const stripeSecretKey = "sk_test_51LKCAlI1LbEdCQYtHGiVzBfeFBmqmhiD9tvhlLGJbjdS8FMljyImHB31APQ6EDBBRlgI7fZPuwVp80j5Pf0r5HDN00kCWr7Kj1"

export const stripe = new Stripe(stripeSecretKey)