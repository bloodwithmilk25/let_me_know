{
  "@global": {
    ".effect-one > a": {
      "position": "relative"
    },
    ".effect-one > a:before": {
      "content": "\"\"",
      "position": "absolute",
      "width": "100%",
      "height": 2,
      "bottom": "0",
      "margin": "-5px 0",
      "backgroundColor": "white",
      "visibility": "hidden",
      "transform": "scaleX(0)",
      "transition": "all 0.4s ease-in-out 0s"
    },
    ".effect-one > a:hover:before": {
      "visibility": "visible",
      "transform": "scaleX(1)"
    }
  }
}
