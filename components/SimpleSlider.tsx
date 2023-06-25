import Slider from 'react-slick';
import utilsStyles from '@/styles/utils.module.css';

// TODO: create more modern testimonials section instead of this slider.
// Remove its dependencies.
export default function SimpleSlider({ items }) {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h1 className={utilsStyles.headingSm}>What do people say about me...</h1>
      <Slider {...settings}>
        {items?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Slider>
    </div>
  );
}
