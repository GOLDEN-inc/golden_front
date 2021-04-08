import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/create';
import { Link } from 'react-router-dom';

import { Form, Label, Input, Container, Row, Col, Alert } from 'reactstrap';

import camera from '../../images/camera.png';
import home from '../../images/home.png';
import './Create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [cover, setCover] = useState('');
  const [error, setError] = useState('');

  const [routeRedirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const createPostAction = (post) => dispatch(createPost(post));

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setCover(selected);
      setError('');
    } else {
      setCover(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    let post = {
      title,
      content,
      link,
      cover: cover,
    };

    await createPostAction(post);
    setLoading(false);
    setRedirect(true);
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  let form;
  if (loading) {
    form = (
      <div className="processing">
        <p>Sua recomendação está saindo do forno</p>
        <div className="loader">Carregando...</div>
      </div>
    );
  } else {
    form = (
      <Form onSubmit={addPost}>
        <h3>Criar uma nova indicação!</h3>
        <Label htmlFor="title">Nome do local: </Label>
        <Input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="content">Fale o que acha sobre o local :) </Label>
        <Input
          type="textarea"
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <Label htmlFor="title">Link de onde encontrar: </Label>
        <Input
          type="text"
          name="link"
          onChange={(e) => setLink(e.target.value)}
        />
        <Label htmlFor="cover" className="cover">
          Publique uma foto ou print!
        </Label>
        <br />

        <label>
          <input type="file" onChange={handleChange} />
          <span>
            <img
              src={camera}
              alt="Girl in a jacket"
              width="30rem"
              height="30rem"
            />
          </span>
          <br />
          {cover && <Alert color="success">Foto adicionada com sucesso!</Alert>}
        </label>
        <Container className="bottom-buttons">
          <Row>
            <Col
              md={{ size: 6, offset: 0 }}
              sm={{ size: 'auto', offset: 1 }}
              xs="10"
            >
              <button className="button1">Criar indicação</button>
            </Col>
            <Col md={{ size: 1, offset: 4 }} sm={{ size: 1, offset: 4 }} xs="2">
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
        </Container>
      </Form>
    );
  }

  return (
    <React.Fragment>
      <div className="single">{form}</div>
    </React.Fragment>
  );
};

export default Create;
