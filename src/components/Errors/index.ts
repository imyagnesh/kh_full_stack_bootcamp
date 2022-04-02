import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import Errors from './Errors';

const mapStateToProps = (store: RootState) => ({
  errors: store.errors,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  clearError: (index: number) => {
    dispatch({ type: 'CLEAR_ERROR', payload: { index } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
