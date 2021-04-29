import React from "react";
import { GET_SONG } from "./queries/apolloQueries";
import { useQuery } from "@apollo/client";

const SongList = () => {
  const { data, loading, error } = useQuery(GET_SONG);
  // console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  return (
    <>
      {data && data.songs && data.songs.map((item) => <div>{item.title}</div>)}
    </>
  );
};

export default SongList;
