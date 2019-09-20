import * as React from 'react';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import {IToDoItem} from '../../../toDoService';

const options: IDropdownOption[] = [
  { key: 'Home', text: 'Home' },
  { key: 'Community', text: 'Community' },
  { key: 'Work', text: 'Work' },
  { key: 'Family', text: 'Family' }
];

export interface IAddToDoProps {
    onNewToDo : (newToDo : IToDoItem) => void;

 }

export interface IAddToDoState {
  showPanel: boolean;
  title: string;
  category : string;
  dueDate: string;
}

export default class AddToDo extends React.Component<IAddToDoProps, IAddToDoState> {
  constructor(props: IAddToDoProps) {
    super(props);

    this.state = {
      showPanel: false,
      title : "",
      category : "",
      dueDate : ""
    };
  }

  public render(): React.ReactElement<IAddToDoProps> {
    return (
      <div>
        <ActionButton onClick={this._showPanel} iconProps={{ iconName: "Add" }} allowDisabledFocus >
          Add ToDo
        </ActionButton>
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._hidePanel}
          headerText="Add a ToDo"
          closeButtonAriaLabel="Close"
          onRenderFooterContent={this._onRenderFooterContent}
        >

          <TextField label="Title" onChange={this._onChangeTitle} />

          <DatePicker onSelectDate={this._onChangeDueDate} label="Due Date" firstDayOfWeek={DayOfWeek.Monday} placeholder="Select a due date..." ariaLabel="Select a due date" />

          <Dropdown
            onChange={this._onChangeCategory}
            label="Select Category"
            defaultSelectedKey="Home"
            options={options}


          />


        </Panel>
      </div>
    );
  }
  private _onRenderFooterContent = () => {
    return (
      <div>
        <PrimaryButton onClick={this._onsave} style={{ marginRight: '8px' }}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={this._showPanel}>Cancel</DefaultButton>
      </div>
    );
  };

private _onsave = ()=>
{
    this.props.onNewToDo({Title : this.state.title, Category : this.state.category, DueDate : this.state.dueDate});
    this._hidePanel();
  }

  private _onChangeTitle = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ title: newValue || '' });
  }

  private _onChangeCategory = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    this.setState({ category: option.text || '' });
  }

  private _onChangeDueDate = (date: Date | null | undefined) => {
    this.setState({ dueDate: date.toLocaleDateString() || '' });
  }


  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };

}


