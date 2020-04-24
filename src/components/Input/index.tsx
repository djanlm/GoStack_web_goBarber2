import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react'; // InputHTMLAttributes importa todos os atributos do input no html
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // faz com que o atributo name seja obrigatório
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = (
  { name, icon: Icon, ...rest }, // icon: Icon renomeia o icon para que o react entenda que Icon é um componente
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // o useCallback em volta da função faz com que ela seja criada somente uma vez e não todas as vezes que o input for renderizado
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    // setIsFilled(!! inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {
        /** Só mostra a tag Icon se vier um icon como parametro */
        Icon && <Icon size={20} />
      }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};
export default Input;
