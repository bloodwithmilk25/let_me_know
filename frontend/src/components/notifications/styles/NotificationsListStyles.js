export default {
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: 80,
    opacity: 0,
    animationName: "appear",
    animationDelay: "0.8s",
    animationDuration: "1.2s",
    animationFillMode: "forwards"
  },
  "@keyframes appear": {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  loaderCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  noNotifc:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 35,
}
};
