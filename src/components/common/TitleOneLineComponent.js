import React, { Component } from 'react';

class TitleOneLineComponent extends Component {
  render() {
    const p = this.props;

    return (
      <div className={'TitleOne ' + (p.className || '')}>
        {p.image || null}
        <h2 className="Main Color1">{p.title}</h2>
      </div>
    );
  }
}

export default TitleOneLineComponent;
