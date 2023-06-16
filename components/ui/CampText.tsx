import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  text: string;
}

export default function BannerSolo({
  text,
}: Props) {
  return (
    <section class="w-full my-[30px] overflow-hidden">
      <div class="flex w-full items-center gap-3 flex-col justify-center my-[20px]">
        <span
          class="text-[12px] text-[#aaa]"
        >
          {text}
        </span>
      </div>
    </section>
  );
}
