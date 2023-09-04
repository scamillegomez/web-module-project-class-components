import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Form from './Form';
import TodoList from './TodoList';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      formValues: {
        name: '',
        id: '',
        completed: false
      },
      // todoDisplay: "block",
      // buttonText: "Hide Completed"
      showCompleted: true
    };
  }

  componentDidMount(){
    const data = [
      {
        name: 'Go for a walk',
        id: uuidv4(),
        completed: false
      },
      {
        name: 'Listen to a podcast',
        id: uuidv4(),
        completed: false
      },
      {
        name: 'Call mom',
        id: uuidv4(),
        completed: false
      } 
    ];

    this.setState({data});
  }

  onChange = (evt) => {
    const {name, value} = evt.target;
    // const valuetouse = type === 'checkbox' ? checked : value;
    this.setState(prevState=> ({ 
      formValues: {
        ...prevState.formValues,
      [name]:value
    }
    }));
  }

  onSubmit = (event) =>{
    event.preventDefault();
    const newItem = {
      name: this.state.formValues.name.trim(),
      id: uuidv4(),
      completed: false
    };
    this.setState( prevState => ({
      data: [...prevState.data, newItem],
      formValues: {
        name: '',
        id: '',
        completed: false
      }
    }));
  }

  onCheck = (itemId) => {
    this.setState(prevState=>{
      const updatedData = prevState.data.map(item=>{
        if(item.id === itemId){
          return {
            ...item, 
            completed: !item.completed
          };
        }
        return item;
      });
      return {data: updatedData};
    });
  }

  toggleShowCompleted = () => {
    this.setState(prevState=>({
      showCompleted: !prevState.showCompleted
    }));
  }

  render() {
    const filteredData = this.state.showCompleted ?
                          this.state.data : 
                          this.state.data.filter(item=>!item.completed);
    return (
      <div>
        Todo App
        <Form 
          onChange={this.onChange} 
          onSubmit={this.onSubmit} 
          formValues={this.state.formValues}
          showCompleted={this.state.showCompleted}
          toggleShowCompleted ={this.toggleShowCompleted}
            />
        <TodoList data={filteredData} onCheck={this.onCheck} />
      </div>
    )
  };
};
