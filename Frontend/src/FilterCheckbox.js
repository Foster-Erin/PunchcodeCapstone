function FilterCheckbox({
  classes='',
  handleClick,
  label = '',
  staticSearchTerm = '',
}) {
  return (
    <div className={`FilterCheckbox ${classes}`}>
      <button
      id="filterButtons"
        className='front back ui active'
        type='checkbox'
        onChange={handleClick}
      />
      <span> {label}</span>
    </div>
  );
}

export default FilterCheckbox;
