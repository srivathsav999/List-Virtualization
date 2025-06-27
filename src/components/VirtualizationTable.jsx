import { TableVirtuoso } from 'react-virtuoso';
import { useEffect, useState } from 'react';

export default function VirtualTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/users?_quantity=100')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((data) => {
        console.log('api response:', data);
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading users...</div>;
  if (error) return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ margin: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <TableVirtuoso
        data={users}
        style={{ height: 500 }}
        fixedHeaderContent={() => (
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>User ID</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Website</th>
          </tr>
        )}
        itemContent={(index, user) => (
          <>
            <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              {user.id}
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              {user.firstname} {user.lastname}
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              {user.email}
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              {user.website}
            </td>
          </>
        )}
      />
    </div>
  );
}
