import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  return (<>
    <span class="text-[14px]">Ordenar por : </span>
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="w-min h-[36px] px-1 rounded-none bg-transparent m-2 cursor-pointer outline-none border-b border-[#242424]"
    >
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value} selected={value === sort}>
          <span class="text-[12px] uppercase ">{label}</span>
        </option>
      ))}
    </select>
    </>
  );
}

export default Sort;
