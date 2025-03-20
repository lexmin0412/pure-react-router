import useHistory from "./use-history";

const useSearchParams = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  return searchParams;
};

export default useSearchParams
