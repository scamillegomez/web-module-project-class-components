import React from 'react'
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        <div>
        {this.props.data.map(item=>{
              return(
                <Todo item={item} onCheck={this.props.onCheck} key={item.id}/>
              );
          })
          }
      </div>
      </div>
    )
  }
}
