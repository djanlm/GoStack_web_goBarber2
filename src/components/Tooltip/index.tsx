import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string; // pra ser possível receber estilização de um elemento superior, a interrogaçao indica q não é obrigatoria
}
const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
