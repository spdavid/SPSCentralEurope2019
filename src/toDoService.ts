export interface IToDoItem {
  Title: string;
  DueDate: string;
  Category: string;
}


export class toDoService {

  private allItems: IToDoItem[] =
    [{
      Title: "Feed Dog",
      Category: "Home",
      DueDate: "2019-10-05"
    },
    {
      Title: "Finish Speach",
      Category: "Community",
      DueDate: "2019-08-30"
    }
    ];

  public async GetToDos(): Promise<IToDoItem[]> {
    return this.allItems;
  }

  public async AddToDo(item : IToDoItem)
  {
    this.allItems.push(item);
  }

}


