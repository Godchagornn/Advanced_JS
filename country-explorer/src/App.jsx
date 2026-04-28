import { useState } from 'react';
import useFetch from './hooks/UseFetch';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import SkeletonCard from './components/SkeletonCard';
import './App.css';

const API =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

function App() {
  const { data: countries, loading, error } = useFetch(API);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [favourites, setFavourites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  function toggleFavourite(name) {
    setFavourites(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  }

  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'population') return b.population - a.population;
    return a.name.common.localeCompare(b.name.common);
  });

  if (loading) {
    return (
      <div className='country-grid'>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className='app'>

      {/* 🔍 SEARCH + SORT */}
      <div className="top-bar">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="population">Population</option>
        </select>
      </div>

      {/* 🌍 REGION */}
      <div>
        {regions.map(r => {
          const count = countries.filter(c =>
            r === 'All' || c.region === r
          ).length;

          return (
            <button key={r} onClick={() => setSelectedRegion(r)}>
              {r} ({count})
            </button>
          );
        })}
      </div>

      <p>Showing {filtered.length} of {countries.length} countries</p>

      <div className='country-grid'>
        {sorted.map(c => (
          <CountryCard
            key={c.name.common}
            country={c}
            isFav={favourites.includes(c.name.common)}
            onFav={toggleFavourite}
            onSelect={setSelectedCountry}
          />
        ))}
      </div>

      {/* 🪟 MODAL */}
      {selectedCountry && (
        <div className="modal" onClick={() => setSelectedCountry(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <img
              src={selectedCountry?.flags?.svg}
              alt={'Flag of ' + selectedCountry.name.common}
              className="modal-flag"
            />

            <h2>{selectedCountry.name.common}</h2>

            <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>

            <p>
              <strong>Languages:</strong>{' '}
              {selectedCountry.languages
                ? Object.values(selectedCountry.languages).join(', ')
                : 'N/A'}
            </p>

            <button onClick={() => setSelectedCountry(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;