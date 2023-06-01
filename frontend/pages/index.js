import React from "react";
import { Products } from "../components/Products";
import queryString from "query-string";

export default function Home(props) {
  return (
    <>
      <Products {...props} />
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const q = queryString.stringify(context.query)
  const res = await fetch(`http://127.0.0.1:8000/api/v1/products/?${q}`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}