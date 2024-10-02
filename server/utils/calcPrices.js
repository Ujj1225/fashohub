function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + (item.sellingPrice * 100 * item.quantity) / 100,
    0
  );

  const shippingPrice = itemsPrice > 4000 ? 0 : 200;

  const totalPrice = itemsPrice + shippingPrice;

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    totalPrice: addDecimals(totalPrice),
  };
}

module.exports = { calcPrices };
