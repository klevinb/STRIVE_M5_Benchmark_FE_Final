import React, { Component } from 'react';
import Navbar from './Navbar'
import {
    Container,
    Row,
    Col,
    Image,
    Badge,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button,
    Spinner,
    Accordion,
    Card,
    Alert
} from 'react-bootstrap'
import CommentList from './CommentList'
import './ShowDetail.css'

const apiKey = process.env.REACT_APP_API_URL


class ShowDetail extends Component {

    state = {
        movie: {},
        addComment: false,
        addReview: false,
        editComment: false,
        editElement: null,
        selected: false,
        loading: true,
        newComment: {
            comment: "",
            rate: 0,
            elementId: this.props.match.params.id,
        },
        newReview: {
            comment: "",
            rate: 0,
            elementId: this.props.match.params.id,
        },
        reviews: []
    };

    submitComment = async (e) => {
        e.preventDefault();
        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const response = await fetch(commentsUrl, {
            method: "POST",
            body: JSON.stringify(this.state.newComment),
            headers: new Headers({
                'Authorization': 'Basic ' + btoa("user16:c9WEUxMS294hN6fF"),
                "Content-Type": "application/json",
            }),
        });
        if (response.ok) {
            alert("Comment added");
            this.setState({
                selected: !this.state.selected,
                addComment: !this.state.addComment,
                newComment: {
                    comment: "",
                    rate: 0,
                    elementId: this.props.match.params.id,
                },
            });
        } else {
            alert("An error has occurred");
        }
    };

