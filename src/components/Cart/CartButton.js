import classes from './CartButton.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { cartActions } from '../../store/Cart';

const CartButton = (props) => {

  const dispatch=useDispatch()

  const toggleCart=()=>{
    dispatch(cartActions.toggleCart())
  }

  const items=useSelector(state=>state.cart.items)
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
