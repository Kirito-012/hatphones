const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!
const API_URL = `https://${STORE_DOMAIN}/api/2024-10/graphql.json`

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  price: number
  compareAtPrice: number | null
  image: string
  images: string[]
  variantId: string // full GID for checkout API
  category: string
  createdAt: string
  specs: {
    condition: string
    storage: string
    battery: string | null
    warranty: string
    network: string | null
    color: string | null
  }
}

// Maps Shopify collection handles to our website category names
const COLLECTION_HANDLE_MAP: Record<string, string> = {
  'apple-iphone': 'Apple iPhones',
  'apple-iphones': 'Apple iPhones',
  'samsung-phones': 'Samsung Phones',
  'android-phones': 'Android Phones',
  'google-pixel': 'Google Pixel',
  'tablet-ipad': 'Tablets',
  'tablets': 'Tablets',
  'macbooks': 'Laptops',
  'laptops': 'Laptops',
}

// Fallback: detect category from product title
function getCategoryFromTitle(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('iphone')) return 'Apple iPhones'
  if (lower.includes('samsung') || lower.includes('galaxy')) return 'Samsung Phones'
  if (lower.includes('pixel')) return 'Google Pixel'
  if (lower.includes('moto') || lower.includes('android')) return 'Android Phones'
  if (lower.includes('ipad') || lower.includes('tablet')) return 'Tablets'
  if (lower.includes('macbook') || lower.includes('laptop')) return 'Laptops'
  return 'Other'
}

function getCategory(collections: { handle: string }[], title: string): string {
  for (const col of collections) {
    const mapped = COLLECTION_HANDLE_MAP[col.handle.toLowerCase()]
    if (mapped) return mapped
  }
  return getCategoryFromTitle(title)
}

// Parses "key:value" tags into a plain object
function parseTags(tags: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const tag of tags) {
    const colonIndex = tag.indexOf(':')
    if (colonIndex !== -1) {
      const key = tag.substring(0, colonIndex).toLowerCase().trim()
      const value = tag.substring(colonIndex + 1).trim()
      result[key] = value
    }
  }
  return result
}

// Normalizes tag values to Title Case for display
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          tags
          createdAt
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                handle
              }
            }
          }
        }
      }
    }
  }
`

export async function getProducts(): Promise<ShopifyProduct[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    next: { revalidate: 300 }, // refresh every 5 minutes
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const { data } = await response.json()

  return data.products.edges.map(({ node }: any) => {
    const variant = node.variants.edges[0]?.node
    const images = node.images.edges.map((e: any) => e.node.url)
    const image = images[0] ?? ''
    const collections = node.collections.edges.map((e: any) => e.node)
    const specs = parseTags(node.tags)

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      createdAt: node.createdAt,
      price: parseFloat(variant?.price?.amount ?? '0'),
      compareAtPrice: variant?.compareAtPrice
        ? parseFloat(variant.compareAtPrice.amount)
        : null,
      image,
      images,
      variantId: variant?.id ?? '',
      category: getCategory(collections, node.title),
      specs: {
        condition: specs['condition'] ? toTitleCase(specs['condition']) : '',
        storage: specs['storage'] ?? '',
        battery: specs['battery'] ?? null,
        warranty: specs['warranty'] ?? '',
        network: specs['network'] ? toTitleCase(specs['network']) : null,
        color: specs['color'] ? toTitleCase(specs['color']) : null,
      },
    }
  })
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string }
    product: {
      title: string
      images: { edges: { node: { url: string } }[] }
    }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: { totalAmount: { amount: string; currencyCode: string } }
  lines: { edges: { node: CartLine }[] }
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { totalAmount { amount currencyCode } }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount }
              product {
                title
                images(first: 1) { edges { node { url } } }
              }
            }
          }
        }
      }
    }
  }
`

export async function createCart(variantId: string): Promise<Cart> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart { ...CartFields }
            userErrors { message }
          }
        }
        ${CART_FRAGMENT}
      `,
      variables: { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } },
    }),
  })
  const { data } = await res.json()
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string): Promise<Cart> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ...CartFields }
            userErrors { message }
          }
        }
        ${CART_FRAGMENT}
      `,
      variables: { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] },
    }),
  })
  const { data } = await res.json()
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart { ...CartFields }
            userErrors { message }
          }
        }
        ${CART_FRAGMENT}
      `,
      variables: { cartId, lineIds: [lineId] },
    }),
  })
  const { data } = await res.json()
  return data.cartLinesRemove.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ...CartFields }
            userErrors { message }
          }
        }
        ${CART_FRAGMENT}
      `,
      variables: { cartId, lines: [{ id: lineId, quantity }] },
    }),
  })
  const { data } = await res.json()
  return data.cartLinesUpdate.cart
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        query getCart($cartId: ID!) {
          cart(id: $cartId) { ...CartFields }
        }
        ${CART_FRAGMENT}
      `,
      variables: { cartId },
    }),
  })
  const { data } = await res.json()
  return data.cart ?? null
}

// Creates a Shopify cart and returns the checkout URL
export async function createCheckoutUrl(variantId: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              checkoutUrl
            }
            userErrors {
              message
            }
          }
        }
      `,
      variables: {
        input: {
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        },
      },
    }),
  })

  const { data } = await response.json()
  return data.cartCreate.cart.checkoutUrl
}
