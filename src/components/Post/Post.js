import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../../actions/getPost';
import { updatePost } from '../../actions/updatePost';
import { deletePost } from '../../actions/deletePost';
import { Redirect } from 'react-router-dom';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import firebase from '../../firebase/config';
import './Post.css';

import camera from '../../images/camera.png';
import home from '../../images/home.png';

const Post = (props) => {
  const loginSelector = useSelector((state) => state.login);
  const signinSelector = useSelector((state) => state.signup);

  const [timer, setTimer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(null);

  const [defaultTitle, setDefaultTitle] = useState('');
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultLink, setDefaultLink] = useState('');
  const [fileref, setFileRef] = useState('');
  const [routeRedirect, setRedirect] = useState('');

  const [isBusy, setIsBusy] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileRef = useRef(null);
  const linkRef = useRef(null);

  const [postid, setPostId] = useState('');

  const getPostSelector = useSelector((state) => state.getPost);
  const dispatch = useDispatch();

  const getPostAction = (postid) => dispatch(getPost(postid));
  const updatePostAction = (postid, post) => dispatch(updatePost(postid, post));
  const deletePostAction = (postid, fileref) =>
    dispatch(deletePost(postid, fileref));

  let currentPost;
  let editButton;
  let deleteButton;

  useEffect(() => {
    setTimer(true);
    setPostId(props.match.params.id);
    getPostAction(props.match.params.id);

    firebase.getUserState().then((user) => {
      setUserState(user);
    });

    setTimeout(() => setTimer(false), 1000);
    console.log('timer: ', timer);
  }, []);

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  const updateCurrentPost = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const post = {
      id: postid,
      title: titleRef.current.value,
      content: contentRef.current.value,
      link: linkRef.current.value,
    };

    if (fileRef.current.files.length > 0) {
      post['cover'] = fileRef.current.files[0];
      post['oldcover'] = getPostSelector.post.fileref;
    }

    await updatePostAction(postid, post);
    setIsBusy(false);
    setRedirect(true);
  };

  const editPost = () => {
    setDefaultTitle(getPostSelector.post.title);
    setDefaultContent(getPostSelector.post.content);
    setDefaultLink(getPostSelector.post.link);
    setFileRef(getPostSelector.post.fileref);
    setEditMode(!editMode);
  };

  const deleteCurrentPost = async () => {
    await deletePostAction(postid, fileref);
    setRedirect(true);
  };

  let updateForm;
  if (editMode) {
    if (
      loginSelector.user.hasOwnProperty('user') ||
      signinSelector.user.hasOwnProperty('user') ||
      (userState != null && isBusy === false)
    ) {
      deleteButton = (
        <Button color="danger" onClick={(e) => deleteCurrentPost()}>
          Apagar
        </Button>
      );
    }
    if (isBusy) {
      updateForm = (
        <div className="processing">
          <p>Sua indicação está sendo atualizada!</p>
          <div className="loader">Carregando...</div>
        </div>
      );
    } else {
      updateForm = (
        <React.Fragment>
          <Form className="form-post" onSubmit={updateCurrentPost}>
            <h3>Alterar a indicação</h3>
            <FormGroup>
              <Label htmlFor="title">Nome do Local</Label>
              <Input
                type="text"
                name="email"
                innerRef={titleRef}
                defaultValue={defaultTitle}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="content">Descrição do local</Label>
              <Input
                type="textarea"
                name="content"
                innerRef={contentRef}
                defaultValue={defaultContent}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="link">Link</Label>
              <Input
                type="text"
                name="link"
                innerRef={linkRef}
                defaultValue={defaultLink}
              />
            </FormGroup>
            <label>
              <input type="file" id="upload" ref={fileRef} />
              <span>
                <img
                  src={camera}
                  alt="Girl in a jacket"
                  width="30rem"
                  height="30rem"
                />
              </span>
              <br />
            </label>
            <br />
            <button className="button1">Atualizar</button>
          </Form>
        </React.Fragment>
      );
    }
  }

  if (timer) {
    currentPost = <div className="loader">Loading...</div>;
  } else {
    if (
      loginSelector.user.hasOwnProperty('user') ||
      signinSelector.user.hasOwnProperty('user') ||
      userState != null
    ) {
      editButton = (
        <button className="button1" onClick={(e) => editPost()}>
          Editar indicação
        </button>
      );
    }

    currentPost = (
      <div className="single">
        <img src={getPostSelector.post.cover} />

        <Container>
          <Row>
            <Col>
              <Row>
                <h2>{getPostSelector.post.title}</h2>
              </Row>
              <Row>
                <p>{getPostSelector.post.content}</p>
              </Row>
              <Row>
                <a
                  className="link"
                  target="_blank"
                  href={getPostSelector.post.link}
                >
                  {getPostSelector.post.link}
                </a>
              </Row>
              <Row>
                <Col lg="6" md="6" sm="6" xs="9">
                  {editButton}
                </Col>
                <Col
                  lg={{ size: 'auto', offset: 4 }}
                  md={{ size: 'auto', offset: 3 }}
                  sm={{ size: 'auto', offset: 4 }}
                  xs="3"
                >
                  <Link to="/">
                    <img
                      src={home}
                      alt="Let's go back home baby baby"
                      width="30rem"
                      height="30rem"
                    />
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {updateForm}
        {deleteButton}
      </div>
    );
  }

  return <React.Fragment>{currentPost}</React.Fragment>;
};

export default Post;
