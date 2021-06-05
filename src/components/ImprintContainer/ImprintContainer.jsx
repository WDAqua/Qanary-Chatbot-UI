import React, { Component } from "react";
import { ContentContainer } from "..";
import { textsHelper } from "../../helpers";

export default class ImprintContainer extends Component {
  texts = textsHelper.getTexts();

  componentDidMount() {
    this.listenerId = textsHelper.addListener(() => {
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    textsHelper.removeListener(this.listenerId);
  }

  render() {
    return (
      <ContentContainer
        id="imprint"
        dangerouslySetInnerHTML={this.texts.credits}
      />
    );
  }
}
