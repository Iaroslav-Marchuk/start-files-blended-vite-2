import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

const PhotosGallery = ({ images }) => {
  return (
    <Grid>
      {images.map(image => (
        <GridItem key={image.id}>
          <PhotosGalleryItem image={image} />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PhotosGallery;
