import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const commentsPerPage = 10;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const paginatedComments = comments.slice(startIndex, startIndex + commentsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const containerStyle = {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const headerStyle = {
    display: 'table-row',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  };

  const rowStyle = {
    display: 'table-row',
    borderBottom: '1px solid #ddd'
  };

  const cellStyle = {
    display: 'table-cell',
    padding: '10px',
    border: '1px solid #ccc',
    verticalAlign: 'top'
  };

  const buttonStyle = {
    margin: '10px',
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer'
  };

  return (
    <div>
      <h2>Comments</h2>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={cellStyle}>Name</div>
          <div style={cellStyle}>Comment</div>
          <div style={cellStyle}>Email</div>
        </div>
        {paginatedComments.map(comment => (
          <div key={comment.id} style={rowStyle}>
            <div style={cellStyle}>{comment.name}</div>
            <div style={cellStyle}>{comment.body}</div>
            <div style={cellStyle}>{comment.email}</div>
          </div>
        ))}
      </div>

      <div>
        <button
          style={buttonStyle}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          style={{backgroundColor: 'blue', color: 'white', margin: '10px',
            padding: '8px 12px',
            fontSize: '14px',
            cursor: 'pointer'}}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <span style={{ marginLeft: '10px' }}>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

export default CommentList;
