import React, { Component } from "react";
import loadDiagram from "../../helpers/loadDiagram";
import "./Diagram.css";

export default class Diagram extends Component {
  constructor(props) {
    super(props);

    this.resizeSVG = this.resizeSVG.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeSVG);
    window.requestAnimationFrame(() => {
      this.resizeSVG();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeSVG);
  }

  resizeSVG() {
    this.forceUpdate();
    this.redrawDiagram();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.redrawDiagram();
    }
  }

  redrawDiagram() {
    const svgElement = document.querySelector(`#${this.props.id}`);
    while (svgElement?.lastChild) {
      svgElement.removeChild(svgElement.lastChild);
    }
    loadDiagram(this.props.diagramData, this.props.id);
  }

  render() {
    const width = Math.min(
      parseInt(document.querySelector(".richContentContainer")?.clientWidth) *
        0.6 ?? 300,
      800
    );
    console.log(width);
    // pick height at 2/5th the width to create a nice landscape ratio
    const height = (width * 2) / 5;
    return (
      <div>
        <svg
          tabIndex="0"
          className="diagram"
          id={this.props.id}
          width={`${width}`}
          height={`${height}`}
        />
        <div className="diagramTitle">{this.props.diagramData.title}</div>
      </div>
    );
  }
}
