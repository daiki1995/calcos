import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import './calStyle.css';


function Register(){
    return(
        <div>
            <RegisterHead/>
            <RegisterMid/>
        </div>
    )
}

function RegisterHead(){
    return(
        <div className="header">
            <div>カロリー登録画面</div>
        </div>
    )
}

function RegisterMid(){

    const [listItems, setListItems] = useState([[]]);
    const [numberInput, setNumberInput] = useState("");
    const [foods,setFoods]=useState("");
    const [totalCal,setTotalCal]=useState(0)

    

    useEffect(()=>{
        let sumCal=0
        
        listItems.map((row,i)=>{
            if(i!==0){
                sumCal=sumCal+parseInt(row[1])
            }
        })

        setTotalCal(sumCal)
        
    },[listItems])

  
    const handleNumberInput = (event) => {
        setNumberInput(event.target.value);
    };

    const handleFoodInput=(event)=>{
        setFoods(event.target.value)
    };
  
    const handleAddItem = () => {
        if(foods!=='' && numberInput!==''){
            const newData=[...listItems]
            newData.push([foods,parseInt(numberInput)])
            setListItems(newData);
            setNumberInput("");
            setFoods("");
        }else{
            alert("フードとカロリーは必ず入力してください")
        }
    };
  
    return (
      <div>

        <div>目標:1600kcal/日</div>
        
        <div>食べ物の登録</div>
        <div className="flex-d">
            <input value={foods}  onChange={handleFoodInput} />
            <input type="number" value={numberInput} onChange={handleNumberInput} />
            <div>kcal</div>
            <button onClick={handleAddItem}>食べた</button>
        </div>
        
        
        <div>現在接種カロリー{totalCal}kcal 本日の投資金額{((1600-totalCal)>0)?0:totalCal-1600}円</div>
            <div>本日食べたもの</div>
            {listItems.map((row, i) => (
                <div key={i}>
                    {row.map((item, j) => (
                        <span key={j}>{item}　{(j===1)?'kcal':''}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}

/*
const root = ReactDOM.createRoot(document.getElementById('calcos'));
root.render(<CalCos />);*/

window.onload=()=>ReactDOM.render(<Register />,document.getElementById('register'));
//export default CalCos;