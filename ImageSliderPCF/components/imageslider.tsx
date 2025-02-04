import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ImageSliderItem, ImageSliderProps } from '../utils/interfaces';
import '../css/image-slider.css';

// defines the default image list if no images are passed in
const IMAGES = [
    {
        id: 1,
        name: 'Placeholder 350x150',
        imageUrl: 'https://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png',
    },
    {
        id: 2,
        name: 'Placeholder 500x250',
        imageUrl: 'https://fabricweb.azureedge.net/fabric-website/placeholders/500x250.png',
    },
] as ImageSliderItem[];

export const ImageSlider = React.memo((props: ImageSliderProps) => {
    const { imageUrls = [], width, iconColour } = props;
    const [imageIndex, setImageIndex] = React.useState(0);
    const [imageList, setImageList] = React.useState<ImageSliderItem[]>(IMAGES);

    //To avoid the control crashing have a placeholder image if no images are passed in
    const src = imageUrls?.length === 0 ? IMAGES : imageUrls;

    React.useEffect(() => {
        setImageList(src);
    }, [imageUrls]);

    const classes = mergeStyleSets({
        iconArrow: {
            fontSize: '2em',
            color: iconColour,
        },
        iconDot: {
            color: iconColour,
        },
    });

    const IconLeft = () => <Icon iconName="ChevronLeft" className={classes.iconArrow} />;
    const IconRight = () => <Icon iconName="ChevronRight" className={classes.iconArrow} />;
    const IconCircle = () => <Icon iconName="LocationCircle" className={classes.iconDot} />;
    const IconCircleDot = () => <Icon iconName="Location" className={classes.iconDot} />;

    function previousImage() {
        if (imageIndex === 0) {
            return;
        }
        setImageIndex((previousImageIndex) => previousImageIndex - 1);
    }

    function nextImage() {
        if (imageIndex === imageUrls.length - 1) {
            return;
        }
        setImageIndex((previousImageIndex) => previousImageIndex + 1);
    }

    function downloadImage() {
        window.open(imageList[imageIndex].imageUrl, '_blank');
    }

    const rootStyle = React.useMemo(() => {
        return {
            maxWidth: '1200px',
            width: width,
            aspectRatio: '16/9',
            margin: '0 auto',
        } as React.CSSProperties;
    }, [width]);

    return (
        <div style={rootStyle}>
            <div className="img-slider-container">
                <div className="img-slider-image-div">
                    {imageList.map((url) => {
                        return (
                            <img
                                key={url.id}
                                src={url.imageUrl}
                                aria-label={url.name ? url.name : ''}
                                className="img-slider-img"
                                style={{ translate: `${-100 * imageIndex}%` }}
                                onClick={downloadImage}
                                loading="lazy"
                            />
                        );
                    })}
                </div>
                {imageList[imageIndex].name}

                {imageIndex > 0 && (
                    <button onClick={previousImage} className="img-slider-btn" style={{ left: '0' }}>
                        <IconLeft />
                    </button>
                )}
                {imageIndex < imageList.length - 1 && (
                    <button onClick={nextImage} className="img-slider-btn" style={{ right: '0' }}>
                        <IconRight />
                    </button>
                )}

                <div className="img-slider-dots">
                    {imageList.map((_, index) => {
                        return (
                            <button
                                key={index}
                                className="img-slider-dot-btn"
                                aria-label="Image Slider Dot"
                                onClick={() => setImageIndex(index)}
                            >
                                {' '}
                                {imageIndex === index ? <IconCircleDot /> : <IconCircle />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

ImageSlider.displayName = 'ImageSlider';

export default ImageSlider;
