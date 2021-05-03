import React from "react";
import { DELETE_SONG, FETCH_SONGS } from "../queries/apolloQueries";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
const SongList = () => {
  const { data, loading, error } = useQuery(FETCH_SONGS);
  const [deleteSongMutation] = useMutation(DELETE_SONG);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  const deleteSong = (id) => {
    deleteSongMutation({
      variables: { id },
      // refetchQueries: [{ query: FETCH_SONGS }],
    });
  };
  return (
    <div>
      <ul className="collection">
        {data &&
          data.songs &&
          data.songs.map((item) => (
            <li key={item.id} className="collection-item">
              <Link to={`/songs/${item.id}`}>{item.title}</Link>
              <i className="material-icons" onClick={() => deleteSong(item.id)}>
                delete
              </i>
            </li>
          ))}
      </ul>
      <div>
        <Link to="/songs/new" className="btn-floating btn-large red light">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default SongList;
