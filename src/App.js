import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

//2.ACTION
export const ACTIONS ={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUTE:'evaluate'
}

//3.REDUCER
function reducer(state, {type,payload}){
  switch(type){
    case  ACTIONS.ADD_DIGIT:
      if(payload.digit === "0"&& state.currentOperand==="0") {
        return state //khong them nhieu so 0 o dau( tra lai state hien tai) 
      }
      if(payload.digit==="."&& state.currentOperand.includes(".")){// includes method return true or false
        return state//khong them dau "." khi da co 1 dau "."
      }
      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }
    case ACTIONS.CLEAR:
      return{}
  }
}
function App() {
//4.DISPATCH
  const [{currentOperand, previousOperand, operation},dispatch]=useReducer(
    reducer,
    {}
  )
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className='previous-operand'>{previousOperand}{operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} /> 
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} /> 
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} /> 
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} /> 
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two'>=</button>
    </div>
  )
}
export default App;
