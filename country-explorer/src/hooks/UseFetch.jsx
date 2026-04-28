import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const startTime = Date.now(); 

                const response = await fetch(url);
                if (!response.ok) throw new Error('HTTP Error: ' + response.status);

                const json = await response.json();

                const elapsed = Date.now() - startTime;
                const minDelay = 1200;

                if (elapsed < minDelay) {
                    await new Promise(resolve =>
                        setTimeout(resolve, minDelay - elapsed)
                    );
                }

                if (!cancelled) setData(json);

            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => { cancelled = true; };
    }, [url]);

    return { data, loading, error };
}

export default useFetch;