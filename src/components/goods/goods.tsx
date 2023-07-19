type GoodsProps = {
  goods: string[];
}

export function Goods({ goods }: GoodsProps) {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {Array.from({ length: goods.length }, (_, i) => (
          <li className="offer__inside-item" key={i}>{goods[i]}</li>
        ))}
      </ul>
    </div>
  );
}
