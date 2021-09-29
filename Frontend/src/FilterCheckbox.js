function FilterCheckbox({
  setSearchInput,
  setSearchValue,
  label = '',
  staticSearchTerm = '',
}) {
  return (
    <div>
      <input
        className='filterCheckBox'
        type='checkbox'
        onClick={() => {
          setSearchInput('');
          setSearchValue(staticSearchTerm);
        }}
      />
      <span> {label}</span>
    </div>
  );
}

export default FilterCheckbox;
