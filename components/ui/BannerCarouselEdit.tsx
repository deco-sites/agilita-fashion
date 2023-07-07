import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description mobile otimized image */
  title?: string;
  /** @description mobile otimized image */
  titleSub?: string;

  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;
  /** @description Button label */
  label?: string;
}

export interface Props {
  titleDesktop?: boolean;
  titleSubDesktop?: boolean;
  titleMobile?: boolean;
  titleSubMobile?: boolean;
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
  { titleDesktop, titleMobile, titleSubDesktop, titleSubMobile }: Props,
) {
  const {
    alt,
    mobile,
    desktop,
    href,
    label,
  } = image;

  return (
    <div class="flex flex-col itens-center justify-center w-full overflow-y-hidden">
      <a
        href={href ?? "#"}
        aria-label={label}
        class="flex itens-center justify-center w-full overflow-y-hidden px-8  lg:px-0"
      >
        <Picture preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={480}
            height={720}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={480}
            height={720}
          />
          <img
            class="object-cover"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>

      <div class="flex w-full items-center gap-4 flex-col justify-center my-[15px] ">
        <span
          class={`tracking-[4.2px]  text-[14px]`}
        >
          {image.title}
        </span>
        <span
          class={`font-normal text-[10px]`}
        >
          {image.titleSub}
        </span>
      </div>
    </div>
  );
}

function Dots({ images, interval = 3 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="hidden  items-center justify-center pr-[550px] z-10 col-start-2 row-start-2 lg:flex">
        <Slider.PrevButton class="btn btn-circle bg-transparent">
          <Icon
            class="text-black"
            size={15}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="hidden items-center justify-center pl-[550px] z-10 col-start-2 row-start-2 lg:flex">
        <Slider.NextButton class="btn btn-circle bg-transparent">
          <Icon
            class="text-black"
            size={15}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(
  {
    images,
    preload,
    interval,
  }: Props,
) {
  const id = useId();

  return (
    <div
      id={id}
      class=" grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] mb-[45px] mt-[80px]"
    >
      <Slider class="container  carousel carousel-center col-span-full row-span-full scrollbar-none gap-[11vw] ">
    
        {images?.map((image, index) => (
          <Slider.Item
            index={index}
            class={`carousel-item  ${index === 0 ? "ml-[-150px]": "" }   `}
          >
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
       
      </Slider>

      <Buttons />

      <Dots images={images} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
