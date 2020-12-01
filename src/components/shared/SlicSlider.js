import React from 'react';
import Slider from 'react-slick';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplaySpeed: 7000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  //   beforeChange: function (currentSlide, nextSlide) {
  //     console.log('before change', currentSlide, nextSlide);
  //   },
  //   afterChange: function (currentSlide) {
  //     console.log('after change', currentSlide);
  //   },
};

const SlicSlider = ({ items }) => {
  return (
    <div className="SponsorSlider Bottom">
      <Slider {...settings}>{items}</Slider>
    </div>
  );
};

export default SlicSlider;
