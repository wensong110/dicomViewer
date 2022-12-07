import React, { Component } from 'react';

import { ToolbarButton } from '@ohif/ui';

export class LayoutButton extends Component {

  onClick = () => {
    window.location.href='/local';
  };

  render() {
    return (
      <div className="btn-group">
        <ToolbarButton
          isActive={false}
          label='回到主页'
          icon="times"
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export default LayoutButton;
