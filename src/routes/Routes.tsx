// É necessário criar nosso proprio componente de rotas pra podermos definir rotas
// privadas que só serão acessadas por clientes logados.
import React from 'react';
// pega todas as props já existente no react router dom
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

// cria novas props pra o nosso Route herdando todas as props do route do react Router Dom
interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// true/true = rota privada e usuario autenticado => ok
// true/false = rota privada e usuario nao autenticado => redirecionar o user pro login
// false/true = rota nao privada e usuario logado => Redirecionar para o dashboard
// false/false = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
