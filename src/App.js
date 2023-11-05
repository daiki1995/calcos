import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import 'swiper/swiper-bundle.css'; // Swiperのスタイルシートのインポート
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// 必要なモジュールを追加
SwiperCore.use([Navigation]);

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import './calStyle.css';


function App(){
 return(
     <div className="over-container">
        <Head/>
        <div className="mid-container">
            
            <SwiperSlideShow/>
            <Overview/>
            <AboutUse/>
        </div>
    </div>
 )
}

//スライドショー
function SwiperSlideShow(){
    return(
    
        <Swiper className="swiper-css" navigation>
            <SwiperSlide>
                <img className="img-slid" src="./images/1.png" alt="Image 1"/>
            </SwiperSlide>

            <SwiperSlide>
                <img className="img-slid" src="./images/2.png" alt="Image 2"/>
            </SwiperSlide>

            <SwiperSlide>
                <img className="img-slid" src="./images/3.png" alt="Image 3"/>
            </SwiperSlide>

        </Swiper>
        
    );
}

function Head(){

    function loadRegister(e){
        console.log('Click カロリー登録')
        window.location.href='/register'
    }

    function loadLogin(e){
        window.location.href='/login' 
    }

    function loadResult(e){
        window.location.href='./result'
    }

    return(
        <div className="head-css">
            
            <Menu menuButton={<MenuButton>Menu</MenuButton>} transition>
                <MenuItem value="ログイン" onClick={(e)=>{loadLogin(e)}}>ログイン</MenuItem>
                <MenuItem value="カロリー登録" onClick={(e)=>{loadRegister(e)}}>
                    カロリー登録
                </MenuItem>
                <MenuItem value="結果" onClick={(e=>{loadResult(e)})}>結果</MenuItem>
            </Menu>
            
            
        </div>
    )
}

//カロコス
function Overview(){
    return(
        <div className="block-div">
            <div><h1 className="title-css">カロコスとは？</h1></div>
            <div className="overView-font">
                カロコスとは、いつも食べ過ぎてしまうあなた。もしくは、貯金ができない。
                そんなあなたにぴったりなWebサイトです。
            </div>
        </div>
    )
}

//使い方
function AboutUse(){
    return(
        <div className="block-div">
            <div><h1 className="title-css">使い方</h1></div>
            <img className="img-useAbout" src="./images/main-useabout1.png" alt="UseImage 1"/>
        </div>
    )
}


//window.onload=()=>ReactDOM.render(<App />,document.getElementById('app'));
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);