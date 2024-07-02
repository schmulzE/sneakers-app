export interface Slides {
  url1: string;
  url2: string;
}

interface SlideProp {
  imageClass: string,
  url: string,
  additionalClasses: string 
}

const Slide: React.FC<SlideProp> = ({ imageClass, url, additionalClasses }) => (
  <div
    style={{ backgroundImage: `url(${url})` }}
    className={`${imageClass} ${additionalClasses} border-black border bg-center bg-cover`}
  ></div>
);


export default Slide;