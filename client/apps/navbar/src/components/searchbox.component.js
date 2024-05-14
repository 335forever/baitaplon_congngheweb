import { useLayoutEffect, useState, useTransition, useRef } from "react";
import Parcel from "single-spa-react/parcel";
import { navigateToUrl } from "single-spa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopupMenu } from "@TachMonShop/styleguide";
import { getSearchSuggestions } from "@TachMonShop/api";

import "../navbar.css";

export default function SearchBox(props) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState();
  const inputBox = useRef();
  const [showSuggestion, setShowSuggestion] = useState(false);

  function handleClick(_event) {
    setShowSuggestion(true);
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(_event) {
    setShowSuggestion(false);
    setSuggestions([]);
    if (input) navigateToUrl(`/search?q=${input}`);
  }

  function handleChooseSuggestion(suggestion) { 
    setInput(suggestion);
    setShowSuggestion(false);
    navigateToUrl(`/search?q=${suggestion}`);
  }

  useLayoutEffect(() => {
    startTransition(() => {
      if (input && showSuggestion)
        getSearchSuggestions(
          { search: input },
          (res) => setSuggestions(res),
          (e) => console.log(e)
        );
      else if (!input) {
        setSuggestions([]);
      }
    });
  }, [input, showSuggestion]);

  return (
    <div className="flex flex-col relative">
      <div ref={inputBox} className="search-box">
        <input
          type="text"
          onFocus={handleClick}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
          value={input}
          placeholder="Bạn muốn tìm gì?"
        />
        <button className="m-0 p-0" onClick={handleSubmit}>
          <FontAwesomeIcon className="w-4 h-4 p-1" icon="fas fa-search" />
        </button>
      </div>
      <Parcel
        config={PopupMenu}
        wrapClassName="relative h-0 w-0"
        isOpen={suggestions.length > 0 && showSuggestion}
        trigger={inputBox}
        setOpenState={() => {setShowSuggestion(false)}}
        equalWidth
        listenChangeOf={suggestions}
      >
        <ul className="suggestion-input-box">
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleChooseSuggestion(suggestion)}>{suggestion}</li>
          ))}
        </ul>
      </Parcel>
    </div>
  );
}
