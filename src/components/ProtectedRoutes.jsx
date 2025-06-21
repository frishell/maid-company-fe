import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setMessage('Silahkan Login Terlebih Dahulu!');
      setShouldRedirect(true);
    } else if (allowedRoles && !allowedRoles.includes(user.role_id)) {
      setMessage('Anda tidak memiliki izin untuk mengakses halaman ini.');
      setShouldRedirect(true);
    }
  }, [user, allowedRoles]);

  if (shouldRedirect) {
    alert(message);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
