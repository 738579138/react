require('./less/app.less');
import React,{Component}  from 'react'
import {render} from 'react-dom'
import { Router } from 'react-router';
import classNames from 'classnames';
import SkillJson from './json/skill.json';
import baseInfo from './json/baseinfo.json'
import project from './json/project.json'
import company from './json/company.json'

class Round extends Component {
  constructor(d){
      super(d)
      //获取可滚动范围
      this.bodyW = document.body.clientWidth - 200;
      this.bodyH = document.body.clientHeight - 200;
      //获取初始定位位置
      this.srcolltop = Math.random() * this.bodyH;
      this.scrollLeft = Math.random() *this.bodyW;
      //获取初始滚动增加量
      this.changeTopNum = Math.random() * 50 + 10
      this.changeLeftNum = Math.random() * 50 + 10
      // 初始定位
      this.state = {
        round:{
          top: this.srcolltop +'px',
          left: this.scrollLeft +'PX',
        }
      }
      this.stime = '';
  }
  componentDidMount(){
    this.scroll();
  }
  //滚动函数
  scroll = () => {
    this.stime = setInterval(() => {
      //调用增量正负变化函数
      this.computerTop(this.changeTopNum);
      this.computerLeft(this.changeLeftNum);
      //改变圆球位置
      this.setState({
        round:{
          top: this.srcolltop + 'px',
          left: this.scrollLeft + 'px',
        }
      })

      // 判断传递到到增量变化函数的值
      if(this.srcolltop >=  this.bodyH){
        this.changeTopNum = this.changeTopNum * -1;
      }
      if(this.srcolltop <= 0) {
        this.changeTopNum = this.changeTopNum * -1;
      }

      if(this.scrollLeft >=  this.bodyW){
        this.changeLeftNum = this.changeLeftNum * -1;
      }
      if(this.scrollLeft <= 0) {
        this.changeLeftNum = this.changeLeftNum * -1;
      }
    }, 180)
  }
  //停止滚动
  timeStop = (e) => {

    clearInterval(this.stime)
    //获取元素当前位置
    this.srcolltop = parseFloat( e.currentTarget.style.top)
    this.scrollLeft = parseFloat( e.currentTarget.style.left)

  }
  //上下增量变化
  computerTop(d){
    this.srcolltop += d;
  }
  //左右增量变化
  computerLeft(d){
    this.scrollLeft += d;
  }
  beginclick=()=>{
    this.setState({
      isshow: true
    })
  }
  offclick=()=>{
    this.setState({
      isshow: false
    })
  }
  render(){
    const { isshow , round } = this.state;
    return(
      <section>
        <a style={this.state.round}  className="prop-round" onClick={this.beginclick} onMouseOut={this.scroll} onMouseOver={this.timeStop} >
          {this.props.tit}
          <div>点击查看详情</div>
        < /a>
        <div className= {classNames('details', {'show': isshow})} onClick={this.offclick}>{this.props.children}</div> 
      </section>
      )
  }
}



class Home extends Component {
  render() {
    return(
      <div className = "wrap">
        <Round tit="技能">
          <div className="skill">
            {SkillJson.map((i,index)=>{
              return(
                <section key={index}>
                  <h3>{i.name}</h3>
                  <ul>
                    { i.detail.map((v,num)=>{
                       return <li key={num}>{v}</li>
                     })
                    }
                  </ul>
                </section>
                )
            })}
          </div>
        </Round>
        <Round tit="基本信息" >
          <div className="baseinfo">
            <section>
              {baseInfo.base.map((i,index)=>{
                return <h1 key={index}>{i}</h1>
              })}
            </section>
          </div>
        </Round>
        <Round tit="项目经验" >
          <div className="projectExperience">
            {
              project.map((i,index)=>{
                return(
                  <section key={index}>
                    <h3><a href={i.link}>{i.name}</a></h3>
                    <p>项目描述:{i.detail}</p>
                  </section>
                  )
              })
            }
          </div>
        </Round>
        <Round tit="公司经历">
          <div className="baseinfo">
            <section>
              {company.company.map((i,index)=>{
                return <h1 key={index}>{i}</h1>
              })}
            </section>
          </div>
        </Round>
      </div>
      )
  }
}


render(<Home/>,document.getElementById('myself'));