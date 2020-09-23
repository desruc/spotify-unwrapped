import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../components/Common/PageHeader';
import DiscoverRecommendations from '../components/Discover/DiscoverRecommendations';

import { selectRecentlyPlayed } from '../store/reducer';

import { getRecommendationsForTracks } from '../spotify';

const Discover = () => {
  // Redux
  const recentlyPlayed = useSelector((state) => selectRecentlyPlayed(state));

  // Local
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    async function getRecommendations() {
      getRecommendationsForTracks(recentlyPlayed)
        .then((data) => {
          if (isSubscribed) {
            setRecommendations(data);
            setRecommendationsLoading(false);
          }
        })
        .catch(() => {
          if (isSubscribed) {
            setRecommendationsError(true);
            setRecommendationsLoading(false);
          }
        });
    }

    if (!recommendations.length) {
      getRecommendations();
    }

    return () => {
      isSubscribed = false;
    };
  }, [recentlyPlayed]);

  return (
    <main>
      <PageHeader heading="Discover" />
      <DiscoverRecommendations
        tracks={recommendations}
        loading={recommendationsLoading}
        error={recommendationsError}
      />
    </main>
  );
};

export default Discover;
