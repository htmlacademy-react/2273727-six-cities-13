const IMAGES_COUNT = 6;

type ImgContainerProps = {
  images: string[];
}

export function ImgContainer({ images }: ImgContainerProps) {
  return (
    <>
      {Array.from({ length: IMAGES_COUNT }, (_, i) => (
        <div className="offer__image-wrapper" key={i}>
          <img
            className="offer__image"
            src={images[i]}
            alt="Photo studio"
          />
        </div>
      ))}
    </>
  );
}

