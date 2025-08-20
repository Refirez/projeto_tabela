import elements from "../../data/elements.json";
import Link from "next/link";

export default function Tabela() {
  return (
    <div className="p-8 grid grid-cols-10 gap-2">
      {elements.map((el) => (
        <Link
          key={el.symbol}
          href={`/elemento/${el.symbol}`}
          className="w-16 h-16 flex items-center justify-center border rounded-lg bg-white hover:bg-blue-200 transition"
        >
          {el.symbol}
        </Link>
      ))}
    </div>
  );
}
