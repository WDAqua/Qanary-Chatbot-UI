import React, { Component } from "react";
import { Button, ContentContainer } from "..";
import { textsHelper } from "../../helpers";

export default class SettingsContainer extends Component {
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
        <ContentContainer id="exemplaryQuestions">
        {this.texts["exemplary-questions"].map((section, i) => (
          // i is the shortest unique identifier in this case and the content will not be updated
          <div key={i} className="exampleQuestion">
            <div className="questionSectionTitle">{section.title}</div>
            {section.questions.map((questionText, j) => (
              <div key={j} className="exampleQuestion">
                <div>{questionText}</div>
                <Button
                onClick={() => {
                  this.props.sendMessage(questionText);
                  document
                    .getElementById("exemplaryQuestions")
                    .classList.toggle("hidden");
                }}
                text={this.texts["example-questions"]["ask-question"]}
               />
              </div>
            ))}
          </div>
        ))}
      </ContentContainer>
    );
  }
}
