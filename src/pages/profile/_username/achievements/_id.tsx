import { ReactElement, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * AchievementRedirect component
 * 
 * @returns {ReactElement}
 */

export default function AchievementRedirect (): ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/achievements/${id}`, {replace: true});
  }, [id, navigate]);

  return <></>;
};

