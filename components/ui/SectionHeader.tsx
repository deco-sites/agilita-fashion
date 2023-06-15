interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col  ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-[35px] leading-8 lg:leading-10 tracking-[8px] font-light mt-[20px]
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:ttext-[35px]" : "lg:text-[35px]"}
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={` 
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-white" : "text-black"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-[14px]" : "lg:text-[14px]"}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
