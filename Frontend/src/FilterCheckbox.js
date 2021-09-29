function FilterCheckbox({ classes = '', handleClick, label = '' }) {
  return (
    <div className={`FilterCheckbox ${classes}`}>
      <input
        className='filterCheckBox'
        type='checkbox'
        onChange={handleClick}
      />
      <span> {label}</span>
    </div>
  );
}

export default FilterCheckbox;
