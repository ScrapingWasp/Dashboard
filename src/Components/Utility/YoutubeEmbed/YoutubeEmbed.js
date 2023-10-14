import { BASIC_RADIUS, MEAN_GRAY } from "../Colors";
import classes from "./YoutubeEmbed.module.css";

const YoutubeEmbed = ({ embedId, width, height }) => (
  <div
    className={classes.videoResponsive}
    style={{
      paddingBottom: `${(height / width) * 100}%`,
      boxShadow: `2px 3px 5px ${MEAN_GRAY}`,
    }}>
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="Embedded tutorial"
      style={{
        borderRadius: BASIC_RADIUS,
      }}
    />
  </div>
);

YoutubeEmbed.defaultProps = {
  width: 853,
  height: 480,
};

export default YoutubeEmbed;
