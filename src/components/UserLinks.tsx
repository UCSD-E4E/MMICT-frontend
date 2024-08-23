// 

import React, { useEffect, useState } from 'react';

const UserLinks: React.FC<{ token: string }> = ({ token }) => {
  const [links, setLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('http://localhost:3001/db/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ credential: token }),
        });

        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        console.error('Error fetching links:', error);
        setError('An error occurred while fetching links');
      }
    };

    if (token) {
      fetchLinks();
    }
  }, [token]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserLinks;