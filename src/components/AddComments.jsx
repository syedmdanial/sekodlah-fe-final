import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AddComments = (props) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const data = {
        username: props.user.username,
        picId: props.id,
        comment: comment,
      };

      axios
        .post(`http://localhost:3000/comments`, data)
        .then((res) => {
          // console.log(res);
          setComment("");
          toast.success("Comment posted");
          if (!props.refreshComment) props.handleRefreshComment(); // to trigger refresh comments
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message || "Error");
        });
    } else {
      toast.error("Comment must not be empty");
    }
  };

  return (
    <div className="AddComments">
      <Form className="form mt-0" onSubmit={(e) => handleSubmit(e)}>
        <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Add Comments
        </h4>
        <div className="form-row">
          <input
            type="text"
            className="form-input"
            placeholder="Enter Your Comment here"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddComments);