    deleteComment = async (id) => {
        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const response = await fetch(commentsUrl + id, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Basic ' + btoa("user16:c9WEUxMS294hN6fF"),
                "Content-Type": "application/json",
            })
        })
        if (response.ok) {
            alert("Comment Deleted!")
            this.setState({
                selected: !this.state.selected
            });
        }
    }
    editComment = async (id) => {
        this.setState({
            editElement: id,
            editComment: !this.state.editComment
        });

    }
    editCommentFunction = async (e) => {
        e.preventDefault();
        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const response = await fetch(commentsUrl + this.state.editElement, {
            method: "PUT",
            body: JSON.stringify(this.state.newComment),
            headers: new Headers({
                'Authorization': 'Basic ' + btoa("user16:c9WEUxMS294hN6fF"),
                "Content-Type": "application/json",
            }),
        });
        if (response.ok) {
            alert("Comment edited!");
            this.setState({
                selected: !this.state.selected,
                editComment: !this.state.editComment,
                newComment: {
                    comment: "",
                    rate: 0,
                    elementId: this.props.match.params.id,
                },
            });
        } else {
            alert("An error has occurred");
        }
    };
    showSearchResult = (searchString) => {
        fetch(this.url + "&s=" + searchString)
            .then((response) => response.json())
            .then((responseObject) =>
                this.setState({ searchedMovies: responseObject.Search })
            );
    };

    submitReview = async (e) => {
        e.preventDefault()
        let resp = await fetch(apiKey + "/reviews", {
            method: "POST",
            body: JSON.stringify(this.state.newReview),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (resp.ok) {
            this.fetchReviews()
            this.setState({
                addReview: false
            });
        }
    }

    handleRadioChange = (e) => {
        let newComment = this.state.newComment;
        newComment.rate = e.currentTarget.id;
        this.setState({ newComment });
    };

    handleCommentText = (e) => {
        let newComment = this.state.newComment;
        newComment.comment = e.currentTarget.value;
        this.setState({ newComment });
    }
    handleReviewRadio = (e) => {
        let newReview = this.state.newReview;
        newReview.rate = e.currentTarget.id;
        this.setState({ newReview });
    };

    handleReviewText = (e) => {
        let newReview = this.state.newReview;
        newReview.comment = e.currentTarget.value;
        this.setState({ newReview });
    }

    fetchReviews = async () => {
        let response = await fetch(apiKey + "/media/" + this.props.match.params.id + "/reviews")
        if (response.ok) {
            let reviews = await response.json()
            this.setState({
                reviews
            });
        }
    }

    componentDidMount = async () => {
        this.fetchReviews()
        let response = await fetch(apiKey + "/media/omdbapi/" + this.props.match.params.id)

        if (response.ok) {
            let movie = await response.json()
            this.setState({
                movie,
                loading: !this.state.loading
            });
        }

    }

    render() {
        return (
            <>
                <Navbar props={this.props} showSearchResult={this.showSearchResult} />
                <Container>
                    {this.state.loading &&
                        <Row>
                            <Col md={4}>
                                <div style={{ width: "10%", height: "auto" }}>
                                    <Spinner animation="border" variant="light" />
                                </div>
                            </Col>
                            <Col md={8}>
                                <div style={{ width: "10%", height: "auto" }}>
                                    <Spinner animation="border" variant="light" />
                                </div>
                            </Col>
                        </Row>

                    }
                    {!this.state.loading &&
                        <Row>
                            <Col md={4}>
                                <Image src={this.state.movie.Poster}
                                    onClick={() => this.setState({
                                        selected: !this.state.selected
                                    })}
                                />
                            </Col>
                            <Col md={8}>
                                <h1><Badge variant="danger">{this.state.movie.Title}</Badge></h1>
                                <p>{this.state.movie.Plot}</p>
                                <h3><Badge variant="info">Actors</Badge></h3>
                                <p>{this.state.movie.Actors}</p>
                                <h3><Badge variant="info">Awards</Badge></h3>
                                <p>{this.state.movie.Awards}</p>
                                <h3><Badge variant="info">Earnings</Badge></h3>
                                <p>{this.state.movie.BoxOffice}</p>
                                <a style={{ color: "white", textDecoration: "underline" }} href={apiKey + "/media/pdf/catalogue?title=" + this.state.movie.Title}>GET PDF</a>
                                <div className="d-flex justify-content-center">
                                    <Accordion style={{ width: "300px" }} className="text-center" defaultActiveKey="0">
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    Show reviews!
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse style={{ color: "black" }} eventKey="1">
                                                <>
                                                    <Card.Body>
                                                        {this.state.reviews.length > 0
                                                            ?
                                                            this.state.reviews.map(review =>
                                                                <div>
                                                                    <Badge variant="danger">{review.rate}</Badge>
                                                                     : {review.comment}
                                                                    <Button onClick={() => this.deleteReview(review._id)}>Delete</Button>
                                                                    <Button onClick={() => this.editReview(review._id)}>Edit</Button>
                                                                </div>
                                                            )
                                                            :
                                                            <Alert variant="danger">No reviews yet!</Alert>
                                                        }
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <Button onClick={() => this.setState({ addReview: true })}>Add Review</Button>
                                                    </Card.Footer>
                                                </>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                    }
                </Container>

                <Modal className="modal_color"
                    show={this.state.selected}
                    onHide={() => this.setState({ selected: !this.state.selected })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Movie comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="my-3">
                            {this.state.selected &&
                                <CommentList loading={this.state.loading} deleteComment={this.deleteComment} editComment={this.editComment} id={this.state.newComment.elementId} />
                            }
                            <div className="d-flex justify-content-center mt-3">
                                <Button onClick={() => {
                                    this.setState({
                                        addComment: !this.state.addComment
                                    });
                                }}>Add Comment</Button>
                            </div>
                            {this.state.addComment &&
                                <div className="text-center">
                                    <h5 className="my-3">Add a comment</h5>
                                    <Form onSubmit={this.submitComment}>
                                        <div className="my-3 text-center">
                                            <Form.Check
                                                inline
                                                label="1"
                                                type="radio"
                                                id="1"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                type="radio"
                                                id="2"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                type="radio"
                                                id="3"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="4"
                                                type="radio"
                                                id="4"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="5"
                                                type="radio"
                                                id="5"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                        </div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Write your comment"
                                                aria-label="comment"
                                                aria-describedby="basic-addon1"
                                                onChange={this.handleCommentText}
                                                value={this.state.newComment.comment}
                                            />
                                        </InputGroup>
                                        <Button variant="primary" type="submit">
                                            Submit
                                    </Button>
                                    </Form>
                                </div>
                            }
                            {this.state.editComment &&
                                <div className="text-center">
                                    <h5 className="my-3">Edit this Comment</h5>
                                    <Form onSubmit={this.editCommentFunction}>
                                        <div className="my-3 text-center">
                                            <Form.Check
                                                inline
                                                label="1"
                                                type="radio"
                                                id="1"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                type="radio"
                                                id="2"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                type="radio"
                                                id="3"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="4"
                                                type="radio"
                                                id="4"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="5"
                                                type="radio"
                                                id="5"
                                                name="rating"
                                                onClick={this.handleRadioChange}
                                            />
                                        </div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Write your comment"
                                                aria-label="comment"
                                                aria-describedby="basic-addon1"
                                                onChange={this.handleCommentText}
                                                value={this.state.newComment.comment}
                                            />
                                        </InputGroup>
                                        <Button variant="primary" type="submit">
                                            Edit
                            </Button>
                                    </Form>
                                </div>
                            }
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.addReview} onHide={() => this.setState({
                    addReview: false,
                    newReview: {
                        comment: "",
                        rate: 0,
                        elementId: this.props.match.params.id,
                    },
                })}>
                    {this.state.addReview &&
                        <div style={{ color: "black" }} className="text-center">
                            <h5 className="my-3" >Add a review</h5>
                            <Form onSubmit={this.submitReview}>
                                <div className="my-3 text-center">
                                    <Form.Check
                                        inline
                                        label="1"
                                        type="radio"
                                        id="1"
                                        name="rating"
                                        onClick={this.handleReviewRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label="2"
                                        type="radio"
                                        id="2"
                                        name="rating"
                                        onClick={this.handleReviewRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label="3"
                                        type="radio"
                                        id="3"
                                        name="rating"
                                        onClick={this.handleReviewRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label="4"
                                        type="radio"
                                        id="4"
                                        name="rating"
                                        onClick={this.handleReviewRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label="5"
                                        type="radio"
                                        id="5"
                                        name="rating"
                                        onClick={this.handleReviewRadio}
                                    />
                                </div>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Write your comment"
                                        aria-label="comment"
                                        aria-describedby="basic-addon1"
                                        onChange={this.handleReviewText}
                                        value={this.state.newReview.comment}
                                    />
                                </InputGroup>
                                <Button variant="primary" type="submit">
                                    Submit
                                    </Button>
                            </Form>
                        </div>
                    }

                </Modal>
            </>
        );
    }
}

export default ShowDetail;