function CountryCard({ country, isFav, onFav, onSelect }) {
    const pop = country.population?.toLocaleString();
    const cap = country.capital ? country.capital[0] : 'N/A';
    const lang = country.languages
        ? Object.values(country.languages).slice(0, 2).join(', ')
        : 'N/A';

    return (
        <div className='country-card' onClick={() => onSelect(country)}>
            
            <div className="flag-wrapper">
                <img
                    src={country?.flags?.svg}
                    alt={'Flag of ' + country.name.common}
                    className='country-flag'
                />

                <button
                    className="fav-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFav(country.name.common);
                    }}
                >
                    {isFav ? '❤️' : '🤍'}
                </button>
            </div>

            <div className='country-info'>
                <h3>{country.name.common}</h3>
                <p><strong>Capital:</strong> {cap}</p>
                <p><strong>Population:</strong> {pop}</p>
                <p><strong>Languages:</strong> {lang}</p>
            </div>
        </div>
    );
}

export default CountryCard;