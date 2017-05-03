import  React,{Component} from 'react'
import './detail.less'
export default class Detail extends Component {
  constructor(d){
    super(d);
  }
  render(){
    const id = this.props.match.params.id
    return(
      <div className="detail">
       <img src={
        id == 1?'/src/images/detail.jpg':
        id == 2?'/src/images/detail_02.jpg':
        id == 3?'/src/images/detail_03.jpg':
        id == 4?'/src/images/detail_04.jpg':
        id == 5?'/src/images/05.jpg':
        id == 6?'/src/images/06.jpg':
        id == 7?'/src/images/07.jpg':
        id == 8?'/src/images/08.jpg':
        ''
      } alt="1"/>
      </div>
      )
  }
}