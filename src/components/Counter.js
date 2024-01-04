import classes from './Counter.module.css';
import { useSelector,useDispatch } from 'react-redux';

const Counter = () => {
  const counter=useSelector(state=>state.counter.counter)

  const show=useSelector(state=>state.counter.showCounter)

  const dispatch=useDispatch()

  const toggleCounterHandler = () => {};

  const IncrementHandler=()=>{
    dispatch({type:'increment'})
  }

  const IncrementByFiveHandler=()=>{
    dispatch({type:'incrementBy5',amount:5})
  }

  const DecrementHandler=()=>{
    dispatch({type:"decrement"})
  }

  const DecrementByFiveHandler=()=>{
    dispatch({type:"decrementBy5"})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>-- {counter} --</div>
      <button style={{margin:"2px"}} onClick={IncrementHandler}>Increment</button>
      <button style={{margin:"2px"}} onClick={IncrementByFiveHandler}>IncrementBy5</button>
      <button style={{margin:"2px"}} onClick={DecrementHandler}>Decrement</button>
      <button style={{margin:"2px"}} onClick={DecrementByFiveHandler}>DecrementBy5</button>
      <button style={{margin:"2px"}} onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
