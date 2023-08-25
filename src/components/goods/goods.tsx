type GoodsProps = {
  goods: string[];
}

export const Goods = ({ goods }: GoodsProps) => (
  <div className="offer__inside" data-testid="goods">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {Array.from({ length: goods.length }, (_, i) => (
        <li className="offer__inside-item" key={i}>{goods[i]}</li>
      ))}
    </ul>
  </div>
);
