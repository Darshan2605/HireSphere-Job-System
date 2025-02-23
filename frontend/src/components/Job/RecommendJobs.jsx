import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecommendJobs.css'; // Import the CSS file

const RecommendJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''); // State for the search query

  const fetchJobs = async (searchQuery) => {
    setLoading(true);
    try {
      const allJobs = [];
      const numPages = 3; // Number of pages to fetch

      for (let page = 1; page <= numPages; page++) {
        const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
          params: {
            query: searchQuery,
            page: page,
            num_pages: 1,
            country: 'in',
            date_posted: 'all',
          },
          headers: {
            'x-rapidapi-key': '2aa82ec279msh7141ade418d3940p1a4d39jsnc16966fc5df2', // Use your RapidAPI key
            'x-rapidapi-host': 'jsearch.p.rapidapi.com',
          },
        });
        allJobs.push(...response.data.data); // Combine jobs from each page
      }

      setJobs(allJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchJobs(query);
    }
  };

  return (
    <section className="recommend-jobs">
      <div className="container">
        <h1>Search Jobs</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jobs..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="job-cards">
            {jobs.map((job) => (
              <div key={job.job_id} className="job-card">
                <h2>{job.job_title}</h2>
                <p><strong>Company:</strong> {job.employer_name}</p>
                <p><strong>Location:</strong> {job.job_location}</p>
                <p><strong>Posted:</strong> {job.job_posted_human_readable}</p>
                <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendJobs;