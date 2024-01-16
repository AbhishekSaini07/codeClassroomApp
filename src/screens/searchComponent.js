import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';

const TagListComponent = ({ tags, onSelectTag }) => {
  return (
    <Nav defaultActiveKey="All" className="flex-column">
      <Nav.Item>
        <Nav.Link eventKey="All" onSelect={() => onSelectTag("All")}>All</Nav.Link>
      </Nav.Item>
      {tags.map(tag => (
        <Nav.Item key={tag}>
          <Nav.Link eventKey={tag} onSelect={() => onSelectTag(tag)}>{tag}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({
    difficulty: '',
    title: '',
    tags: '',
  });
  const [allTags, setAllTags] = useState([
    'Stack', 'Queue', 'Hashmap', 'Design', 'BFS (Breadth-First Search)',
    'Dynamic Programming', 'Union Find', 'Backtracking', 'Tree', 'Loops',
    'Patterns', 'String', 'DFS (Depth-First Search)', 'Array', 'Recursion',
    'Hard', 'Basic'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSelectTag = (tag) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      tags: tag,
    }));
  };

  const handleSearch = () => {
    // Make a GET request using Axios
    axios.get('/questions', {
      params: searchParams,
    })
      .then(response => {
        // Handle the retrieved data, e.g., update state with the results
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          {/* Sidebar with tags */}
          <TagListComponent tags={allTags} onSelectTag={handleSelectTag} />
        </div>
        <div className="col-9">
          {/* Main content area */}
          <h3>Search Questions</h3>
          <label>
            Difficulty:
            <select name="difficulty" value={searchParams.difficulty} onChange={handleInputChange}>
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <br />
          <label>
            Title:
            <input type="text" name="title" value={searchParams.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Tags:
            <input type="text" name="tags" value={searchParams.tags} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
