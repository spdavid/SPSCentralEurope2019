import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IToDoItem } from '../../../toDoService';

export interface IToDoListItemsProps {
  items: IToDoItem[];
}

export interface IToDoListItemsState {
  items: IToDoItem[];
}

export default class ToDoListItems extends React.Component<IToDoListItemsProps, IToDoListItemsState> {
  private _selection: Selection;
  private _columns: IColumn[];


  constructor(props: IToDoListItemsProps) {
    super(props);

    this.state = {
      items: this.props.items
    };

    this._columns = [
      { key: 'column1',  name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'DueDate', fieldName: 'DueDate', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column3', name: 'Category', fieldName: 'Category', minWidth: 100, maxWidth: 200, isResizable: true }
    ];
  }

  public render(): React.ReactElement<IToDoListItemsProps> {
    return (
      <Fabric>
        <TextField
          label="Filter by name:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={this.state.items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this.props.items.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this.props.items
    });
  };

  private _onItemInvoked = (item: IToDoItem): void => {
    alert(`Item invoked: ${item.Title}`);
  };
}
