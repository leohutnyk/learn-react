import { useEffect, useState } from "react";
import axios from "axios";
import ContentLoader, { Facebook } from "react-content-loader";

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      setArticles(response.data.hits);
    }

    fetchArticles();
  }, []);

  const MyLoader = () => (
    <ContentLoader viewBox="0 0 380 70">
      {/* Only SVG shapes */}    
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
      <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
  );

  return (
    <div>
      <h1>Latest articles</h1>

      {articles.length > 0 && (
        <ul>
          {articles.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a href={url} target="_blank" rel="noreferrer noopener">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
