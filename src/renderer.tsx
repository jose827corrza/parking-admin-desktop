/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 */

import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './renderer/App';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
    }
  }
});

cognitoUserPoolsTokenProvider.setKeyValueStorage({
  setItem: (key, value) => window.secureStore.setItem(key, value),
  getItem: (key) => window.secureStore.getItem(key),
  removeItem: (key) => window.secureStore.removeItem(key),
  clear: () => window.secureStore.clear(),
})

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <React.StrictMode>
    <Authenticator>
      {({ signOut, user }) => (
        <App user={user} signOut={signOut ?? (() => {})} />
      )}
    </Authenticator>
  </React.StrictMode>
);
