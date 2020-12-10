import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const defaultProps = {
  className: null,
  items: [{ id: 1, name: 'sampleTab' }],
  tabCaptionField: 'name',
  defaultTab: 0,
  //contentCallback: (tab) => <p>{'Tab: ' + tab.name + ' (' + tab.id + ')'}</p>
  onChange: null,
};

@observer
class TabControl extends Component {
  @observable currentItem = null;

  componentDidMount = () => {
    const p = this.props;
    const { items } = p;
    if (!items || items.length === 0) return;

    this.setVisibleItem(items[p.defaultTab]);
  };

  setVisibleItem = item => {
    if (!item) return;
    this.currentItem = item;

    const callback = this.props.onChange;
    if (callback) callback(item);
  };

  render() {
    const p = this.props;
    const { items } = p;
    const cc = p.contentCallback;

    if (!items || items.length === 0) return null;

    if (items.length === 1) {
      return cc && cc(items[0]);
    }

    return (
      <div className={p.className}>
        <ul className="TabBar">
          {items.map(item => {
            return (
              <button
                key={item.id}
                className={'TabItem' + (this.currentItem === item ? ' Active Color1' : ' Color2')}
                onClick={() => {
                  this.setVisibleItem(item);
                }}
              >
                {item[p.tabCaptionField]}
              </button>
            );
          })}
        </ul>
        <div className="TabContent">{this.currentItem ? cc && cc(this.currentItem) : null}</div>
      </div>
    );
  }
}

TabControl.defaultProps = defaultProps;

export default TabControl;
