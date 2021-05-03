import React from "react";
import { GET_SONG } from "../queries/apolloQueries";
import { useQuery } from "@apollo/client";
import { withRouter } from "react-router";
import { Link, useParams } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_SONG, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate songId={id} history={history} />
    </div>
  );
};

export default withRouter(SongDetail);
