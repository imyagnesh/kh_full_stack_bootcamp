import React, { memo } from 'react';
import Rating from '../Rating';

type Props = {
  data: ProductsType;
  addToCart: (cartItem: Omit<CartType, 'id'>) => void;
  updateToCart: (cartItem: CartType) => void;
  deleteCartItem: (cartItem: CartType) => void;
  cartItem?: CartType;
};

const Product = ({
  data,
  addToCart,
  cartItem,
  updateToCart,
  deleteCartItem,
}: Props) => (
  <div
    key={data.id}
    className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8 py-4"
  >
    <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-3">
      <img
        src={data.image}
        alt={data.title}
        className="object-center object-cover"
      />
    </div>
    <div className="sm:col-span-9">
      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
        {data.title}
      </h2>

      <section aria-labelledby="information-heading" className="mt-2">
        <h3 id="information-heading" className="sr-only">
          Product information
        </h3>

        <p className="text-2xl text-gray-900">
          {new Intl.NumberFormat('en-IN', {
            currency: 'INR',
            style: 'currency',
          }).format(data.price)}
        </p>

        <Rating {...data.rating} />
      </section>

      <section aria-labelledby="options-heading" className="mt-10">
        <h3 id="options-heading">{data.description}</h3>
        {cartItem ? (
          <div className="flex items-center mt-6">
            <button
              type="button"
              onClick={() =>
                updateToCart({
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                })
              }
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              +
            </button>
            <h5 className="flex-1 text-center">{cartItem.quantity}</h5>
            <button
              type="button"
              onClick={() => {
                if (cartItem.quantity > 1) {
                  updateToCart({
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                  });
                } else {
                  deleteCartItem(cartItem);
                  //
                }
              }}
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              -
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              addToCart({
                productId: data.id,
                quantity: 1,
              })
            }
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to bag
          </button>
        )}
      </section>
    </div>
  </div>
);

Product.defaultProps = {
  cartItem: undefined,
};

export default memo(Product);
