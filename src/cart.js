const PROMO_CODE = 'SAVE10';
const PROMO_DISCOUNT_RATE = 0.1;
const PROMO_MIN_SUBTOTAL = 20000;
const DELIVERY_PRICE = 30000;
const FREE_DELIVERY_FROM = 50000;

function assertPositiveInteger(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }
}

function assertInStock(quantity, stock) {
  if (quantity > stock) {
    throw new RangeError(`На складе осталось только ${stock} шт.`);
  }
}

function addToCart(cart, product, quantity = 1) {
  assertPositiveInteger(quantity);

  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
  assertInStock(newQuantity, product.stock);

  if (!existingItem) return [...cart, { ...product, quantity }];
  return cart.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item));
}

function changeQuantity(cart, productId, quantity) {
  const existingItem = cart.find((item) => item.id === productId);
  if (!existingItem) return [...cart];

  assertPositiveInteger(quantity);
  assertInStock(quantity, existingItem.stock);
  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const isPromoValid = promoCode.trim().toUpperCase() === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL;
  const discount = isPromoValid ? Math.round(subtotal * PROMO_DISCOUNT_RATE) : 0;
  const delivery = subtotal > 0 && subtotal < FREE_DELIVERY_FROM ? DELIVERY_PRICE : 0;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
