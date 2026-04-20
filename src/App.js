import React, { useState } from "react";
import axios from "axios";
import logo from "./shecodes-logo.svg";
import "./App.css";

export default function App() {
  const [keyword, setKeyword] = useState("sunset");
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function search() {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="App">
        <div className="container">
          <header>
            <img src={logo} className="App-logo" alt="SheCodes logo" />
          </header>
          <main>
            <section>
              <form onSubmit={handleSubmit}>
                <input
                  type="search"
                  placeholder="Enter a word"
                  onChange={handleKeywordChange}
                  value={keyword}
                />
                <button type="submit">Search</button>
              </form>
            </section>
            {results && <Results results={results} />}
          </main>
        </div>
      </div>
    );
  } else {
    load();
    return "Loading...";
  }
}

function Results({ results }) {
  return (
    <div className="Results">
      <h2>{results.word}</h2>
      {results.meanings.map((meaning, index) => (
        <div key={index}>
          <h3>{meaning.partOfSpeech}</h3>
          <ul>
            {meaning.definitions.map((definition, defIndex) => (
              <li key={defIndex}>{definition.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
