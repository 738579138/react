import '../less/index.less'
import React,{Component} from 'react'
import imgJson from '../json/img.json'
import {Link} from 'react-router-dom'
export default class Home extends Component{
  constructor(d){
    super(d);
  }
  render(){
      return(
          <div className="home">
            <header>
              <img src={imgJson.homehead} alt="风景"/>
            </header>
            <ul>
              { 
                imgJson.proImg.map((v,num)=>{
                  return  <li key={num}>
                            <Link  to={`/detail/${num+1}`}>
                              <img src={v.img} alt="选项图片"/>
                              {v.name}
                            </Link>
                          </li>
                             })
              }
            </ul>
          </div>
        )
  }
}