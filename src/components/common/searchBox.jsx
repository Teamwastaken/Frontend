const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type='text'
      name='query'
      className='input-field'
      placeholder='Search...'
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
