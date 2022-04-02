import React, { memo } from 'react';
import { ErrorStateType } from '../../reducers/errorReducer';

type Props = {
  errors: ErrorStateType[];
  clearError: (index: number) => void;
};

const Errors = ({ errors, clearError }: Props) => (
  <>
    {errors.map((x, index) => (
      <div
        role="alert"
        key={`${x.actionType}_${x.loadingId}`}
        className="fixed w-full p-4 md:w-1/2 lg:w-1/3"
        style={{
          bottom: `${index * 6}rem`,
        }}
      >
        <div className="bg-red-500 flex justify-between items-center text-white font-bold rounded-t px-4 py-2">
          <span>Danger</span>
          <button type="button" onClick={() => clearError(index)}>
            <svg
              className="fill-current h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{x.error.message}</p>
        </div>
      </div>
    ))}
  </>
);

export default memo(Errors);
