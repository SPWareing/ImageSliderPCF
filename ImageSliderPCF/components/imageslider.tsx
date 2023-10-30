import *  as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon'
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';
import '../css/image-slider.css'


export interface ImageSliderItem {
    id: number | string;
    imageUrl: string ;
    name?: string ;
}

export interface ImageSliderProps {
    imageUrls: ImageSliderItem[];
    width?: number;
    iconColour?: string | undefined;

}
// defines the default image list if no images are passed in
const IMAGES = [
    {id : 1, name: "Placeholder 350x150", imageUrl:"https://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png"},
    {id: 2, name: "Placeholder 500x250",imageUrl:"https://fabricweb.azureedge.net/fabric-website/placeholders/500x250.png"}, 
     ] as ImageSliderItem[];

export const ImageSlider = React.memo((props: ImageSliderProps) => {

    const { imageUrls , width, iconColour } = props;
    const [imageIndex, setImageIndex] = React.useState(0);
    const [imageList, setImageList] = React.useState<ImageSliderItem[]>(IMAGES);

    //To avoid the control crashing have a placeholder image if no images are passed in
    const src = imageUrls.length === 0? IMAGES: imageUrls;
    
                
    React.useEffect(() => {
        
        setImageList(src);
        //console.log("imageUrls changed:", imageUrls);
        // Perform side effect here
      }, [src]);

    const iconClassArrow = mergeStyles({
        fontSize: "2em",
        color:iconColour
      });

    
      const iconClassDot = mergeStyles({
        
        color:iconColour
      });


    const IconLeft = () => <Icon iconName="ChevronLeft" className={iconClassArrow}/>;
    const IconRight = () => <Icon iconName="ChevronRight" className={iconClassArrow}/>;
    const IconCircle = () => <Icon iconName="LocationCircle" className={iconClassDot} />;
    const IconCircleDot = () => <Icon iconName="Location" className={iconClassDot} />;


    function previousImage() {
        if (imageIndex === 0) {
            return;
        }
        setImageIndex(previousImageIndex => previousImageIndex - 1);
    }

    function nextImage() {
        if (imageIndex === imageUrls.length - 1) {
            return;
        }
        setImageIndex(previousImageIndex => previousImageIndex + 1);
    }

    


    const rootStyle = React.useMemo(() => {
        return {
            maxWidth:"1200px", 
            width: width,
            aspectRatio:"16/9",
            margin: "0 auto"
        } as React.CSSProperties;
    }, [width]);




    return (<div style={rootStyle}>
        <div style={{
            width:"100%",
            height:"100%",
            position:"relative",
            color:"rgba(21,21,21,0.9)",
            fontFamily: "Segoe UI,SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",
            }}>

            <div style={{
                width:"100%",
                height:"100%",
                display:"flex",
                overflow:"hidden",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
            }} >
                {imageList.map(url => {
                   return <img 
                   key={url.id} 
                   src={url.imageUrl} 
                   aria-label= {url.name? url.name : ""}
                   className='img-slider-img'
                   style={{ translate: `${-100 * imageIndex}%` }} onClick={() => window.open(url.imageUrl, "_blank")}
                   />
                })}
            
                </div>    
            
             
             {imageIndex > 0 &&<button onClick={previousImage} className='img-slider-btn' style={{left:"0"}}>
                <IconLeft /></button>}
            {imageIndex < imageList.length -1 && <button onClick={nextImage} className='img-slider-btn' style={{right:"0"}}>
                <IconRight/></button>}
            
            <div    style={{
                position:"absolute",
                bottom:"0.25rem",
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                gap:"0.25rem"
            
            }}>
                {imageList.map((_, index) => 
                {return <button key={index} className='img-slider-dot-btn'
                onClick={() => setImageIndex(index)}> { imageIndex === index? <IconCircleDot/> : <IconCircle />}</button>})}
            </div>
                   {imageList[imageIndex].name }
               

        </div>
        
        </div>
    );
});

ImageSlider.displayName = 'ImageSlider';

export default ImageSlider;


