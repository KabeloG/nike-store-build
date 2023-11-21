import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get cart items and total price from the request body
      const { body } = req.body;

      console.log("body", body);
      const lineItems = body.map((item) => {
        return {
          price_data: {
            currency: "zar",
            product_data: {
              name: item.shoe.title,
            },
            unit_amount: item.shoe.price * 100,
          },
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        };
      });
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        invoice_creation: {
          enabled: true,
        },
        line_items: lineItems,
        success_url: `https://nike-store-build.vercel.app/success`,
        cancel_url: `https://nike-store-build.vercel.app/failed`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      return res.status(200).json({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
