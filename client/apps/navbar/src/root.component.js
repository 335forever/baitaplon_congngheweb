import { useState } from "react";
import { tabs } from "./tabs";
import { BrowserRouter, Link } from "react-router-dom";

export default function Root(props) {

  const [account, setAccount] = useState(false)

  function handleChange(event) {
    console.log(event.target.value)
  }

  return (<BrowserRouter>
    <div id="logo">TachMonShop</div>
    {
      tabs.map(e => (<Link key={e.name} to={e.to}>{e.name}</Link>))
    }
    <input type="text" onChange={handleChange}/>
    <button>W</button>
    <button>C</button>
    {account && <button>A</button>}
  </BrowserRouter>);
}
