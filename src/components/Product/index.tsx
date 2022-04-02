import React, { memo } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import {
  addCartAction,
  deleteCartAction,
  updateCartAction,
} from '../../actions/cartAction';
import Rating from '../Rating';

type Props = {
  cartItem?: CartType;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  addToCart: (cartItem: Omit<CartType, 'id'>) => Promise<void>;
  updateToCart: (cartItem: CartType) => Promise<void>;
  deleteCartItem: (cartItem: CartType) => Promise<void>;
} & ProductsType;

const Product = ({
  addToCart,
  cartItem,
  updateToCart,
  deleteCartItem,
  isAdding,
  isUpdating,
  isDeleting,
  id,
  image,
  title,
  price,
  rating,
  description,
}: Props) => (
  <div
    key={id}
    className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8 py-4"
  >
    <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-3">
      <img src={image} alt={title} className="object-center object-cover" />
    </div>
    <div className="sm:col-span-9">
      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
        {title}
      </h2>

      <section aria-labelledby="information-heading" className="mt-2">
        <h3 id="information-heading" className="sr-only">
          Product information
        </h3>

        <p className="text-2xl text-gray-900">
          {new Intl.NumberFormat('en-IN', {
            currency: 'INR',
            style: 'currency',
          }).format(price)}
        </p>

        <Rating {...rating} />
      </section>

      <section aria-labelledby="options-heading" className="mt-10">
        <h3 id="options-heading">{description}</h3>
        {cartItem ? (
          <div className="flex items-center mt-6">
            <button
              type="button"
              disabled={isUpdating || isDeleting}
              onClick={() =>
                updateToCart({
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                })
              }
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              +
            </button>
            <h5 className="flex-1 text-center">{cartItem.quantity}</h5>
            <button
              type="button"
              disabled={isUpdating || isDeleting}
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
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              -
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isAdding}
            onClick={() =>
              addToCart({
                productId: id,
                quantity: 1,
              })
            }
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
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
const mapStateToProps = (store: RootState, props: ProductsType) => ({
  cartItem: store.cart.find((x) => x.productId === props.id),
  isAdding: store.loading.some(
    (x) => x.actionType === 'ADD_TO_CART' && x.loadingId === props.id,
  ),
  isUpdating: store.loading.some(
    (x) => x.actionType === 'UPDATE_CART' && x.loadingId === props.id,
  ),
  isDeleting: store.loading.some(
    (x) => x.actionType === 'DELETE_CART' && x.loadingId === props.id,
  ),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (cartItem: Omit<CartType, 'id'>) =>
    addCartAction(cartItem)(dispatch),
  updateToCart: (cartItem: CartType) => updateCartAction(cartItem)(dispatch),
  deleteCartItem: (cartItem: CartType) => deleteCartAction(cartItem)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
