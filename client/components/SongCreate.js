import React, { useState } from "react";
import { ADD_SONG, FETCH_SONGS } from "../queries/apolloQueries";
import { useMutation } from "@apollo/client";
import { withRouter, Link } from "react-router-dom";
const SongCreate = ({ history }) => {
  const [songTitle, setSongTitle] = useState("");
  const [
    addSongMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_SONG);
  const onSubmit = (e) => {
    e.preventDefault();

    addSongMutation({
      variables: { title: songTitle },
      refetchQueries: [{ query: FETCH_SONGS }],
    }).then(() => {
      history.push("/");
    });
  };
  return (
    <div>
      <h3>Create new Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title</label>
        <input
          type="text"
          onChange={(e) => setSongTitle(e.target.value)}
          value={songTitle}
        />
      </form>
    </div>
  );
};

export default withRouter(SongCreate);
