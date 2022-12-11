import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolbarButton } from '@ohif/ui';
import { ExpandableToolMenu } from '@ohif/ui';
import { commandsManager } from '../../platform/viewer/src/App';
import Dropzone from 'react-dropzone';
export class LayoutButton extends Component {
  onClick = () => {
    window.location.href = '/local';
  };

  render() {
    return (
      <div className="btn-group">
        <ToolbarButton
          isActive={false}
          label="回到主页"
          icon="times"
          onClick={this.onClick}
        />
      </div>
    );
  }
}

// function _getExpandableButtonComponent(button, activeButtons) {
//   // Iterate over button definitions and update `onClick` behavior
//   let activeCommand;
//   const childButtons = button.buttons.map(childButton => {
//     childButton.onClick = _handleToolbarButtonClick.bind(this, childButton);

//     if (activeButtons.map(button => button.id).indexOf(childButton.id) > -1) {
//       activeCommand = childButton.id;
//     }

//     return childButton;
//   });

//   return (
//     <ExpandableToolMenu
//       key={button.id}
//       label={button.label}
//       icon={button.icon}
//       buttons={childButtons}
//       activeCommand={activeCommand}
//     />
//   );
// }

class FileButton extends Component {
  static propTypes = {
    changeFile: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      button: {
        id: 'file',
        label: '打开',
        icon: 'cube',
        buttons: [],
      },
      changeFile: {},
    };
  }
  componentDidMount() {
    this.getDefaultButtonObj();
  }
  onClick = () => {
    window.location.href = '/local';
  };
  getDefaultButtonObj() {
    let button = {
      id: 'file',
      label: '打开',
      icon: 'cube',
      buttons: [
        {
          id: 'openfile',
          label: '打开文件',
          icon: 'cube',
          commandName: 'openFile',
          type: 'command',
        },
        {
          id: 'openfiles',
          label: '打开文件夹',
          icon: 'cube',
          commandName: 'openFileFold',
          type: 'command',
        },
      ],
    };
    const childButtons = button.buttons.map(childButton => {
      if (childButton.commandName == 'openFile') {
        childButton.onClick = () => {
          document.getElementById('MYloadfile').click();
        };
      } else {
        childButton.onClick = () => {
          document.getElementById('MYloadfileFold').click();
        };
      }
      return childButton;
    });
    this.setState({
      button: button,
      childButtons: childButtons,
    });
  }
  render() {
    return (
      <div className="btn-group">
        <ExpandableToolMenu
          key={this.state.button.id}
          label={this.state.button.label}
          icon={this.state.button.icon}
          buttons={this.state.childButtons}
        />
        <Dropzone onDrop={this.props.changeFile}>
          {({ getRootProps, getInputProps }) => (
            <>
              <input id="MYloadfile" {...getInputProps()}></input>
              <input
                id="MYloadfileFold"
                {...getInputProps()}
                webkitdirectory="true"
                mozdirectory="true"
              ></input>
            </>
          )}
        </Dropzone>
      </div>
    );
  }
}

export { FileButton };
export default LayoutButton;
