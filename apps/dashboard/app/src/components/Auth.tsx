import React, { createContext, useEffect, useRef, useState } from 'react';
import { ClaimVerifyRequest, ClaimVerifyResult, handler, isExpired } from '../services/authService';
import { useLocation } from 'react-router-dom';

interface AuthContextInterface {
  claim: ClaimVerifyResult|null
}

export const AuthContext = createContext<AuthContextInterface|null>(null);

const Auth = (routes: { children: any; }) => {

  const location = useLocation();
  const [claim, setClaim] = useState<ClaimVerifyResult | null>();
  const [token, setToken] = useState<string|null>();

  let currentToken = useRef(token);

  useEffect(() => {
    console.log('Auth component');

    // Get token from the URL
    const cachedToken = localStorage.getItem('jwtToken');
    if (cachedToken) {
      currentToken.current = cachedToken;
      setToken(cachedToken);
    }

    if (!cachedToken) {
      const params = new URLSearchParams(location.hash);
      const urlToken = params.get('#id_token');
      if (urlToken) {
        localStorage.setItem('jwtToken', urlToken);
        setToken(urlToken);
        currentToken.current = urlToken;
      }
    }


    // Redirect to the login page if no token is cached
    if (!currentToken.current) {
      window.location.href = process.env.REACT_APP_COGNITO_REDIRECT_URL || '';
      return;
    }

    // Verify the token
    if (!claim) {
      let request: ClaimVerifyRequest;
      request = {
        token: currentToken.current || ''
      };
      handler(request)
        .then(result => setClaim(result))
        .catch(e => console.error(e));
    }

    // Check if claim still valid
    if (claim && isExpired(claim.exp, claim.authTime)) {
      console.log('The JWT is expired!');
      localStorage.removeItem('jwtToken');
      setToken(null);
      setClaim(null);
      currentToken.current = null;
    }

  }, [claim, currentToken, location.hash]);

  const authClaimContext: AuthContextInterface = {
    claim: claim || null
  };

  return claim ? (
    <AuthContext.Provider value={authClaimContext}>
      {routes.children}
    </AuthContext.Provider>
  ) : null;
};

export default Auth;
