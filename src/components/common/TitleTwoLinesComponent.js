import React, { Component } from 'react';

class TitleTwoLinesComponent extends Component {
  render() {
    const p = this.props;

    return (
      <div className={'Title ' + (p.className || '')}>
        {p.image || null}
        <h2 className="Main">
          <span className="Main Color1">{p.title}</span> <span className="Secondary Color2">{p.title2}</span>
        </h2>
      </div>
    );
  }
}

export default TitleTwoLinesComponent;
