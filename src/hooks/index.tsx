/** Reune todos os providers, assim a quantidade de codigo no app se torna menor. Em vez de exportar um provider de cada vez, exporta só esse aqui contendo todos */
import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
