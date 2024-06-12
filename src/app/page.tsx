import { VirtualizedSelect } from "@/components/virtualized-select";
import React from "react";

const options = new Map<
  string,
  { textValue: string; key: string; index: number }
>([]);

const abc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const length = 2000;
Array.from({ length }).forEach((_, i) => {
  options.set(`item-${i}`, {
    index: i,
    key: `item-${i}`,
    textValue: `${abc[Math.floor((i / length) * 26)]} item ${i}`,
  });
});

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center py-24">
      <h2 className="font-semibold text-3xl mb-10">Virtualized Select</h2>
      <VirtualizedSelect options={options} />
    </main>
  );
};

export default Page;
