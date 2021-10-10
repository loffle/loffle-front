import React, { useEffect, useState } from 'react';

const Candidate = ({ handleCandidateModal }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((datas) => {
        setCandidates(datas);
      });
  }, []);

  return (
    <>
      <div
        className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
        onClick={handleCandidateModal}
      >
        {/* 345*185 */}
        <div
          className="flex items-center justify-center gap-2 py-4 h-16 rounded-lg bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col z-50">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-border">
                    <tbody className="bg-white divide-y divide-gray-border">
                      {candidates.length > 0 &&
                        candidates.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {user.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {user.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;
