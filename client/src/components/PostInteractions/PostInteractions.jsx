import { Image } from "@imagekit/react";
import "./PostInteractions.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const interact = async (id, type) => {
  const res = await api.post(`/pins/interact/${id}`, { type });
  return res;
};

const PostInteractions = ({ postId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interactionCheck", postId],
      });
    },
  });
  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: () =>
      api.get(`/pins/interaction-check/${postId}`).then((res) => res.data),
  });

  if (isPending || error) return;
  return (
    <div className="postInteractions">
      <div className="interactionsIcons">
        <div
          onClick={() =>
            mutation.mutate({
              id: postId,
              type: "like",
            })
          }
        >
          {data.isLiked ? (
            <Image src="/general/react-active.svg" />
          ) : (
            <Image src="/general/react.svg" />
          )}
        </div>
        {data.likeCount}
        <Image src="/general/share.svg" />
        <Image src="/general/more.svg" />
      </div>
      <button
        onClick={() =>
          mutation.mutate({
            id: postId,
            type: "save",
          })
        }
      >
        {data.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};
export default PostInteractions;
