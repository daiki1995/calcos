import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import './calStyle.css';

const defaultUrl='http://'+location.host;
const loginUrl=defaultUrl+'/register/login';
const regCalPost=defaultUrl+'/register/regcal';



function Register(){
    return(
        <div className="over-reg-container">
            <RegisterHead/>
            <div className="reg-mid-container">
                <RegisterMid/>
            </div>
        </div>
    )
}

function RegisterHead(){

    function loadMain(){
        window.location.href='/'
    }

    function loadRegister(){
        window.location.href='/login'
    }

    function loadResult(){
        window.location.href='./result'
    }

    return(
        <div className="head-reg-css">
            <div className="head-reg-left-css">
                <div className="head-reg-title-css">カロリー登録画面</div>
            </div>

            <div className="head-reg-right-css">
                <Menu menuButton={<MenuButton>Menu</MenuButton>} transition>
                        <MenuItem value="ログイン" onClick={(e)=>{loadRegister(e)}}>ログイン</MenuItem>
                        <MenuItem value="ホーム画面" onClick={(e)=>{loadMain(e)}}>
                            メイン画面へ
                        </MenuItem>
                        <MenuItem value="結果" onClick={(e=>{loadResult(e)})}>結果</MenuItem>
                </Menu>
            </div>

        </div>
    )
}

function RegisterMid(){

    const [listItems, setListItems] = useState([[]]);
    const [numberInput, setNumberInput] = useState("");
    const [foods,setFoods]=useState("");
    const [totalCal,setTotalCal]=useState(0);
    const [user,setUser]=useState("");
    const [eatDate,setEatDate]=useState();

    function postData(url='',data={}){
        const req={
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
            },
            body:JSON.stringify(data),
        }

        return fetch(url,req).then(response => response.json());
    }

    useEffect(()=>{

        //パスポートのログイン状態を確認して状態によっては違うページを読み込む
        fetch(loginUrl).then(response=>response.json())
        .then(function(data){
            console.log(data.user)

            if(data.user===undefined){
                console.log("ログインされていません。")
                alert('ログインされていません。ログイン画面へ移動します。')
                window.location.href='/login'
            }else{
                setUser(data.user)
            }
            
        });

        //日時データの更新
        setEatDate(getDate());
        
    },[])

    useEffect(()=>{
        let sumCal=0
        
        listItems.map((row,i)=>{
            if(i!==0){
                sumCal=sumCal+parseInt(row[2])
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

    function getDate(){
        let returnEatDate;
        let now = new Date()
        let Year=now.getFullYear();
        let Month=now.getMonth()+1;
        let Day=now.getDate();

        returnEatDate=Year+'-'+Month+'-'+Day;

        console.log(returnEatDate);

        return returnEatDate;
    }

  
    const handleAddItem = () => {
        if(foods!=='' && numberInput!==''){
            
            postData(regCalPost,{user:user,food:foods,cal:numberInput,eat_date:eatDate}).then(data => {
                console.log(data);

            }).catch(error => console.error(error))
            

            setEatDate(getDate());
            const newData=[...listItems]
            newData.push([eatDate,foods,parseInt(numberInput)])
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
                        <span key={j}>{item}　{(j===2)?'kcal':''}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}

/*
const root = ReactDOM.createRoot(document.getElementById('calcos'));
root.render(<CalCos />);*/

//window.onload=()=>ReactDOM.render(<Register />,document.getElementById('register'));
//export default CalCos;
const container = document.getElementById('register');
const root = createRoot(container);
root.render(<Register/>);