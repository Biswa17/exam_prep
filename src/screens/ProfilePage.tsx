import { useEffect, useState } from 'react';
import './ProfilePage.css';

interface UserDetails {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  is_new_user: number;
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sf/user/details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setUserDetails(data.response);
        } else {
          throw new Error(data.message || 'Failed to fetch user details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="profile-container loading">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container error">{error}</div>;
  }

  if (!userDetails) {
    return <div className="profile-container error">No user details found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Name</span>
          <span className="detail-value">{userDetails.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{userDetails.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone Number</span>
          <span className="detail-value">{userDetails.phone_number}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Role</span>
          <span className="detail-value">{userDetails.role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
