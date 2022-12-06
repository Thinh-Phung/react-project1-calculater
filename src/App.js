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
  EVALUATE:'evaluate'
}

//3.REDUCER
function reducer(state, {type,payload}){
  switch(type){
    case  ACTIONS.ADD_DIGIT:
      if(state.overwrite){// sau khi thuc hien phep tinh =>ket qua => bam so tiep thi ghi de len 
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
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
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null){
        return state // chua bam so thi khong bam duoc phep tinh
      }
      if (state.currentOperand== null){// doi phep tinh (vd: bam + sau do bam - thi doi thanh phep -)
        return{
          ...state,
          operation: payload.operation,
        }
      }
      if( state.previousOperand == null){ // sau khi bam phep tinh, rai state vao => ghep bieu tuong phep tinh vao(payload.operatio)=>xoa so da bam di (currentOperand:null)
        return {
          ...state,
          operation: payload.operation, 
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{//sau khi bam 2 so va phep tinh (vd:2+2) ma bam tiep phep tinh thi tinh ra bieu thuc 2+2 truoc
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.EVALUATE:
      if(
        state.operation == null ||
        state.currentOperand == null||
        state.previousOperand == null 
        ) {
          return state// khi chua bam gi ma bam = tra ve state hien tai
      }

      return{
        ...state,
        overwrite:true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}
function evaluate({currentOperand, previousOperand, operation}){
  const prev= parseFloat(previousOperand)// chuyen tu string sang float
  const current= parseFloat(currentOperand)// chuyen tu string sang float
  if(isNaN(prev) || isNaN(current)) return ""// neu phep tinh hien tai hoac phep tinh trc khong phai so tra ve ""
  let computation =""
  switch (operation){
    case "+":
      computation= prev + current
      break
    case "-":
      computation= prev - current
      break
    case "*":
      computation= prev * current
      break
    case "÷":
      computation= prev / current
      break
  }
  return computation.toString()// tra ve so dang chuoi
}

function App() {
//4.DISPATCH (state la 1 object)
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
      <button className='span-two'
      onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default App;
