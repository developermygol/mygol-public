import React, { Component } from 'react';
import hexRgb from 'hex-rgb';

import Login from './Login';
import TopBarMenu from './TopBarMenu';
import { observer, inject } from 'mobx-react';
import { Localize } from './Locale/Loc';
import { Link } from 'react-router-dom';
import { getUploadsIcon } from '../helpers/Utils';
import SocialIcons from './SocialIcons';
import { connect } from 'react-redux';
import { rgbaObjToString } from '../helpers/Theme';
import styled from 'styled-components';

@inject('store')
@observer
class TopBar extends Component {
  render() {
    const org = this.props.store.organization.current || {
      name: Localize('Empty organization'),
      motto: Localize('Empty organization2'),
      logoImgUrl: '/static/org/mygol-logo.png',
    };

    const StyledDiv = styled.div`
      ${props => {
        if (!Object.keys(props.theme).length > 0) return null;
        const { bgColor } = props.theme;
        const rgbColor = bgColor ? hexRgb(bgColor) : null;
        const bgColorString = bgColor
          ? `background: linear-gradient(to top,${rgbaObjToString(rgbColor, 0.6)},${rgbaObjToString(
              rgbColor
            )}) !important;`
          : '';
        return `${bgColorString}`;
      }}
    `;

    return (
      <StyledDiv className="TopBar">
        {org ? (
          <div className="OrgData">
            <TopBarMenu />
            <div
              className="Logo"
              style={{ backgroundImage: `url('${getUploadsIcon(org.logoImgUrl, org.id, 'org')}')` }}
            />
            <div className="OrgName">
              <Link to="/">
                <h1 className="Color1">{org.name}</h1>
              </Link>
              {org.motto ? <h2 className="Color2">{org.motto}</h2> : null}
            </div>
          </div>
        ) : null}
        <div className="Actions">
          <SocialIcons />
          <Login />
        </div>
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(TopBar);
