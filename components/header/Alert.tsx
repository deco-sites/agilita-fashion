import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";

import Icon from "../ui/Icon.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 3 }: Props) {
  const id = useId();
  const { displayAlert } = useUI();

  return (
    <div id={id} class="flex flex row">
      {displayAlert.value == true ? ("") : (
        <>
          <Slider class="carousel carousel-center bg-primary gap-6 scrollbar-none">
            {alerts.map((alert, index) => (
              <Slider.Item index={index} class="carousel-item">
                <span class="text-[12px] xl:tracking-[4.2px] text-neutral flex justify-center items-center w-screen h-[30px]">
                  {alert}
                </span>
              </Slider.Item>
            ))}
          </Slider>

          <SliderJS rootId={id} interval={interval && interval * 1e3} />
          <button
            class="bg-primary text-black pr-[10px] w-[30px] text-[10px] flex justify-center items-center "
            onClick={() => {
              displayAlert.value = true;
            }}
          >
            <Icon
              class="text-black bg-transparent"
              id="XMark"
              width={20}
              height={20}
              strokeWidth={2}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default Alert;
