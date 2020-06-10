import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Loc from "../../common/Locale/Loc";
import Spinner from "../../common/Spinner/Spinner";
import ContentSection from "./ContentSection";
import SponsorBanner from "../../common/SponsorBanner";

@inject("store")
@observer
class Content extends Component {
  componentDidMount() {
    const target = this.props.store.contents;

    target.getSummaries();
  }

  render() {
    const p = this.props;
    const target = p.store.contents;

    return (
      <Spinner loading={target.loading}>
        {target.all ? (
          <div className="">
            <ContentSection
              category={2}
              perRow={1}
              entries={target.all}
              limit={1}
              moreButton
            />
            <SponsorBanner className="Secondary" position={2} organization />
            <ContentSection
              category={3}
              perRow={3}
              entries={target.all}
              limit={9}
              moreButton
            />
          </div>
        ) : (
          <Loc>NoNews.PleaseAddSome</Loc>
        )}
      </Spinner>
    );
  }
}

export default Content;
