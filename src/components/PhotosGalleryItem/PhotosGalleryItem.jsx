import styles from './PhotosGalleryItem.module.css';

const PhotosGalleryItem = ({
  image: {
    src: { large },
    alt,
    avg_color,
  },
}) => {
  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: avg_color,
        borderColor: avg_color,
      }}
    >
      <img src={large} alt={alt} />
    </div>
  );
};
export default PhotosGalleryItem;
