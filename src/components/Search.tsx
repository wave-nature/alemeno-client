import classes from "./Search.module.css";

interface SearchProps {
  search?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ search, onChange }: SearchProps) {
  return (
    <div className={classes["search"]}>
      <input
        value={search}
        onChange={onChange}
        type="text"
        placeholder="search courses"
      />
    </div>
  );
}

export default Search;
