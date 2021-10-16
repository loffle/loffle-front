import React, { useEffect, useState } from 'react';
import API from '../../API';
import Pagination from 'react-js-pagination';
import './candidatePaging.module.css';

const Candidate = ({ handleCandidateModal, raffleId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    setLoading(true);

    API.getCandidate(raffleId, pageNumber) //
      .then((response) => {
        setCandidates(response.data.results);
        setTotalPosts(response.data.count);

        setLoading(false);
      });
  }, [pageNumber, raffleId]);

  return (
    <>
      <div
        className="max-w-480 mx-auto flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
        onClick={handleCandidateModal}
      >
        {/* 345*185 */}
        <div
          className="flex items-center justify-center rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden border-b border-gray bg-white rounded-lg">
            <table className="w-56 h-80 divide-y divide-x divide-gray-border table-fixed">
              <tbody className="bg-white divide-y divide-gray-border">
                {loading && (
                  <tr>
                    <td className="whitespace-nowrap w-1/3 py-44">
                      <div className="flex items-center justify-center">
                        <div className="text-sm font-medium animate-ping">
                          Loading...
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {loading ||
                  (candidates.length > 0 &&
                    candidates.map((user) => (
                      <tr key={user.apply_at}>
                        <td className="whitespace-nowrap w-1/3 py-2">
                          <div className="flex items-center justify-center">
                            <div className="text-sm font-medium">
                              {user.row_number}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap w-2/3 py-2">
                          <div className="flex items-center justify-center">
                            <div className="mx-4">
                              <div className="text-sm font-medium">
                                {user.username}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="sticky mt-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center min-w-full w-56 h-12 bg-white rounded-lg shadow-lg px-1">
            <Pagination
              activePage={pageNumber}
              itemsCountPerPage={10}
              totalItemsCount={totalPosts}
              pageRangeDisplayed={2}
              onChange={setPageNumber}
            />
            <div className="h-9 w-20 bg-white fixed my-0 mx-auto left-0 right-0">
              <div className="flex justify-center items-center h-full">
                <button>
                  <svg
                    className="w-5 h-5"
                    data-darkreader-inline-stroke=""
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;
