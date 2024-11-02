

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  }

  return (
    <>
      <input
      type="text"
      placeholder="Buscar"
      onChange={handleChange}
      className="border border-gray-300 p-2 rounded"
      />
    </>
  )
}

export default SearchBar;
