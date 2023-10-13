import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];
const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setvalue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setvalue];
};

export default useInput;
