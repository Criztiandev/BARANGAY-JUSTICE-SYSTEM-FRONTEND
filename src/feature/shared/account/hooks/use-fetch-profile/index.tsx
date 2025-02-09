import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";

const useFetchProfile = () => {
  return useSuspenseFetch("/account/profile", {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("ERRORRRRRRR");
      console.log(error);
    },
  });
};

export default useFetchProfile;
