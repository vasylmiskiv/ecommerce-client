import { useEffect, useState } from "react";

const CurrencyWidget = () => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate.host/convert?from=USD&to=UAH`)
      .then((response) => response.json())
      .then((data) => setRate(data.info.rate));
  }, []);

  return (
    <div className="text-sm flex items-center">USD/UAH: {rate.toFixed(2)}</div>
  );
};

export default CurrencyWidget;
