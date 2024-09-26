import { NextResponse } from "next/server";

export async function GET() {
  const subscriptions = [
    { name: "Netflix", cost: "₹649/month" },
    { name: "Spotify", cost: "₹119/month" },
    { name: "Amazon Prime", cost: "₹1499/year" },
  ];

  return NextResponse.json({ subscriptions });
}
