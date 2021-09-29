<<<<<<< Updated upstream
function FilterCheckbox({ classes = '', handleClick, label = '' }) {
  return (
    <div className={`FilterCheckbox ${classes}`}>
      <input
        className='filterCheckBox'
=======
function FilterCheckbox({
  classes='',
  setSearchInput,
  setSearchValue,
  label = '',
  staticSearchTerm = '',
}) {
  return (
    <div className={`FilterCheckbox ${classes}`}>
      <button
      id="filterButtons"
        className='front back ui active'
>>>>>>> Stashed changes
        type='checkbox'
        onChange={handleClick}
      />
      <span> {label}</span>
    </div>
  );
}

export default FilterCheckbox;
