import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../../api/api";
import GalleryItem from "../GalleryItem/GalleryItem";
import "./Gallery.css";

const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  const { data } = await api.get(
    `/pins?cursor=${pageParam}&search=${search || ""}&userId=${
      userId || ""
    }&boardId=${boardId || ""}`
  );
  return data;
};

const Gallery = ({ search, userId, boardId }) => {
  const { data, hasNextPage, fetchNextPage, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["pins", search, userId],
      queryFn: ({ pageParam = 0 }) =>
        fetchPins({ pageParam, search, userId, boardId }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _) => lastPage.nextCursor,
    });

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  if (allPins.length == 0) {
    return <h1>No Pins found</h1>;
  }

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<p>Loading more pins</p>}
      endMessage={<p>All pins loaded</p>}
    >
      <div className="gallery">
        {allPins.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
export default Gallery;
