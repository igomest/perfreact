import { FormEvent, useState } from "react";
import { SearchResults } from "../components/SearchResults";

const Home = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!search.trim()) { // se o search estiver vazio, não deixa a função ser executada
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>
      
      <SearchResults results={results} />
    </div>
  );
};

export default Home;
