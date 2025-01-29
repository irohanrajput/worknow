import { useState, useEffect } from 'react';
import { fetchJobs } from '../utils/api';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {job.experience}
                  </span>
                  <span className="text-sm text-gray-500">
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Expires: {new Date(job.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{job.company?.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}