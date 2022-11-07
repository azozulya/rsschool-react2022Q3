import React from 'react';

const sortParams = ['popularity.asc', 'popularity.desc', 'vote_average.desc', 'vote_average.asc'];

function Sort() {
  return (
    <div>
      movies per page
      <select>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
      </select>
      sort
      <select>
        <option value="vote_average.desc">vote_average.desc</option>
        <option value="vote_average.asc">vote_average.asc</option>
        <option value="vote_popularity.desc">popularity desc</option>
        <option value="vote_popularity.asc">popularity asc</option>
      </select>
    </div>
  );
}
// sort_by=vote_average.desc
export default Sort;
