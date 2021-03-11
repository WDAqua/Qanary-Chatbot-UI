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
    const svgElement = document.querySelector("svg");
    while (svgElement?.lastChild) {
      svgElement.removeChild(svgElement.lastChild);
    }
    loadDiagram(this.props.diagramData, this.props.id);
  }

  render() {
    return <svg tabIndex="0" className="diagram" id={this.props.id} />;
  }
}
