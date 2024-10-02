const DiscountFilter = ({ selectedDiscounts, onDiscountChange }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onDiscountChange([...selectedDiscounts, value]);
    } else {
      onDiscountChange(
        selectedDiscounts.filter((discount) => discount !== value)
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 mt-4 gap-y-1 px-4">
      <p className="text-sm font-bold">DISCOUNT RANGE</p>
      {["10", "20", "30", "40", "50", "60", "70", "80"].map((discount) => (
        <label key={discount} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={discount}
            checked={selectedDiscounts.includes(discount)}
            onChange={handleCheckboxChange}
            className="form-checkbox text-blue-500"
          />
          <span className="text-sm">{discount}% and above</span>
        </label>
      ))}
    </div>
  );
};

export default DiscountFilter;
