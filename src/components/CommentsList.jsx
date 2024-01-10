import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentListData, setCommentListData] = useState([]);

  useEffect(() => {
    getCommentList();

    return () => {};
  }, [props.refreshComment]); // will trigger onMount and when refreshComment is updated

  const getCommentList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/comments/${props.id}`);
      // console.log(res);
      setCommentListData(res.data);
      setIsLoading(false);
      if (props.refreshComment) props.handleRefreshComment(); // to reset refresh flag
    } catch (err) {
      console.log(err);
      setCommentListData([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <ul>
        {commentListData.map((comments) => (
          <li key={comments._id}>
            <div className="my-3">
              <div className="row">
                <div className="col-2">
                  <h6>Username</h6>
                  <h6>Comment</h6>
                </div>
                <div className="col-10">
                  <h6>{`: ${comments.username}`}</h6>
                  <h6>{`: ${comments.comment}`}</h6>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
