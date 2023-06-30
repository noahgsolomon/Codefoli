import React from "react";

type props = {
    items: string[]
}

const Marquee: React.FC<props> = ({items}) => {
  return (
    <div className="overflow-x-hidden bg-black mt-32">
    <div className="py-8 animate-marquee whitespace-nowrap ">
        {items.map(item => <span className="mx-4 text-2xl font-bold text-white" key={item}>{item}</span>)}
    </div>
</div>
  )
}

export default Marquee