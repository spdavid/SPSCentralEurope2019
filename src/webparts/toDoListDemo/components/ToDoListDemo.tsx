import * as React from 'react';
import styles from './ToDoListDemo.module.scss';
import { IToDoListDemoProps } from './IToDoListDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IToDoItem, toDoService } from '../../../toDoService';
import ToDoListItems from './ToDoListItems'
import AddToDo from './AddToDo'


export interface IToDoListDemoState {
  items: IToDoItem[];
}


export default class ToDoListDemo extends React.Component<IToDoListDemoProps, IToDoListDemoState> {

  private service: toDoService;

  constructor(props: IToDoListDemoProps) {
    super(props);
    this.state = {
      items: []
    };

    this.service = new toDoService();
  }

  public async componentDidMount() {
    let todos = await this.service.GetToDos();

    this.setState({ items: todos });

  }



  public render(): React.ReactElement<IToDoListDemoProps> {
    return (
      <div>
        <AddToDo onNewToDo={this.ToDoAdded}></AddToDo>
        <ToDoListItems key={Math.random()} items={this.state.items}></ToDoListItems>
      </div>
    );
  }

  private ToDoAdded = async (newToDo : IToDoItem) =>
  {
      await this.service.AddToDo(newToDo);
      let updatedItems = await this.service.GetToDos();
      this.setState({items : updatedItems});
  }
}
