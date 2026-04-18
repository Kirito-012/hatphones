import { createCart, addToCart, removeFromCart, updateCartLine, getCart } from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ error: "Missing cartId" }, { status: 400 });
  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { cartId, variantId, lineId, quantity, action } = await req.json();
  try {
    let cart;
    if (action === "create") {
      cart = await createCart(variantId);
    } else if (action === "add") {
      cart = await addToCart(cartId, variantId);
    } else if (action === "remove") {
      cart = await removeFromCart(cartId, lineId);
    } else if (action === "update") {
      cart = await updateCartLine(cartId, lineId, quantity);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json({ error: "Cart operation failed" }, { status: 500 });
  }
}
