import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AchievementRedirect () {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/achievements/${id}`, {replace: true});
  }, [id, navigate]);

  return <></>;
};

