import React from "react"
import {StoreContext} from "./context.js"
import logo from './logo.svg';
import './App.css';

function App() {
    const  [state, dispatch] = React.useContext(StoreContext);
   // <button onClick={() => dispatch({type : 'ADD_POST' , post : Math.random() }) }>Add post</button>

    
   
    return (
        <div className="App">
            <button onClick={() => dispatch({type : 'Incr'  }) }>+</button>
            <p>{state.count}</p>
            <button onClick={() => dispatch({type : 'Decr'  }) }>-</button>
        </div>
    );
}

export default App;

