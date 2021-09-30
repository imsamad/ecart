import { useEffect, useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import fetchJson from './fetchJson';
export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/user', fetchJson);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) {
      return;
    }

    if (redirectTo && !redirectIfFound && !user?.isLoggedIn) {
      Router.replace(redirectTo);
    }
    if (redirectIfFound && user?.isLoggedIn) {
      Router.replace(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
