import React from "react";
import { Badge, ListGroup, Button } from "react-bootstrap";

class CommentList extends React.Component {

  state = {
    comments: []
  }

  componentDidMount = async () => {
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const comments = await fetch(commentsUrl + this.props.id, {
      headers: new Headers({
        'Authorization': 'Basic ' + btoa("user16:c9WEUxMS294hN6fF"),
      }),
    }).then((response) => response.json());
    this.setState({ comments });
    console.log(this.state.comments)
  }

  componentWillUnmount() {
    console.log("Bye Bye!")
  }

  render() {
    return (
      <>
        {this.state.comments.map((comment) => (
          <ListGroup key={comment._id}>
            <ListGroup.Item className="d-flex justify-content-between">
              <div>
                <Badge pill variant="info" className="mr-3">
                  {comment.rate}
                </Badge>
                {comment.comment}
              </div>
              <div>
                <Button variant="danger" onClick={() => this.props.deleteComment(comment._id)}>Delete</Button>
                <Button variant="warning" onClick={() => this.props.editComment(comment._id)}>Edit</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </>
    )


  }
}

export default CommentList;
