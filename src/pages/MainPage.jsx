import { useEffect, useState } from "react";
import { useGetCommentsQuery } from "../state/commentsApi";
import CommentChart from "./components/CommentChart";
import CommentTable from "./components/CommentTable";
import "primeicons/primeicons.css";

export default function MainPage() {
  const [comments, setComments] = useState([]);
  const { isLoading, data } = useGetCommentsQuery();

  useEffect(() => {
    if (!isLoading)
      setComments(
        data.map((element) => {
          return {
            ...element,
            wordCount: element.body.replace(/\s+/g, " ").split(" ").length,
          };
        })
      );
  }, [isLoading, data]);

  return (
    <div className="flex align-items-center justify-content-evenly surface-500">
      <CommentTable
        comments={comments}
        isLoaded={!isLoading && comments.length > 0}
      />
      <CommentChart
        comments={comments}
        isLoaded={!isLoading && comments.length > 0}
      />
    </div>
  );
}
